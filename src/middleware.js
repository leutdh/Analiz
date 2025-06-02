import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);

// Determina si un usuario tiene acceso a una ruta específica según su rol
function isAuthorized(role, path) {
  if (role === "administrativo") return true;
  
  if (role === "vendedor") {
    return (
      path.startsWith("/inicio/desembolso") ||
      path.startsWith("/inicio/vendedor")
    );
  }
  
  if (role === "externo") {
    return path.startsWith("/inicio/desembolso");
  }
  
  return false; // Otros roles: acceso denegado
}

// Determina la página de inicio según el rol del usuario
function getHomepageForRole(role) {
  switch (role) {
    case "administrativo":
      return "/inicio/resultados";
    case "vendedor":
      return "/inicio/vendedor";
    case "externo":
      return "/inicio/desembolso";
    default:
      return "/inicio";
  }
}

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken");
  
  // CASO 1: Usuario en /inicio con token válido - redireccionar a su página correspondiente
  if (path === "/inicio") {
    // Si no hay token, permitir acceso a /inicio (página de login)
    if (!accessToken) {
      return NextResponse.next();
    }
    
    try {
      // Si hay token válido, redireccionar según el rol
      const { payload } = await jwtVerify(accessToken.value, jwtSecret);
      const userRole = payload.role;
      const homePage = getHomepageForRole(userRole);
      
      return NextResponse.redirect(new URL(homePage, request.url));
    } catch (error) {
      // Si token inválido/expirado, limpiar cookies y permitir acceso al login
      console.log("Error verificando token en /inicio:", error.message);
      
      if (error.name === "JWTExpired") {
        // Intentar refresh token
        return handleTokenRefresh(request);
      }
      
      const response = NextResponse.next();
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }
  }
  
  // CASO 2: Usuario accediendo a rutas protegidas
  if (
    path.startsWith("/inicio/desembolso") ||
    path.startsWith("/inicio/vendedor") ||
    path.startsWith("/inicio/resultados")
  ) {
    // Si no hay token, redireccionar a /inicio
    if (!accessToken) {
      return NextResponse.redirect(new URL("/inicio", request.url));
    }
    
    try {
      // Verificar el token y los permisos
      const { payload } = await jwtVerify(accessToken.value, jwtSecret);
      const userRole = payload.role;
      
      if (!isAuthorized(userRole, path)) {
        // Si no tiene permisos, redireccionar a /inicio
        return NextResponse.redirect(new URL("/inicio", request.url));
      }
      
      // Si tiene permisos, permitir acceso
      return NextResponse.next();
    } catch (error) {
      console.log("Error verificando token en ruta protegida:", error.message);
      
      // Si el token expiró, intentar refresh
      if (error.name === "JWTExpired") {
        return handleTokenRefresh(request, path);
      }
      
      // Para cualquier otro error, redireccionar a /inicio
      return NextResponse.redirect(new URL("/inicio", request.url));
    }
  }
  
  // Para cualquier otra ruta, permitir acceso
  return NextResponse.next();
}

// Función auxiliar para manejar refresh token
async function handleTokenRefresh(request, originalPath) {
  console.log('=== Iniciando handleTokenRefresh ===');
  const refreshToken = request.cookies.get("refreshToken");
  console.log('Refresh token en cookies:', refreshToken ? 'Presente' : 'Ausente');
  
  if (!refreshToken) {
    console.log('No hay refresh token, redirigiendo a /inicio');
    const response = NextResponse.redirect(new URL("/inicio", request.url));
    response.cookies.delete("accessToken");
    return response;
  }
  
  try {
    // Llamar al endpoint de refresh token
    // Enviamos el refreshToken como cookie
    console.log('Enviando solicitud de refresh token a', "http://localhost:3001/api/usuarios/refresh-token");
    console.log('Headers de la solicitud:', {
      'Content-Type': 'application/json',
      'Cookie': `refreshToken=${refreshToken.value}`
    });
    
    const responseRefresh = await fetch(
      "http://localhost:3001/api/usuarios/refresh-token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Incluimos la cookie manualmente
          "Cookie": `refreshToken=${refreshToken.value}`
        },
        // Importante: No usamos 'credentials: include' cuando enviamos manualmente las cookies
        // ya que puede causar conflictos
      }
    );
    
    console.log('Respuesta del servidor - Status:', responseRefresh.status);
    
    // Verificar si la respuesta es exitosa
    if (!responseRefresh.ok) {
      console.error("Error en refresh token, status:", responseRefresh.status);
      const response = NextResponse.redirect(new URL("/inicio", request.url));
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }
    
    const resJson = await responseRefresh.json();
    console.log('Respuesta del servidor - JSON:', JSON.stringify(resJson, null, 2));
    
    if (resJson.success) {
      console.log('Refresh exitoso, actualizando tokens...');
      // Si el refresh fue exitoso, actualizar el accessToken y continuar
      const response = originalPath 
        ? NextResponse.redirect(new URL(originalPath, request.url))
        : NextResponse.next();
      
      // Establecer el nuevo accessToken
      response.cookies.set({
        name: "accessToken",
        value: resJson.accessToken,
        maxAge: 3600, // 1 hora
        httpOnly: true,
        path: "/",
      });
      
      // Establecer el nuevo refreshToken
      // Asumimos que el backend devuelve el nuevo refreshToken en la respuesta
      if (resJson.refreshToken) {
        response.cookies.set({
          name: "refreshToken",
          value: resJson.refreshToken,
          maxAge: 7 * 24 * 60 * 60, // 7 días
          httpOnly: true,
          path: "/",
        });
      } else {
        // Si el backend no devuelve un nuevo refreshToken, usamos el actual
        // Esto no es ideal, pero es un fallback
        console.warn("Backend no devolvió refreshToken, usando el actual");
      }
      
      return response;
    }
    
    // Si el refresh falló, redireccionar a /inicio y limpiar cookies
    console.error('Error en la respuesta del servidor:', resJson);
    const response = NextResponse.redirect(new URL("/inicio", request.url));
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    console.log('Redirigiendo a /inicio y limpiando cookies');
    return response;
  } catch (error) {
    console.error("Error en refresh token:", error);
    const response = NextResponse.redirect(new URL("/inicio", request.url));
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }
}

export const config = {
  matcher: [
    "/inicio", 
    "/inicio/desembolso/:path*",
    "/inicio/vendedor/:path*",
    "/inicio/resultados/:path*"
  ],
};