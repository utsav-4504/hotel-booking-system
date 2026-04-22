import api from "./api";

/* Create Payment Intent / Order */
async function createPayment(payload) {
  return await api.post("/payments/create", payload);
}

/* Verify Payment */
async function verifyPayment(payload) {
  return await api.post("/payments/verify", payload);
}

/* Get Payment History */
async function getPaymentHistory() {
  return await api.get("/payments/history");
}

/* Refund Payment */
async function refundPayment(id, payload = {}) {
  return await api.post(`/payments/${id}/refund`, payload);
}

/* Get Single Payment */
async function getPaymentById(id) {
  return await api.get(`/payments/${id}`);
}

export {
  createPayment,
  verifyPayment,
  getPaymentHistory,
  refundPayment,
  getPaymentById
};