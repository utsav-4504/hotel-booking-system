function formatCurrency(
  amount,
  locale = "en-IN",
  currency = "INR"
) {
  const value = Number(amount || 0);

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(value);
}

export default formatCurrency;