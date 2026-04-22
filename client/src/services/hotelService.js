import api from "./api";

/* Get All Hotels */
async function getHotels(params = {}) {
  return await api.get("/hotels", { params });
}

/* Get Featured Hotels */
async function getFeaturedHotels() {
  return await api.get("/hotels/featured");
}

/* Get Single Hotel */
async function getHotelById(id) {
  return await api.get(`/hotels/${id}`);
}

/* Search Hotels */
async function searchHotels(payload = {}) {
  return await api.post("/hotels/search", payload);
}

/* Create Hotel (Admin) */
async function createHotel(payload) {
  return await api.post("/hotels", payload);
}

/* Update Hotel (Admin) */
async function updateHotel(id, payload) {
  return await api.put(`/hotels/${id}`, payload);
}

/* Delete Hotel (Admin) */
async function deleteHotel(id) {
  return await api.delete(`/hotels/${id}`);
}

export {
  getHotels,
  getFeaturedHotels,
  getHotelById,
  searchHotels,
  createHotel,
  updateHotel,
  deleteHotel
};