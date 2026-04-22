import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect
} from "react";

const BookingContext = createContext();

function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("staylux_bookings");

    if (stored) {
      setBookings(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "staylux_bookings",
      JSON.stringify(bookings)
    );
  }, [bookings]);

  const createBooking = (bookingData) => {
    const newBooking = {
      id: `BK${Date.now()}`,
      status: "Confirmed",
      createdAt: new Date().toISOString(),
      ...bookingData
    };

    setBookings((prev) => [newBooking, ...prev]);

    return newBooking;
  };

  const cancelBooking = (id) => {
    setBookings((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: "Cancelled" }
          : item
      )
    );
  };

  const removeBooking = (id) => {
    setBookings((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const getBookingById = (id) => {
    return bookings.find((item) => item.id === id);
  };

  const clearBookings = () => {
    setBookings([]);
  };

  const value = useMemo(
    () => ({
      bookings,
      totalBookings: bookings.length,
      createBooking,
      cancelBooking,
      removeBooking,
      getBookingById,
      clearBookings
    }),
    [bookings]
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

function useBooking() {
  return useContext(BookingContext);
}

export { BookingProvider, useBooking };