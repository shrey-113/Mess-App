import React, { createContext, useState, useEffect } from "react";

const authContext = createContext({
  isAuthenticated: false,
  token: null,
  type: "Student",
  login: () => {},
  logout: () => {},
  setType: () => {},
});

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === true
  );

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [type, setType] = useState(localStorage.getItem("type") || "Student");

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    localStorage.setItem("type", type);
  }, [type]);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
  };

  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        token,
        type,
        login,
        logout,
        setType,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export { AuthProvider, authContext };
