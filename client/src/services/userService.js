import api from "./api";
import { normalizeUser } from "../utils/normalizers";

async function getUsers(params = {}) {
  const response = await api.get("/users", { params });

  return {
    ...response,
    users: Array.isArray(response.data)
      ? response.data.map(normalizeUser)
      : []
  };
}

async function getUserById(id) {
  const response = await api.get(`/users/${id}`);

  return {
    ...response,
    user: normalizeUser(response.data)
  };
}

async function updateUser(id, payload) {
  const response = await api.patch(`/users/${id}`, payload);

  return {
    ...response,
    user: normalizeUser(response.data)
  };
}

async function deleteUser(id) {
  return await api.delete(`/users/${id}`);
}

export { getUsers, getUserById, updateUser, deleteUser };
