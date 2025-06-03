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
      
      
      const response = NextResponse.next();
      response.cookies.delete("accessToken");
      
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

      // Para cualquier otro error, redireccionar a /inicio
      return NextResponse.redirect(new URL("/inicio", request.url));
    }
  }
  
  // Para cualquier otra ruta, permitir acceso
  return NextResponse.next();
}


export const config = {
  matcher: [
    "/inicio", 
    "/inicio/desembolso/:path*",
    "/inicio/vendedor/:path*",
    "/inicio/resultados/:path*"
  ],
};