export function formatCurrency(
  amount,
  locale = "en-IN",
  currency = "INR"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(Number(amount || 0));
}

export function formatDate(dateValue) {
  if (!dateValue) return "";

  const date = new Date(dateValue);

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

export function calculateNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 1;

  const start = new Date(checkIn);
  const end = new Date(checkOut);

  const diff =
    (end.getTime() - start.getTime()) /
    (1000 * 60 * 60 * 24);

  return diff > 0 ? Math.ceil(diff) : 1;
}

export function truncateText(text = "", limit = 120) {
  if (text.length <= limit) return text;

  return `${text.slice(0, limit)}...`;
}

export function generateBookingId(prefix = "BK") {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(1000 + Math.random() * 9000);

  return `${prefix}${timestamp}${random}`;
}

// Email validation
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone validation (international format)
export function isValidPhone(phone) {
  const phoneRegex = /^\+?[\d\s\-()]{7,}$/;
  return phoneRegex.test(phone);
}

// Format full name
export function formatName(name) {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Get initials from name
export function getInitials(name) {
  if (!name) return "??";
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
}

// Format price range
export function formatPriceRange(min, max) {
  if (!min && !max) return "Contact for price";
  if (min === max) return `$${min}`;
  return `$${min} - $${max}`;
}

// Calculate discount percentage
export function calculateDiscount(original, discounted) {
  if (!original || !discounted || original <= discounted) return 0;
  return Math.round(((original - discounted) / original) * 100);
}

// Format percentage
export function formatPercentage(value) {
  return `${Number(value || 0).toFixed(1)}%`;
}

// Sleep utility for testing
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Debounce function
export function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Throttle function
export function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Check if date is in past
export function isDateInPast(date) {
  return new Date(date) < new Date();
}

// Check if date is today
export function isToday(date) {
  const today = new Date();
  const checkDate = new Date(date);
  return (
    checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear()
  );
}

// Get days until date
export function getDaysUntil(date) {
  const today = new Date();
  const checkDate = new Date(date);
  const diff = checkDate.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getStatusColor(status = "") {
  const value = status.toLowerCase();

  switch (value) {
    case "confirmed":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}