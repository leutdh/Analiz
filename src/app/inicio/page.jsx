"use client";
import { useState, useEffect } from "react";
import { AuthApi } from "@/config/endpoints";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth.context";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import title from "public/title.png";

export default function Login() {
  const [token, setToken] = useState("");
  const router = useRouter();
  const { user, setUser, setLoading } = useAuth();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = values;

    AuthApi.login({ username, password })
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem("token", token);
        setToken(token);
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
        setLoading(false);
        router.push("/inicio/resultados/adm");
      })
      .catch((error) => {
        console.error("Failed to login:", error);
      });
  };

  useEffect(() => {
    if (user) {
      console.log(user);
      const token = localStorage.getItem("token");
      if (token) {
        setToken(token);
        router.push("/inicio/resultados/adm");
      }
    }
  }, [user]); // Elimina el corchete adicional aquí

  return (
    <div className="flex bg-gray-100 h-screen">
      
      <div className="m-auto bg-white border border-cyan-600 rounded-lg shadow-2xl p-8 md:w-1/3">
      <div className="flex justify-center">
        <Image src={title} alt="logo" />
      </div>
        <h2 className="text-3xl font-bold text-center text-cyan-600 mb-4">
          Iniciar Sesión
        </h2>

        <form>
          <div className="mb-4">
            <input
             id="username"
             name="username"
             type="text"
             value={values.username}
             onChange={handleInputChange}
              className="w-full px-4 py-3 text-center border border-cyan-500 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-700 text-gray-700"
              placeholder="Usuario"
            />
          </div>

          <div className="mb-6">
            <input
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-center border border-cyan-500 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-700 text-gray-700"
              placeholder="Contraseña"
            />
          </div>

          <button
            className="block w-full bg-cyan-500 hover:bg-cyan-700 text-white py-2 rounded-lg transition duration-200"
            onClick={handleSubmit}
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
