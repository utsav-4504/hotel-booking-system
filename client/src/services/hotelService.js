import api from "./api";
import { normalizeHotel } from "../utils/normalizers";

/* Get All Hotels */
async function getHotels(params = {}) {
  const response = await api.get("/hotels", { params });

  return {
    ...response,
    hotels: Array.isArray(response.data)
      ? response.data.map(normalizeHotel)
      : []
  };
}

/* Get Featured Hotels */
async function getFeaturedHotels() {
  const response = await api.get("/hotels/featured");

  return {
    ...response,
    hotels: Array.isArray(response.data)
      ? response.data.map(normalizeHotel)
      : []
  };
}

/* Get Single Hotel */
async function getHotelById(id) {
  const response = await api.get(`/hotels/${id}`);

  return {
    ...response,
    hotel: normalizeHotel(response.data)
  };
}

/* Search Hotels */
async function searchHotels(payload = {}) {
  const response = await api.post("/hotels/search", payload);

  return {
    ...response,
    hotels: Array.isArray(response.data)
      ? response.data.map(normalizeHotel)
      : []
  };
}

/* Create Hotel (Admin) */
async function createHotel(payload) {
  const response = await api.post("/hotels", payload);

  return {
    ...response,
    hotel: normalizeHotel(response.data)
  };
}

/* Update Hotel (Admin) */
async function updateHotel(id, payload) {
  const response = await api.put(`/hotels/${id}`, payload);

  return {
    ...response,
    hotel: normalizeHotel(response.data)
  };
}

/* Delete Hotel (Admin) */
async function deleteHotel(id) {
  const response = await api.delete(`/hotels/${id}`);

  return {
    ...response,
    hotel: normalizeHotel(response.data)
  };
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
