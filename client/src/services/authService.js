import api from "./api";
import { normalizeUser } from "../utils/normalizers";

/* Login User */
async function loginUser(payload) {
  const response = await api.post("/auth/login", payload);

  return {
    ...response,
    user: normalizeUser(response.data?.user),
    token: response.data?.token
  };
}

/* Register User */
async function registerUser(payload) {
  const response = await api.post("/auth/register", payload);

  return {
    ...response,
    user: normalizeUser(response.data?.user),
    token: response.data?.token
  };
}

/* Logout User */
async function logoutUser() {
  localStorage.removeItem("staylux_token");
  localStorage.removeItem("staylux_user");
  return true;
}

/* Get Current User */
async function getProfile() {
  const response = await api.get("/auth/profile");

  return {
    ...response,
    user: normalizeUser(response.data)
  };
}

/* Update Profile */
async function updateProfile(payload) {
  const response = await api.put("/auth/profile", payload);

  return {
    ...response,
    user: normalizeUser(response.data)
  };
}

/* Change Password */
async function changePassword(payload) {
  return await api.put("/auth/change-password", payload);
}

export {
  loginUser,
  registerUser,
  logoutUser,
  getProfile,
  updateProfile,
  changePassword
};
