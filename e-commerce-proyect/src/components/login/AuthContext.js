import React, { createContext, useState, useContext } from "react";
import axios from "axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "https://e-commerce-test-hqul.onrender.com/users/login",
        {
          email,
          password,
        }
      );
      setUser(response.data.user); // Guardar información del usuario en el estado
      return response.data.user;
    } catch (error) {
      throw new Error("Invalid email or password");
    }
  };

  const register = async (email, password, name, lastName) => {
    try {
      const response = await axios.post(
        "https://e-commerce-test-hqul.onrender.com/users",
        {
          email,
          password,
          name,
          lastName,
        }
      );
      setUser(response.data.user); // Guardar información del usuario en el estado
      return response.data.user;
    } catch (error) {
      throw new Error("Registration failed");
    }
  };

  const logout = () => {
    setUser(null); // Limpiar el estado del usuario
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
