import api from "./api";

/* Login User */
async function loginUser(payload) {
  return await api.post("/auth/login", payload);
}

/* Register User */
async function registerUser(payload) {
  return await api.post("/auth/register", payload);
}

/* Logout User */
async function logoutUser() {
  localStorage.removeItem("staylux_token");
  localStorage.removeItem("staylux_user");
  return true;
}

/* Get Current User */
async function getProfile() {
  return await api.get("/auth/profile");
}

/* Update Profile */
async function updateProfile(payload) {
  return await api.put("/auth/profile", payload);
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