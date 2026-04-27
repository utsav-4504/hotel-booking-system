import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  loginUser,
  registerUser,
  getProfile,
  updateProfile as updateProfileRequest,
  changePassword as changePasswordRequest,
  logoutUser
} from "../services/authService";

const AuthContext = createContext();
const TOKEN_KEY = "staylux_token";
const USER_KEY = "staylux_user";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const persistAuth = (nextUser, token) => {
    setUser(nextUser);

    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }

    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
  };

  const clearAuth = () => {
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          clearAuth();
        }
      }

      if (!token) {
        setAuthReady(true);
        return;
      }

      try {
        const response = await getProfile();
        persistAuth(response.user, token);
      } catch (error) {
        clearAuth();
      } finally {
        setAuthReady(true);
      }
    };

    initializeAuth();
  }, []);

  const login = async (payload) => {
    setIsLoading(true);

    try {
      const response = await loginUser(payload);
      persistAuth(response.user, response.token);
      return response.user;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload) => {
    setIsLoading(true);

    try {
      const response = await registerUser(payload);
      persistAuth(response.user, response.token);
      return response.user;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const response = await getProfile();
    persistAuth(response.user, token);
    return response.user;
  };

  const updateProfile = async (payload) => {
    setIsLoading(true);

    try {
      const response = await updateProfileRequest(payload);
      persistAuth(response.user, localStorage.getItem(TOKEN_KEY));
      return response.user;
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (payload) => {
    setIsLoading(true);

    try {
      return await changePasswordRequest(payload);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await logoutUser();
    clearAuth();
  };

  const value = useMemo(
    () => ({
      user,
      authReady,
      isLoading,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === "admin",
      login,
      register,
      refreshProfile,
      updateProfile,
      changePassword,
      logout
    }),
    [user, authReady, isLoading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth, AuthContext };
