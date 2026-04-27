import api from "./api";
import { normalizeBooking, normalizeHotel } from "../utils/normalizers";

async function getDashboardOverview() {
  const response = await api.get("/admin/dashboard");

  return {
    ...response,
    overview: {
      stats: response.data?.stats || {},
      recentBookings: Array.isArray(response.data?.recentBookings)
        ? response.data.recentBookings.map(normalizeBooking)
        : [],
      topHotels: Array.isArray(response.data?.topHotels)
        ? response.data.topHotels.map(normalizeHotel)
        : []
    }
  };
}

export { getDashboardOverview };
