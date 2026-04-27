function titleCase(value = "") {
  return String(value)
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function normalizeUser(user) {
  if (!user) {
    return null;
  }

  const fullName = user.fullName || user.name || "";

  return {
    ...user,
    fullName,
    name: fullName,
    role: user.role || "customer",
    status: user.status || "active"
  };
}

function normalizeRoom(room, hotel = null) {
  if (!room) {
    return null;
  }

  const pricePerNight = Number(room.pricePerNight ?? room.price ?? 0);
  const maxGuests = Number(room.maxGuests ?? room.guests ?? 0);
  const imageUrl =
    room.imageUrl || room.image || hotel?.image || hotel?.imageUrl || "";

  return {
    ...room,
    pricePerNight,
    price: pricePerNight,
    maxGuests,
    guests: maxGuests,
    imageUrl,
    image: imageUrl,
    hotelId: room.hotelId || hotel?.id || null,
    hotelName: room.hotelName || hotel?.name || "",
    hotelImageUrl: room.hotelImageUrl || hotel?.image || imageUrl
  };
}

function normalizeHotel(hotel) {
  if (!hotel) {
    return null;
  }

  const image =
    hotel.primaryImage || hotel.imageUrl || hotel.image || "";
  const price = Number(hotel.startingPrice ?? hotel.price ?? 0);
  const reviews = Number(hotel.reviewsCount ?? hotel.reviews ?? 0);

  const normalizedHotel = {
    ...hotel,
    image,
    imageUrl: image,
    price,
    startingPrice: price,
    reviews,
    reviewsCount: reviews,
    featured: Boolean(hotel.featured),
    amenities: Array.isArray(hotel.amenities) ? hotel.amenities : []
  };

  normalizedHotel.rooms = Array.isArray(hotel.rooms)
    ? hotel.rooms
        .map((room) => normalizeRoom(room, normalizedHotel))
        .filter(Boolean)
    : [];

  return normalizedHotel;
}

function normalizeBooking(booking) {
  if (!booking) {
    return null;
  }

  return {
    ...booking,
    statusLabel: titleCase(booking.status),
    paymentStatusLabel: titleCase(booking.paymentStatus),
    totalAmount: Number(booking.totalAmount ?? booking.total ?? 0),
    subtotal: Number(booking.subtotal ?? 0),
    taxes: Number(booking.taxes ?? 0),
    discount: Number(booking.discount ?? 0),
    numberOfGuests: Number(
      booking.numberOfGuests ?? booking.guests ?? 0
    ),
    hotel: normalizeHotel(booking.hotel),
    room: normalizeRoom(booking.room, booking.hotel),
    user: normalizeUser(booking.user)
  };
}

function normalizePayment(payment) {
  if (!payment) {
    return null;
  }

  return {
    ...payment,
    amount: Number(payment.amount ?? 0),
    refundAmount: Number(payment.refundAmount ?? 0),
    statusLabel: titleCase(payment.status)
  };
}

export {
  titleCase,
  normalizeUser,
  normalizeRoom,
  normalizeHotel,
  normalizeBooking,
  normalizePayment
};
