import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log(user);
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `https://e-commerce-test-hqul.onrender.com/users/login?email=${email}&password=${password}`
      );
      setUser(response.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const register = async (email, password, firstname, lastname) => {
    try {
      const response = await axios.post(
        `https://e-commerce-test-hqul.onrender.com/users`,
        {
          email,
          password,
          firstname,
          lastname,
        }
      );
      setUser(response.data);
    } catch (error) {
      throw new Error("Registration failed");
    }
  };
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
