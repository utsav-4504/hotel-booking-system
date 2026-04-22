import api from "./api";

/* Create Booking */
async function createBooking(payload) {
  return await api.post("/bookings", payload);
}

/* Get User Bookings */
async function getMyBookings() {
  return await api.get("/bookings/my-bookings");
}

/* Get Booking By ID */
async function getBookingById(id) {
  return await api.get(`/bookings/${id}`);
}

/* Cancel Booking */
async function cancelBooking(id) {
  return await api.patch(`/bookings/${id}/cancel`);
}

/* Delete Booking */
async function deleteBooking(id) {
  return await api.delete(`/bookings/${id}`);
}

/* Admin: Get All Bookings */
async function getAllBookings(params = {}) {
  return await api.get("/bookings", { params });
}

/* Admin: Update Booking Status */
async function updateBookingStatus(id, payload) {
  return await api.patch(`/bookings/${id}/status`, payload);
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