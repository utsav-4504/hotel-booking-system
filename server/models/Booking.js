import { query, withTransaction } from "../config/database.js";
import { createHttpError } from "../utils/validator.js";

const runQuery = (executor, text, params = []) =>
  executor ? executor.query(text, params) : query(text, params);

const createBookingNumber = () =>
  `BK${Date.now()}${Math.floor(Math.random() * 900 + 100)}`;

const calculateNights = (checkInDate, checkOutDate) => {
  const start = new Date(checkInDate);
  const end = new Date(checkOutDate);
  const diffInMs = end.getTime() - start.getTime();
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
};

const splitFullName = (fullName = "") => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  if (!parts.length) {
    return {
      firstName: "Guest",
      lastName: "User"
    };
  }

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" ") || "Guest"
  };
};

const normalizeGuest = (guest, isPrimaryGuest = false) => {
  if (!guest) {
    return null;
  }

  const nameParts = splitFullName(guest.fullName || guest.name || "");

  return {
    firstName: guest.firstName || nameParts.firstName,
    lastName: guest.lastName || nameParts.lastName,
    email: guest.email || null,
    phone: guest.phone || null,
    isPrimaryGuest
  };
};

const normalizeGuestEntries = async (client, userId, payload) => {
  const entries = [];
  const primaryGuestPayload =
    payload.primaryGuest || payload.guestInfo || payload.primary_guest;

  if (primaryGuestPayload) {
    entries.push(normalizeGuest(primaryGuestPayload, true));
  }

  const explicitGuests = [];

  if (Array.isArray(payload.guestDetails)) {
    explicitGuests.push(...payload.guestDetails);
  }

  if (Array.isArray(payload.additionalGuests)) {
    explicitGuests.push(...payload.additionalGuests);
  }

  if (Array.isArray(payload.guests)) {
    explicitGuests.push(...payload.guests);
  }

  explicitGuests
    .map((guest, index) => normalizeGuest(guest, entries.length === 0 && index === 0))
    .forEach((guest) => {
      if (guest) {
        entries.push(guest);
      }
    });

  if (!entries.length) {
    const userResult = await client.query(
      `
        SELECT full_name, email, phone
        FROM users
        WHERE id = $1
      `,
      [userId]
    );

    const user = userResult.rows[0];

    if (user) {
      entries.push(
        normalizeGuest(
          {
            fullName: user.full_name,
            email: user.email,
            phone: user.phone
          },
          true
        )
      );
    }
  } else if (!entries.some((guest) => guest.isPrimaryGuest)) {
    entries[0].isPrimaryGuest = true;
  }

  return entries.filter(Boolean);
};

const getDetailedBookingQuery = `
  SELECT
    b.*,
    u.full_name AS user_full_name,
    u.email AS user_email,
    u.phone AS user_phone,
    h.name AS hotel_name,
    h.city AS hotel_city,
    h.country AS hotel_country,
    COALESCE(
      (
        SELECT hg.image_url
        FROM hotel_galleries hg
        WHERE hg.hotel_id = h.id
        ORDER BY hg.is_primary DESC, hg.display_order ASC NULLS LAST, hg.created_at ASC
        LIMIT 1
      ),
      h.image_url
    ) AS hotel_image_url,
    r.name AS room_name,
    r.type AS room_type,
    r.price_per_night AS room_price_per_night,
    COALESCE(guest_data.guests, '[]'::json) AS guests,
    COALESCE(payment_data.payments, '[]'::json) AS payments
  FROM bookings b
  JOIN users u ON u.id = b.user_id
  JOIN hotels h ON h.id = b.hotel_id
  JOIN rooms r ON r.id = b.room_id
  LEFT JOIN LATERAL (
    SELECT json_agg(
      json_build_object(
        'id', bg.id,
        'firstName', bg.first_name,
        'lastName', bg.last_name,
        'email', bg.email,
        'phone', bg.phone,
        'isPrimaryGuest', bg.is_primary_guest
      )
      ORDER BY bg.is_primary_guest DESC, bg.created_at ASC
    ) AS guests
    FROM booking_guests bg
    WHERE bg.booking_id = b.id
  ) AS guest_data ON TRUE
  LEFT JOIN LATERAL (
    SELECT json_agg(
      json_build_object(
        'id', p.id,
        'amount', p.amount,
        'paymentMethod', p.payment_method,
        'transactionId', p.transaction_id,
        'status', p.status,
        'refundAmount', p.refund_amount,
        'refundReason', p.refund_reason,
        'createdAt', p.created_at,
        'updatedAt', p.updated_at
      )
      ORDER BY p.created_at DESC
    ) AS payments
    FROM payments p
    WHERE p.booking_id = b.id
  ) AS payment_data ON TRUE
`;

const mapBooking = (row) => {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    bookingNumber: row.booking_number,
    userId: row.user_id,
    hotelId: row.hotel_id,
    roomId: row.room_id,
    checkInDate: row.check_in_date,
    checkOutDate: row.check_out_date,
    numberOfNights: Number(row.number_of_nights || 0),
    numberOfGuests: Number(row.number_of_guests || 0),
    status: row.status,
    subtotal: Number(row.subtotal || 0),
    taxes: Number(row.taxes || 0),
    discount: Number(row.discount || 0),
    totalAmount: Number(row.total_amount || 0),
    paymentMethod: row.payment_method || null,
    paymentStatus: row.payment_status,
    specialRequests: row.special_requests || null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    cancelledAt: row.cancelled_at,
    user: {
      id: row.user_id,
      fullName: row.user_full_name,
      email: row.user_email,
      phone: row.user_phone
    },
    hotel: {
      id: row.hotel_id,
      name: row.hotel_name,
      city: row.hotel_city,
      country: row.hotel_country,
      imageUrl: row.hotel_image_url
    },
    room: {
      id: row.room_id,
      name: row.room_name,
      type: row.room_type,
      pricePerNight: Number(row.room_price_per_night || 0)
    },
    guests: Array.isArray(row.guests) ? row.guests : [],
    payments: Array.isArray(row.payments)
      ? row.payments.map((payment) => ({
          ...payment,
          amount: Number(payment.amount || 0),
          refundAmount: Number(payment.refundAmount || 0)
        }))
      : []
  };
};

const getOverlapCount = async (
  client,
  roomId,
  checkInDate,
  checkOutDate,
  excludeBookingId = null
) => {
  const params = [roomId, checkInDate, checkOutDate];
  let exclusionClause = "";

  if (excludeBookingId) {
    params.push(excludeBookingId);
    exclusionClause = `AND b.id <> $${params.length}`;
  }

  const result = await client.query(
    `
      SELECT COUNT(*)::int AS overlapping_count
      FROM bookings b
      WHERE b.room_id = $1
        AND b.status <> 'cancelled'
        AND NOT ($3::date <= b.check_in_date OR $2::date >= b.check_out_date)
        ${exclusionClause}
    `,
    params
  );

  return result.rows[0].overlapping_count;
};

const refreshRoomAvailability = async (client, roomId) => {
  await client.query(
    `
      UPDATE rooms r
      SET available_count = GREATEST(
        r.total_count - (
          SELECT COUNT(*)
          FROM bookings b
          WHERE b.room_id = r.id
            AND b.status <> 'cancelled'
            AND b.check_out_date > CURRENT_DATE
        ),
        0
      )
      WHERE r.id = $1
    `,
    [roomId]
  );
};

const applyCoupon = async (client, couponCode, subtotal) => {
  if (!couponCode) {
    return {
      discount: 0,
      coupon: null
    };
  }

  const couponResult = await client.query(
    `
      SELECT *
      FROM coupons
      WHERE LOWER(code) = LOWER($1)
        AND active = TRUE
        AND CURRENT_DATE BETWEEN valid_from AND valid_to
        AND (max_uses IS NULL OR current_uses < max_uses)
      LIMIT 1
    `,
    [couponCode]
  );

  const coupon = couponResult.rows[0];

  if (!coupon) {
    throw createHttpError(400, "Invalid or expired coupon code");
  }

  if (
    coupon.min_booking_amount &&
    subtotal < Number(coupon.min_booking_amount)
  ) {
    throw createHttpError(
      400,
      `Coupon requires a minimum booking amount of ${coupon.min_booking_amount}`
    );
  }

  const discount =
    coupon.discount_type === "percentage"
      ? (subtotal * Number(coupon.discount_value)) / 100
      : Number(coupon.discount_value);

  await client.query(
    `
      UPDATE coupons
      SET current_uses = current_uses + 1
      WHERE id = $1
    `,
    [coupon.id]
  );

  return {
    coupon,
    discount: Number(Math.min(discount, subtotal).toFixed(2))
  };
};

const findById = async (id, executor = null) => {
  const result = await runQuery(
    executor,
    `
      ${getDetailedBookingQuery}
      WHERE b.id = $1
      LIMIT 1
    `,
    [id]
  );

  return mapBooking(result.rows[0]);
};

const create = async (payload) =>
  withTransaction(async (client) => {
    const userId = payload.userId;
    const hotelId = payload.hotelId;
    const roomId = payload.roomId;
    const checkInDate = payload.checkInDate || payload.checkIn;
    const checkOutDate = payload.checkOutDate || payload.checkOut;
    const rawGuests = Array.isArray(payload.guests)
      ? undefined
      : payload.guests;
    const numberOfGuests = Number(
      payload.numberOfGuests ?? payload.number_of_guests ?? rawGuests ?? 1
    );

    const roomResult = await client.query(
      `
        SELECT
          r.*,
          h.name AS hotel_name,
          h.active AS hotel_active
        FROM rooms r
        JOIN hotels h ON h.id = r.hotel_id
        WHERE r.id = $1
          AND r.hotel_id = $2
          AND r.active = TRUE
          AND h.active = TRUE
          AND h.deleted_at IS NULL
        FOR UPDATE
      `,
      [roomId, hotelId]
    );

    const room = roomResult.rows[0];

    if (!room) {
      throw createHttpError(404, "Room not found for the selected hotel");
    }

    const nights = calculateNights(checkInDate, checkOutDate);

    if (nights <= 0) {
      throw createHttpError(
        400,
        "Check-out date must be after check-in date"
      );
    }

    if (numberOfGuests < 1) {
      throw createHttpError(400, "At least one guest is required");
    }

    if (numberOfGuests > Number(room.max_guests)) {
      throw createHttpError(
        400,
        `Selected room allows up to ${room.max_guests} guests`
      );
    }

    const inventory = Math.max(
      Number(room.total_count || 0),
      Number(room.available_count || 0),
      1
    );
    const overlapCount = await getOverlapCount(
      client,
      roomId,
      checkInDate,
      checkOutDate
    );

    if (overlapCount >= inventory) {
      throw createHttpError(
        400,
        "Selected room is not available for the chosen dates"
      );
    }

    const subtotal = Number(
      (Number(room.price_per_night) * nights).toFixed(2)
    );
    const { discount } = await applyCoupon(
      client,
      payload.couponCode || payload.coupon_code,
      subtotal
    );
    const taxes =
      typeof payload.taxes !== "undefined"
        ? Number(payload.taxes)
        : Number((subtotal * 0.08).toFixed(2));
    const totalAmount =
      typeof payload.totalAmount !== "undefined"
        ? Number(payload.totalAmount)
        : Number((subtotal + taxes - discount).toFixed(2));

    const bookingResult = await client.query(
      `
        INSERT INTO bookings (
          booking_number,
          user_id,
          hotel_id,
          room_id,
          check_in_date,
          check_out_date,
          number_of_nights,
          number_of_guests,
          status,
          subtotal,
          taxes,
          discount,
          total_amount,
          payment_method,
          payment_status,
          special_requests
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8,
          $9, $10, $11, $12, $13, $14, $15, $16
        )
        RETURNING id
      `,
      [
        createBookingNumber(),
        userId,
        hotelId,
        roomId,
        checkInDate,
        checkOutDate,
        nights,
        numberOfGuests,
        payload.status || "pending",
        subtotal,
        taxes,
        discount,
        totalAmount,
        payload.paymentMethod || payload.payment_method || null,
        payload.paymentStatus || payload.payment_status || "pending",
        payload.specialRequests || payload.special_requests || null
      ]
    );

    const bookingId = bookingResult.rows[0].id;
    const guestEntries = await normalizeGuestEntries(client, userId, payload);

    for (const guest of guestEntries) {
      await client.query(
        `
          INSERT INTO booking_guests (
            booking_id,
            first_name,
            last_name,
            email,
            phone,
            is_primary_guest
          )
          VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [
          bookingId,
          guest.firstName,
          guest.lastName,
          guest.email,
          guest.phone,
          guest.isPrimaryGuest
        ]
      );
    }

    await refreshRoomAvailability(client, roomId);

    return findById(bookingId, client);
  });

const listByUser = async (
  userId,
  { status, page = 1, limit = 10 } = {}
) => {
  const params = [userId];
  const filters = ["b.user_id = $1"];

  if (status) {
    params.push(status);
    filters.push(`b.status = $${params.length}`);
  }

  const whereClause = `WHERE ${filters.join(" AND ")}`;
  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);
  const offset = (safePage - 1) * safeLimit;

  const countResult = await query(
    `
      SELECT COUNT(*)::int AS total
      FROM bookings b
      ${whereClause}
    `,
    params
  );

  const dataResult = await query(
    `
      ${getDetailedBookingQuery}
      ${whereClause}
      ORDER BY b.created_at DESC
      LIMIT $${params.length + 1}
      OFFSET $${params.length + 2}
    `,
    [...params, safeLimit, offset]
  );

  return {
    bookings: dataResult.rows.map(mapBooking),
    total: countResult.rows[0].total,
    page: safePage,
    limit: safeLimit
  };
};

const listAll = async ({
  search,
  status,
  paymentStatus,
  page = 1,
  limit = 10
} = {}) => {
  const filters = ["1 = 1"];
  const params = [];

  if (search) {
    params.push(`%${search.trim()}%`);
    filters.push(
      `(b.booking_number ILIKE $${params.length} OR u.full_name ILIKE $${params.length} OR h.name ILIKE $${params.length})`
    );
  }

  if (status) {
    params.push(status);
    filters.push(`b.status = $${params.length}`);
  }

  if (paymentStatus) {
    params.push(paymentStatus);
    filters.push(`b.payment_status = $${params.length}`);
  }

  const whereClause = `WHERE ${filters.join(" AND ")}`;
  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);
  const offset = (safePage - 1) * safeLimit;

  const countResult = await query(
    `
      SELECT COUNT(*)::int AS total
      FROM bookings b
      JOIN users u ON u.id = b.user_id
      JOIN hotels h ON h.id = b.hotel_id
      ${whereClause}
    `,
    params
  );

  const dataResult = await query(
    `
      ${getDetailedBookingQuery}
      ${whereClause}
      ORDER BY b.created_at DESC
      LIMIT $${params.length + 1}
      OFFSET $${params.length + 2}
    `,
    [...params, safeLimit, offset]
  );

  return {
    bookings: dataResult.rows.map(mapBooking),
    total: countResult.rows[0].total,
    page: safePage,
    limit: safeLimit
  };
};

const cancelInTransaction = async (client, booking) => {
  if (booking.status === "cancelled") {
    return booking;
  }

  if (["completed", "no-show"].includes(booking.status)) {
    throw createHttpError(
      400,
      `A ${booking.status} booking cannot be cancelled`
    );
  }

  await client.query(
    `
      UPDATE bookings
      SET
        status = 'cancelled',
        cancelled_at = CURRENT_TIMESTAMP
      WHERE id = $1
    `,
    [booking.id]
  );

  await refreshRoomAvailability(client, booking.roomId);
  return findById(booking.id, client);
};

const cancel = async (id, { userId, isAdmin = false } = {}) =>
  withTransaction(async (client) => {
    const booking = await findById(id, client);

    if (!booking) {
      throw createHttpError(404, "Booking not found");
    }

    if (!isAdmin && booking.userId !== userId) {
      throw createHttpError(403, "You cannot cancel this booking");
    }

    return cancelInTransaction(client, booking);
  });

const remove = async (id, { userId, isAdmin = false } = {}) =>
  withTransaction(async (client) => {
    const booking = await findById(id, client);

    if (!booking) {
      throw createHttpError(404, "Booking not found");
    }

    if (!isAdmin && booking.userId !== userId) {
      throw createHttpError(403, "You cannot delete this booking");
    }

    if (booking.status !== "cancelled") {
      throw createHttpError(
        400,
        "Cancel the booking before deleting it"
      );
    }

    await client.query(
      `
        DELETE FROM bookings
        WHERE id = $1
      `,
      [id]
    );

    return {
      id
    };
  });

const updateStatus = async (
  id,
  { status, paymentStatus }
) =>
  withTransaction(async (client) => {
    const booking = await findById(id, client);

    if (!booking) {
      throw createHttpError(404, "Booking not found");
    }

    if (status === "cancelled") {
      return cancelInTransaction(client, booking);
    }

    if (booking.status === "cancelled" && status !== "cancelled") {
      throw createHttpError(
        400,
        "Cancelled bookings cannot be moved back to an active state"
      );
    }

    const fields = [];
    const values = [id];
    let index = 2;

    if (status) {
      fields.push(`status = $${index}`);
      values.push(status);
      index += 1;
    }

    if (paymentStatus) {
      fields.push(`payment_status = $${index}`);
      values.push(paymentStatus);
      index += 1;
    }

    if (!fields.length) {
      return booking;
    }

    await client.query(
      `
        UPDATE bookings
        SET ${fields.join(", ")}
        WHERE id = $1
      `,
      values
    );

    await refreshRoomAvailability(client, booking.roomId);
    return findById(id, client);
  });

const Booking = {
  findById,
  create,
  listByUser,
  listAll,
  cancel,
  remove,
  updateStatus,
  mapBooking
};

export { refreshRoomAvailability };
export default Booking;
