"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { AdminApi } from "@/config/endpoints";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      if (token && isTokenValid(token)) {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
        setLoading(false);
      
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error during token decoding or user setting:", error);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const response = await AdminApi.getName(user.userId);
          setName(response.data.username); // Assuming the response has a 'username' property
        } catch (error) {
          console.error("Error fetching name:", error);
        }
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    if (name) {
      console.log(name);
    }
  }, [name]); // Dependencia 'name' para asegurar que se ejecute después

  const isTokenValid = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, name, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
