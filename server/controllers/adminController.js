import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/sendResponse.js";
import { query } from "../config/database.js";

const getDashboardOverview = asyncHandler(async (req, res) => {
  const [
    usersResult,
    hotelsResult,
    bookingsResult,
    revenueResult,
    recentBookingsResult,
    topHotelsResult
  ] = await Promise.all([
    query(
      `
        SELECT COUNT(*)::int AS total_users
        FROM users
        WHERE deleted_at IS NULL
      `
    ),
    query(
      `
        SELECT COUNT(*)::int AS total_hotels
        FROM hotels
        WHERE deleted_at IS NULL
      `
    ),
    query(
      `
        SELECT COUNT(*)::int AS total_bookings
        FROM bookings
      `
    ),
    query(
      `
        SELECT COALESCE(SUM(amount), 0)::numeric(12, 2) AS total_revenue
        FROM payments
        WHERE status = 'completed'
      `
    ),
    query(
      `
        SELECT
          b.id,
          b.booking_number,
          b.status,
          b.total_amount,
          b.created_at,
          u.full_name AS user_name,
          h.name AS hotel_name
        FROM bookings b
        JOIN users u ON u.id = b.user_id
        JOIN hotels h ON h.id = b.hotel_id
        ORDER BY b.created_at DESC
        LIMIT 5
      `
    ),
    query(
      `
        SELECT
          h.id,
          h.name,
          h.rating,
          COUNT(b.id)::int AS bookings_count
        FROM hotels h
        LEFT JOIN bookings b ON b.hotel_id = h.id
        WHERE h.deleted_at IS NULL
        GROUP BY h.id
        ORDER BY bookings_count DESC, h.rating DESC
        LIMIT 5
      `
    )
  ]);

  return sendResponse(res, {
    message: "Dashboard overview fetched successfully",
    data: {
      stats: {
        totalUsers: usersResult.rows[0].total_users,
        totalHotels: hotelsResult.rows[0].total_hotels,
        totalBookings: bookingsResult.rows[0].total_bookings,
        totalRevenue: Number(revenueResult.rows[0].total_revenue)
      },
      recentBookings: recentBookingsResult.rows.map((booking) => ({
        ...booking,
        total_amount: Number(booking.total_amount)
      })),
      topHotels: topHotelsResult.rows.map((hotel) => ({
        ...hotel,
        rating: Number(hotel.rating)
      }))
    }
  });
});

export { getDashboardOverview };
