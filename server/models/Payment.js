import { query, withTransaction } from "../config/database.js";
import { createHttpError } from "../utils/validator.js";
import { refreshRoomAvailability } from "./Booking.js";

const runQuery = (executor, text, params = []) =>
  executor ? executor.query(text, params) : query(text, params);

const createTransactionId = () =>
  `TXN-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;

const mapPayment = (row) => {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    bookingId: row.booking_id,
    bookingNumber: row.booking_number,
    userId: row.user_id,
    roomId: row.room_id,
    hotel: {
      id: row.hotel_id,
      name: row.hotel_name
    },
    amount: Number(row.amount || 0),
    paymentMethod: row.payment_method,
    transactionId: row.transaction_id,
    status: row.status,
    refundAmount: Number(row.refund_amount || 0),
    refundReason: row.refund_reason || null,
    bookingStatus: row.booking_status,
    bookingPaymentStatus: row.booking_payment_status,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
};

const getDetailedPaymentQuery = `
  SELECT
    p.*,
    b.booking_number,
    b.user_id,
    b.status AS booking_status,
    b.payment_status AS booking_payment_status,
    b.room_id,
    h.id AS hotel_id,
    h.name AS hotel_name
  FROM payments p
  JOIN bookings b ON b.id = p.booking_id
  JOIN hotels h ON h.id = b.hotel_id
`;

const findById = async (id, executor = null) => {
  const result = await runQuery(
    executor,
    `
      ${getDetailedPaymentQuery}
      WHERE p.id = $1
      LIMIT 1
    `,
    [id]
  );

  return mapPayment(result.rows[0]);
};

const create = async ({
  bookingId,
  amount,
  paymentMethod,
  transactionId
}) =>
  withTransaction(async (client) => {
    const bookingResult = await client.query(
      `
        SELECT *
        FROM bookings
        WHERE id = $1
        FOR UPDATE
      `,
      [bookingId]
    );

    const booking = bookingResult.rows[0];

    if (!booking) {
      throw createHttpError(404, "Booking not found");
    }

    const completedPaymentResult = await client.query(
      `
        SELECT id
        FROM payments
        WHERE booking_id = $1
          AND status = 'completed'
        LIMIT 1
      `,
      [bookingId]
    );

    if (completedPaymentResult.rows[0]) {
      throw createHttpError(
        400,
        "This booking already has a completed payment"
      );
    }

    const paymentResult = await client.query(
      `
        INSERT INTO payments (
          booking_id,
          amount,
          payment_method,
          transaction_id,
          status
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
      `,
      [
        bookingId,
        Number(amount ?? booking.total_amount),
        paymentMethod,
        transactionId || null,
        "pending"
      ]
    );

    await client.query(
      `
        UPDATE bookings
        SET payment_method = $2
        WHERE id = $1
      `,
      [bookingId, paymentMethod]
    );

    return findById(paymentResult.rows[0].id, client);
  });

const verify = async ({
  paymentId,
  transactionId,
  status = "completed"
}) =>
  withTransaction(async (client) => {
    const payment = await findById(paymentId, client);

    if (!payment) {
      throw createHttpError(404, "Payment not found");
    }

    const resolvedTransactionId =
      transactionId || payment.transactionId || createTransactionId();

    await client.query(
      `
        UPDATE payments
        SET
          transaction_id = $2,
          status = $3
        WHERE id = $1
      `,
      [paymentId, resolvedTransactionId, status]
    );

    let bookingStatus = payment.bookingStatus;
    let bookingPaymentStatus = payment.bookingPaymentStatus;

    if (status === "completed") {
      bookingStatus = payment.bookingStatus === "pending"
        ? "confirmed"
        : payment.bookingStatus;
      bookingPaymentStatus = "completed";
    } else if (status === "failed") {
      bookingPaymentStatus = "failed";
    } else if (status === "refunded") {
      bookingStatus = "cancelled";
      bookingPaymentStatus = "refunded";
    } else {
      bookingPaymentStatus = "pending";
    }

    await client.query(
      `
        UPDATE bookings
        SET
          status = $2,
          payment_status = $3
        WHERE id = $1
      `,
      [payment.bookingId, bookingStatus, bookingPaymentStatus]
    );

    if (status === "refunded") {
      await refreshRoomAvailability(client, payment.roomId);
    }

    return findById(paymentId, client);
  });

const listByUser = async (userId) => {
  const result = await query(
    `
      ${getDetailedPaymentQuery}
      WHERE b.user_id = $1
      ORDER BY p.created_at DESC
    `,
    [userId]
  );

  return result.rows.map(mapPayment);
};

const refund = async (id, { amount, reason } = {}) =>
  withTransaction(async (client) => {
    const payment = await findById(id, client);

    if (!payment) {
      throw createHttpError(404, "Payment not found");
    }

    if (payment.status !== "completed") {
      throw createHttpError(
        400,
        "Only completed payments can be refunded"
      );
    }

    const refundAmount = Number(
      amount ? Math.min(Number(amount), payment.amount) : payment.amount
    );

    await client.query(
      `
        UPDATE payments
        SET
          status = 'refunded',
          refund_amount = $2,
          refund_reason = $3
        WHERE id = $1
      `,
      [id, refundAmount, reason || "Refund processed"]
    );

    await client.query(
      `
        UPDATE bookings
        SET
          status = 'cancelled',
          payment_status = 'refunded',
          cancelled_at = COALESCE(cancelled_at, CURRENT_TIMESTAMP)
        WHERE id = $1
      `,
      [payment.bookingId]
    );

    await refreshRoomAvailability(client, payment.roomId);

    return findById(id, client);
  });

const Payment = {
  findById,
  create,
  verify,
  listByUser,
  refund,
  mapPayment
};

export default Payment;
