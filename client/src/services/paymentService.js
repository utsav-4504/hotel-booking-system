import api from "./api";
import { normalizePayment } from "../utils/normalizers";

/* Create Payment Intent / Order */
async function createPayment(payload) {
  const response = await api.post("/payments/create", payload);

  return {
    ...response,
    payment: normalizePayment(response.data)
  };
}

/* Verify Payment */
async function verifyPayment(payload) {
  const response = await api.post("/payments/verify", payload);

  return {
    ...response,
    payment: normalizePayment(response.data)
  };
}

/* Get Payment History */
async function getPaymentHistory() {
  const response = await api.get("/payments/history");

  return {
    ...response,
    payments: Array.isArray(response.data)
      ? response.data.map(normalizePayment)
      : []
  };
}

/* Refund Payment */
async function refundPayment(id, payload = {}) {
  const response = await api.post(`/payments/${id}/refund`, payload);

  return {
    ...response,
    payment: normalizePayment(response.data)
  };
}

/* Get Single Payment */
async function getPaymentById(id) {
  const response = await api.get(`/payments/${id}`);

  return {
    ...response,
    payment: normalizePayment(response.data)
  };
}

export {
  createPayment,
  verifyPayment,
  getPaymentHistory,
  refundPayment,
  getPaymentById
};
