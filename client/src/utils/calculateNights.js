function calculateNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 1;

  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);

  const difference =
    (endDate.getTime() - startDate.getTime()) /
    (1000 * 60 * 60 * 24);

  return difference > 0 ? Math.ceil(difference) : 1;
}

export default calculateNights;