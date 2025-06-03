// src/app/api/user/route.js
import { jwtVerify } from "jose";
import { cookies } from "next/headers"; // para obtener cookies en App Router

export const GET = async () => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return new Response(JSON.stringify({ mensaje: "No autorizado" }), {
        status: 401,
      });
    }

    const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, jwtSecret);

    return new Response(JSON.stringify({ nombre: payload.nombre }), {
      status: 200,
    });

  } catch (err) {
    return new Response(JSON.stringify({ mensaje: "Token inválido" }), {
      status: 401,
    });
  }
};
