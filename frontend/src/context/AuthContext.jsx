import { useState, useEffect, createContext } from 'react';
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      api.get("/me")
        .then(res => {
          setUser(res.data);
          console.log("User info:", res.data);
        })
        .catch(err => {
          console.error("Failed to fetch /me:", err.response?.data || err.message);
          setUser(null);
        });
    }
  }, [token]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token); // triggers useEffect
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
