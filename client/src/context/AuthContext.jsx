import React, { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (credentials) => {
    const demoUser = {
      id: 1,
      name: "Utsav Prajapati",
      email: credentials?.email || "user@staylux.com",
      role: "customer"
    };

    setUser(demoUser);
    localStorage.setItem("staylux_user", JSON.stringify(demoUser));
  };

  const register = (data) => {
    const newUser = {
      id: Date.now(),
      name: data?.fullName || "New User",
      email: data?.email || "new@staylux.com",
      role: "customer"
    };

    setUser(newUser);
    localStorage.setItem("staylux_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("staylux_user");
  };

  React.useEffect(() => {
    const storedUser = localStorage.getItem("staylux_user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout
    }),
    [user]
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