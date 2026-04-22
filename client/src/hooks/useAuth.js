import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth as useAuthContext } from "../context/AuthContext";

function useAuth() {
  const auth = useAuthContext();
  const navigate = useNavigate();

  const login = async (payload) => {
    try {
      auth.login(payload);
      navigate("/profile");
      return true;
    } catch (error) {
      console.error("Login Error:", error);
      return false;
    }
  };

  const register = async (payload) => {
    try {
      auth.register(payload);
      navigate("/profile");
      return true;
    } catch (error) {
      console.error("Register Error:", error);
      return false;
    }
  };

  const logout = () => {
    auth.logout();
    navigate("/login");
  };

  return {
    ...auth,
    login,
    register,
    logout
  };
}

export default useAuth;