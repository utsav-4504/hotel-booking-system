import { query, withTransaction } from "../config/database.js";
import { parseBoolean } from "../utils/validator.js";

const slugify = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const runQuery = (executor, text, params = []) =>
  executor ? executor.query(text, params) : query(text, params);

const mapGalleryItem = (item) => ({
  id: item.id,
  imageUrl: item.image_url || item.imageUrl,
  caption: item.caption || null,
  isPrimary: Boolean(item.is_primary ?? item.isPrimary),
  displayOrder:
    typeof item.display_order !== "undefined"
      ? Number(item.display_order)
      : typeof item.displayOrder !== "undefined"
        ? Number(item.displayOrder)
        : null
});

const mapRoom = (room) => {
  if (!room) {
    return null;
  }

  return {
    id: room.id,
    hotelId: room.hotel_id || room.hotelId,
    name: room.name,
    description: room.description || null,
    type: room.type || null,
    pricePerNight: Number(
      room.price_per_night ?? room.pricePerNight ?? 0
    ),
    maxGuests: Number(room.max_guests ?? room.maxGuests ?? 1),
    beds: room.beds || null,
    bathrooms:
      room.bathrooms === null || typeof room.bathrooms === "undefined"
        ? null
        : Number(room.bathrooms),
    squareFeet:
      room.square_feet === null ||
      typeof room.square_feet === "undefined"
        ? null
        : Number(room.square_feet),
    imageUrl: room.image_url || room.imageUrl || null,
    availableCount: Number(
      room.available_count ?? room.availableCount ?? 0
    ),
    totalCount: Number(room.total_count ?? room.totalCount ?? 0),
    active:
      typeof room.active === "boolean"
        ? room.active
        : parseBoolean(room.active, true),
    amenities: Array.isArray(room.amenities) ? room.amenities : []
  };
};

const mapHotel = (row) => {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description || null,
    city: row.city,
    country: row.country,
    address: row.address || null,
    zipCode: row.zip_code || null,
    category: row.category || null,
    rating: Number(row.rating || 0),
    reviewsCount: Number(row.reviews_count || 0),
    phone: row.phone || null,
    email: row.email || null,
    websiteUrl: row.website_url || null,
    featured: Boolean(row.featured),
    active: Boolean(row.active),
    latitude:
      row.latitude === null || typeof row.latitude === "undefined"
        ? null
        : Number(row.latitude),
    longitude:
      row.longitude === null || typeof row.longitude === "undefined"
        ? null
        : Number(row.longitude),
    imageUrl: row.image_url || null,
    primaryImage: row.primary_image || row.image_url || null,
    startingPrice: Number(row.starting_price || 0),
    maxPrice: Number(row.max_price || 0),
    amenities: Array.isArray(row.amenities) ? row.amenities : [],
    gallery: Array.isArray(row.gallery)
      ? row.gallery.map(mapGalleryItem)
      : [],
    rooms: Array.isArray(row.rooms) ? row.rooms.map(mapRoom) : [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deletedAt: row.deleted_at
  };
};

const normalizeGallery = (gallery = []) =>
  gallery
    .filter(Boolean)
    .map((item, index) =>
      typeof item === "string"
        ? {
            imageUrl: item,
            caption: null,
            isPrimary: index === 0,
            displayOrder: index + 1
          }
        : {
            id: item.id,
            imageUrl: item.imageUrl || item.image_url || null,
            caption: item.caption || null,
            isPrimary:
              typeof item.isPrimary === "boolean"
                ? item.isPrimary
                : parseBoolean(item.is_primary, index === 0),
            displayOrder:
              item.displayOrder || item.display_order || index + 1
          }
    )
    .filter((item) => item.imageUrl);

const normalizeRooms = (rooms = [], fallbackImageUrl, hotelName) =>
  rooms
    .filter(Boolean)
    .map((room) => ({
      id: room.id,
      name: room.name || `${hotelName} Room`,
      description: room.description || null,
      type: room.type || "Deluxe",
      pricePerNight: Number(
        room.pricePerNight ?? room.price_per_night ?? room.price ?? 0
      ),
      maxGuests: Number(room.maxGuests ?? room.max_guests ?? room.guests ?? 2),
      beds: room.beds || null,
      bathrooms:
        room.bathrooms === null || typeof room.bathrooms === "undefined"
          ? null
          : Number(room.bathrooms),
      squareFeet:
        room.squareFeet === null ||
        typeof room.squareFeet === "undefined"
          ? null
          : Number(room.squareFeet),
      imageUrl:
        room.imageUrl || room.image_url || room.image || fallbackImageUrl,
      availableCount: Number(
        room.availableCount ?? room.available_count ?? room.totalCount ?? 1
      ),
      totalCount: Number(
        room.totalCount ?? room.total_count ?? room.availableCount ?? 1
      ),
      active:
        typeof room.active === "boolean"
          ? room.active
          : parseBoolean(room.active, true),
      amenities: Array.isArray(room.amenities) ? room.amenities : []
    }))
    .filter((room) => room.name && room.pricePerNight > 0);

const normalizeHotelInput = (payload = {}) => {
  const imageUrl =
    payload.imageUrl || payload.image_url || payload.image || null;
  const gallery = normalizeGallery(payload.gallery || payload.images || []);
  const roomsPayload =
    Array.isArray(payload.rooms) && payload.rooms.length
      ? payload.rooms
      : payload.price
        ? [
            {
              name: payload.defaultRoomName || "Standard Room",
              type: payload.roomType || "Deluxe",
              pricePerNight: payload.price,
              maxGuests: payload.guests || 2,
              bathrooms: payload.bathrooms || 1,
              beds:
                payload.beds ||
                `${payload.bedrooms || 1} ${
                  Number(payload.bedrooms || 1) > 1 ? "Beds" : "Bed"
                }`,
              imageUrl
            }
          ]
        : [];

  return {
    name: payload.name,
    slug: payload.slug || (payload.name ? slugify(payload.name) : null),
    description: payload.description || null,
    city: payload.city,
    country: payload.country,
    address: payload.address || null,
    zipCode: payload.zipCode || payload.zip_code || null,
    category: payload.category || null,
    rating:
      typeof payload.rating === "undefined" ? 0 : Number(payload.rating),
    reviewsCount: Number(
      payload.reviewsCount ?? payload.reviews_count ?? payload.reviews ?? 0
    ),
    phone: payload.phone || null,
    email: payload.email || null,
    websiteUrl: payload.websiteUrl || payload.website_url || null,
    featured: parseBoolean(payload.featured, false),
    active: parseBoolean(payload.active, true),
    latitude:
      typeof payload.latitude === "undefined"
        ? null
        : Number(payload.latitude),
    longitude:
      typeof payload.longitude === "undefined"
        ? null
        : Number(payload.longitude),
    imageUrl,
    amenities: Array.isArray(payload.amenities)
      ? [...new Set(payload.amenities.filter(Boolean))]
      : [],
    gallery,
    rooms: normalizeRooms(roomsPayload, imageUrl, payload.name || "Hotel")
  };
};

const hasOwn = (payload, ...keys) =>
  keys.some((key) =>
    Object.prototype.hasOwnProperty.call(payload, key)
  );

const buildHotelFilters = ({
  search,
  city,
  country,
  category,
  featured,
  activeOnly = true,
  minRating,
  minPrice,
  maxPrice
} = {}) => {
  const conditions = ["h.deleted_at IS NULL"];
  const params = [];

  if (activeOnly) {
    conditions.push("h.active = TRUE");
  }

  if (search) {
    params.push(`%${search.trim()}%`);
    conditions.push(
      `(h.name ILIKE $${params.length} OR h.city ILIKE $${params.length} OR h.country ILIKE $${params.length} OR COALESCE(h.description, '') ILIKE $${params.length})`
    );
  }

  if (city) {
    params.push(`%${city.trim()}%`);
    conditions.push(`h.city ILIKE $${params.length}`);
  }

  if (country) {
    params.push(`%${country.trim()}%`);
    conditions.push(`h.country ILIKE $${params.length}`);
  }

  if (category) {
    params.push(category);
    conditions.push(`h.category = $${params.length}`);
  }

  if (typeof featured === "boolean") {
    params.push(featured);
    conditions.push(`h.featured = $${params.length}`);
  }

  if (typeof minRating !== "undefined") {
    params.push(Number(minRating));
    conditions.push(`h.rating >= $${params.length}`);
  }

  const roomPriceConditions = [];

  if (typeof minPrice !== "undefined") {
    params.push(Number(minPrice));
    roomPriceConditions.push(
      `price_filter_rooms.price_per_night >= $${params.length}`
    );
  }

  if (typeof maxPrice !== "undefined") {
    params.push(Number(maxPrice));
    roomPriceConditions.push(
      `price_filter_rooms.price_per_night <= $${params.length}`
    );
  }

  if (roomPriceConditions.length) {
    conditions.push(`
      EXISTS (
        SELECT 1
        FROM rooms price_filter_rooms
        WHERE price_filter_rooms.hotel_id = h.id
          AND price_filter_rooms.active = TRUE
          AND ${roomPriceConditions.join(" AND ")}
      )
    `);
  }

  return {
    whereClause: `WHERE ${conditions.join(" AND ")}`,
    params
  };
};

const replaceHotelAmenities = async (client, hotelId, amenities = []) => {
  await client.query(
    `
      DELETE FROM hotel_amenities
      WHERE hotel_id = $1
    `,
    [hotelId]
  );

  for (const amenity of [...new Set(amenities.filter(Boolean))]) {
    await client.query(
      `
        INSERT INTO hotel_amenities (hotel_id, amenity)
        VALUES ($1, $2)
      `,
      [hotelId, amenity]
    );
  }
};

const replaceHotelGallery = async (client, hotelId, gallery = []) => {
  await client.query(
    `
      DELETE FROM hotel_galleries
      WHERE hotel_id = $1
    `,
    [hotelId]
  );

  for (const item of gallery) {
    await client.query(
      `
        INSERT INTO hotel_galleries (
          hotel_id,
          image_url,
          caption,
          is_primary,
          display_order
        )
        VALUES ($1, $2, $3, $4, $5)
      `,
      [
        hotelId,
        item.imageUrl,
        item.caption,
        item.isPrimary,
        item.displayOrder
      ]
    );
  }
};

const upsertRooms = async (client, hotelId, rooms = []) => {
  for (const room of rooms) {
    let roomId = room.id;

    if (roomId) {
      const updatedRoom = await client.query(
        `
          UPDATE rooms
          SET
            name = $3,
            description = $4,
            type = $5,
            price_per_night = $6,
            max_guests = $7,
            beds = $8,
            bathrooms = $9,
            square_feet = $10,
            image_url = $11,
            available_count = $12,
            total_count = $13,
            active = $14
          WHERE id = $1
            AND hotel_id = $2
          RETURNING id
        `,
        [
          roomId,
          hotelId,
          room.name,
          room.description,
          room.type,
          room.pricePerNight,
          room.maxGuests,
          room.beds,
          room.bathrooms,
          room.squareFeet,
          room.imageUrl,
          room.availableCount,
          room.totalCount,
          room.active
        ]
      );

      if (!updatedRoom.rows[0]) {
        roomId = null;
      }
    }

    if (!roomId) {
      const insertedRoom = await client.query(
        `
          INSERT INTO rooms (
            hotel_id,
            name,
            description,
            type,
            price_per_night,
            max_guests,
            beds,
            bathrooms,
            square_feet,
            image_url,
            available_count,
            total_count,
            active
          )
          VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
          )
          RETURNING id
        `,
        [
          hotelId,
          room.name,
          room.description,
          room.type,
          room.pricePerNight,
          room.maxGuests,
          room.beds,
          room.bathrooms,
          room.squareFeet,
          room.imageUrl,
          room.availableCount,
          room.totalCount,
          room.active
        ]
      );

      roomId = insertedRoom.rows[0].id;
    }

    await client.query(
      `
        DELETE FROM room_amenities
        WHERE room_id = $1
      `,
      [roomId]
    );

    for (const amenity of [...new Set(room.amenities.filter(Boolean))]) {
      await client.query(
        `
          INSERT INTO room_amenities (room_id, amenity)
          VALUES ($1, $2)
        `,
        [roomId, amenity]
      );
    }
  }
};

const list = async (filters = {}) => {
  const { whereClause, params } = buildHotelFilters(filters);
  const page = Math.max(Number(filters.page) || 1, 1);
  const limit = Math.min(Math.max(Number(filters.limit) || 10, 1), 100);
  const offset = (page - 1) * limit;

  const countResult = await query(
    `
      SELECT COUNT(*)::int AS total
      FROM hotels h
      ${whereClause}
    `,
    params
  );

  const dataResult = await query(
    `
      SELECT
        h.*,
        COALESCE(price_summary.starting_price, 0)::numeric(10, 2) AS starting_price,
        COALESCE(price_summary.max_price, 0)::numeric(10, 2) AS max_price,
        COALESCE(amenity_data.amenities, '[]'::json) AS amenities,
        COALESCE(primary_image.image_url, h.image_url) AS primary_image
      FROM hotels h
      LEFT JOIN LATERAL (
        SELECT
          MIN(r.price_per_night) AS starting_price,
          MAX(r.price_per_night) AS max_price
        FROM rooms r
        WHERE r.hotel_id = h.id
          AND r.active = TRUE
      ) AS price_summary ON TRUE
      LEFT JOIN LATERAL (
        SELECT json_agg(amenity ORDER BY amenity) AS amenities
        FROM (
          SELECT DISTINCT amenity
          FROM hotel_amenities
          WHERE hotel_id = h.id
        ) AS amenity_list
      ) AS amenity_data ON TRUE
      LEFT JOIN LATERAL (
        SELECT image_url
        FROM hotel_galleries
        WHERE hotel_id = h.id
        ORDER BY is_primary DESC, display_order ASC NULLS LAST, created_at ASC
        LIMIT 1
      ) AS primary_image ON TRUE
      ${whereClause}
      ORDER BY h.featured DESC, h.rating DESC, h.created_at DESC
      LIMIT $${params.length + 1}
      OFFSET $${params.length + 2}
    `,
    [...params, limit, offset]
  );

  return {
    hotels: dataResult.rows.map(mapHotel),
    total: countResult.rows[0].total,
    page,
    limit
  };
};

const getFeatured = async (limit = 6) => {
  const { hotels } = await list({
    featured: true,
    page: 1,
    limit
  });

  return hotels;
};

const findById = async (id, { includeInactive = false } = {}) => {
  const params = [id];
  const activeClause = includeInactive ? "" : "AND h.active = TRUE";
  const result = await query(
    `
      SELECT
        h.*,
        COALESCE(price_summary.starting_price, 0)::numeric(10, 2) AS starting_price,
        COALESCE(price_summary.max_price, 0)::numeric(10, 2) AS max_price,
        COALESCE(amenity_data.amenities, '[]'::json) AS amenities,
        COALESCE(gallery_data.gallery, '[]'::json) AS gallery,
        COALESCE(room_data.rooms, '[]'::json) AS rooms,
        COALESCE(primary_image.image_url, h.image_url) AS primary_image
      FROM hotels h
      LEFT JOIN LATERAL (
        SELECT
          MIN(r.price_per_night) AS starting_price,
          MAX(r.price_per_night) AS max_price
        FROM rooms r
        WHERE r.hotel_id = h.id
          AND r.active = TRUE
      ) AS price_summary ON TRUE
      LEFT JOIN LATERAL (
        SELECT json_agg(amenity ORDER BY amenity) AS amenities
        FROM (
          SELECT DISTINCT amenity
          FROM hotel_amenities
          WHERE hotel_id = h.id
        ) AS amenity_list
      ) AS amenity_data ON TRUE
      LEFT JOIN LATERAL (
        SELECT json_agg(
          json_build_object(
            'id', hg.id,
            'image_url', hg.image_url,
            'caption', hg.caption,
            'is_primary', hg.is_primary,
            'display_order', hg.display_order
          )
          ORDER BY hg.is_primary DESC, hg.display_order ASC NULLS LAST, hg.created_at ASC
        ) AS gallery
        FROM hotel_galleries hg
        WHERE hg.hotel_id = h.id
      ) AS gallery_data ON TRUE
      LEFT JOIN LATERAL (
        SELECT image_url
        FROM hotel_galleries
        WHERE hotel_id = h.id
        ORDER BY is_primary DESC, display_order ASC NULLS LAST, created_at ASC
        LIMIT 1
      ) AS primary_image ON TRUE
      LEFT JOIN LATERAL (
        SELECT json_agg(
          json_build_object(
            'id', r.id,
            'hotel_id', r.hotel_id,
            'name', r.name,
            'description', r.description,
            'type', r.type,
            'price_per_night', r.price_per_night,
            'max_guests', r.max_guests,
            'beds', r.beds,
            'bathrooms', r.bathrooms,
            'square_feet', r.square_feet,
            'image_url', r.image_url,
            'available_count', r.available_count,
            'total_count', r.total_count,
            'active', r.active,
            'amenities',
              COALESCE(
                (
                  SELECT json_agg(amenity ORDER BY amenity)
                  FROM (
                    SELECT DISTINCT amenity
                    FROM room_amenities
                    WHERE room_id = r.id
                  ) AS room_amenity_list
                ),
                '[]'::json
              )
          )
          ORDER BY r.price_per_night ASC
        ) AS rooms
        FROM rooms r
        WHERE r.hotel_id = h.id
          AND r.active = TRUE
      ) AS room_data ON TRUE
      WHERE h.id = $1
        AND h.deleted_at IS NULL
        ${activeClause}
      LIMIT 1
    `,
    params
  );

  return mapHotel(result.rows[0]);
};

const findRoomById = async (roomId, executor = null) => {
  const result = await runQuery(
    executor,
    `
      SELECT
        r.*,
        h.name AS hotel_name,
        h.city AS hotel_city,
        h.country AS hotel_country,
        h.image_url AS hotel_image_url
      FROM rooms r
      JOIN hotels h ON h.id = r.hotel_id
      WHERE r.id = $1
        AND r.active = TRUE
        AND h.active = TRUE
        AND h.deleted_at IS NULL
      LIMIT 1
    `,
    [roomId]
  );

  const room = result.rows[0];

  if (!room) {
    return null;
  }

  return {
    ...mapRoom(room),
    hotelName: room.hotel_name,
    hotelCity: room.hotel_city,
    hotelCountry: room.hotel_country,
    hotelImageUrl: room.hotel_image_url
  };
};

const create = async (payload) => {
  const hotel = normalizeHotelInput(payload);

  return withTransaction(async (client) => {
    const result = await client.query(
      `
        INSERT INTO hotels (
          name,
          slug,
          description,
          city,
          country,
          address,
          zip_code,
          category,
          rating,
          reviews_count,
          phone,
          email,
          website_url,
          featured,
          active,
          latitude,
          longitude,
          image_url
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9,
          $10, $11, $12, $13, $14, $15, $16, $17, $18
        )
        RETURNING id
      `,
      [
        hotel.name,
        hotel.slug,
        hotel.description,
        hotel.city,
        hotel.country,
        hotel.address,
        hotel.zipCode,
        hotel.category,
        hotel.rating,
        hotel.reviewsCount,
        hotel.phone,
        hotel.email,
        hotel.websiteUrl,
        hotel.featured,
        hotel.active,
        hotel.latitude,
        hotel.longitude,
        hotel.imageUrl
      ]
    );

    const hotelId = result.rows[0].id;

    await replaceHotelAmenities(client, hotelId, hotel.amenities);
    await replaceHotelGallery(client, hotelId, hotel.gallery);
    await upsertRooms(client, hotelId, hotel.rooms);

    return findById(hotelId, { includeInactive: true });
  });
};

const update = async (id, payload) => {
  const hotel = normalizeHotelInput(payload);

  return withTransaction(async (client) => {
    const fields = [];
    const values = [id];
    let index = 2;

    const assign = (column, value) => {
      fields.push(`${column} = $${index}`);
      values.push(value);
      index += 1;
    };

    if (hasOwn(payload, "name")) {
      assign("name", hotel.name);
    }

    if (hasOwn(payload, "slug") || hasOwn(payload, "name")) {
      assign("slug", hotel.slug);
    }

    if (hasOwn(payload, "description")) {
      assign("description", hotel.description);
    }

    if (hasOwn(payload, "city")) {
      assign("city", hotel.city);
    }

    if (hasOwn(payload, "country")) {
      assign("country", hotel.country);
    }

    if (hasOwn(payload, "address")) {
      assign("address", hotel.address);
    }

    if (hasOwn(payload, "zipCode", "zip_code")) {
      assign("zip_code", hotel.zipCode);
    }

    if (hasOwn(payload, "category")) {
      assign("category", hotel.category);
    }

    if (hasOwn(payload, "rating")) {
      assign("rating", hotel.rating);
    }

    if (hasOwn(payload, "reviewsCount", "reviews_count", "reviews")) {
      assign("reviews_count", hotel.reviewsCount);
    }

    if (hasOwn(payload, "phone")) {
      assign("phone", hotel.phone);
    }

    if (hasOwn(payload, "email")) {
      assign("email", hotel.email);
    }

    if (hasOwn(payload, "websiteUrl", "website_url")) {
      assign("website_url", hotel.websiteUrl);
    }

    if (hasOwn(payload, "featured")) {
      assign("featured", hotel.featured);
    }

    if (hasOwn(payload, "active")) {
      assign("active", hotel.active);
    }

    if (hasOwn(payload, "latitude")) {
      assign("latitude", hotel.latitude);
    }

    if (hasOwn(payload, "longitude")) {
      assign("longitude", hotel.longitude);
    }

    if (hasOwn(payload, "imageUrl", "image_url", "image")) {
      assign("image_url", hotel.imageUrl);
    }

    if (fields.length) {
      await client.query(
        `
          UPDATE hotels
          SET ${fields.join(", ")}
          WHERE id = $1
            AND deleted_at IS NULL
        `,
        values
      );
    }

    if (Array.isArray(payload.amenities)) {
      await replaceHotelAmenities(client, id, hotel.amenities);
    }

    if (Array.isArray(payload.gallery) || Array.isArray(payload.images)) {
      await replaceHotelGallery(client, id, hotel.gallery);
    }

    if (Array.isArray(payload.rooms) || typeof payload.price !== "undefined") {
      await upsertRooms(client, id, hotel.rooms);
    }

    return findById(id, { includeInactive: true });
  });
};

const softDelete = async (id) =>
  withTransaction(async (client) => {
    await client.query(
      `
        UPDATE rooms
        SET active = FALSE
        WHERE hotel_id = $1
      `,
      [id]
    );

    const result = await client.query(
      `
        UPDATE hotels
        SET
          active = FALSE,
          deleted_at = CURRENT_TIMESTAMP
        WHERE id = $1
          AND deleted_at IS NULL
        RETURNING *
      `,
      [id]
    );

    return mapHotel(result.rows[0]);
  });

const Hotel = {
  list,
  getFeatured,
  findById,
  findRoomById,
  create,
  update,
  softDelete,
  mapHotel,
  mapRoom,
  normalizeHotelInput
};

export default Hotel;
