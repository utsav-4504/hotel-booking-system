import api from "./api";
import { normalizeBooking } from "../utils/normalizers";

/* Create Booking */
async function createBooking(payload) {
  const response = await api.post("/bookings", payload);

  return {
    ...response,
    booking: normalizeBooking(response.data)
  };
}

/* Get User Bookings */
async function getMyBookings() {
  const response = await api.get("/bookings/my-bookings");

  return {
    ...response,
    bookings: Array.isArray(response.data)
      ? response.data.map(normalizeBooking)
      : []
  };
}

/* Get Booking By ID */
async function getBookingById(id) {
  const response = await api.get(`/bookings/${id}`);

  return {
    ...response,
    booking: normalizeBooking(response.data)
  };
}

/* Cancel Booking */
async function cancelBooking(id) {
  const response = await api.patch(`/bookings/${id}/cancel`);

  return {
    ...response,
    booking: normalizeBooking(response.data)
  };
}

/* Delete Booking */
async function deleteBooking(id) {
  return await api.delete(`/bookings/${id}`);
}

/* Admin: Get All Bookings */
async function getAllBookings(params = {}) {
  const response = await api.get("/bookings", { params });

  return {
    ...response,
    bookings: Array.isArray(response.data)
      ? response.data.map(normalizeBooking)
      : []
  };
}

/* Admin: Update Booking Status */
async function updateBookingStatus(id, payload) {
  const response = await api.patch(`/bookings/${id}/status`, payload);

  return {
    ...response,
    booking: normalizeBooking(response.data)
  };
}

export {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  deleteBooking,
  getAllBookings,
  updateBookingStatus
};
