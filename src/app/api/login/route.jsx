import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const cookieStore = await cookies();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: body.username,
      password: body.password,
    }),
  });
  const resJson = await response.json();

  if (resJson.success === true) {
    await cookieStore.set("accessToken", resJson.accessToken, {
      httpOnly: true,
      maxAge: 3600, // 1 hora
    });

    await cookieStore.set("refreshToken", resJson.refreshToken, {
      httpOnly: true,
      maxAge: 604800, // 7 días
    });

    delete resJson.accessToken;
    delete resJson.refreshToken;
    return NextResponse.json(resJson);
  }

  return NextResponse.json({
    success: false,
    message: "Credential Error",
  });
}
