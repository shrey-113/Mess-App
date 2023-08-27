import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";

const authContext = createContext({
  isAuthenticated: false,
  token: null,
  type: "Student",
  newToken: () => {},
  login: () => {},
  logout: () => {},
  setType: () => {},
});

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [type, setType] = useState("Student");

  const newToken = useCallback((newTokenValue) => {
    setToken(newTokenValue);
    if (newTokenValue) {
      localStorage.setItem("token", newTokenValue);
    } else {
      localStorage.removeItem("token");
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    newToken(null);
  };

  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        token,
        type,
        newToken,
        login,
        logout,
        setType,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => {
  return useContext(authContext);
};

export { AuthProvider, useAuth };
