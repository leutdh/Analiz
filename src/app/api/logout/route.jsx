import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        // Obtener las cookies de la solicitud
        const cookies = req.headers.get("cookie") || "";
        
        // Crear la respuesta base
        const response = new NextResponse(
            JSON.stringify({ success: true, message: "Sesión cerrada correctamente" }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        
        try {
            // Intentar hacer logout en el backend
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/logout`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': cookies
                },
                credentials: 'include'
            });
        } catch (error) {
            console.error("Error durante el logout:", error);
            // Continuamos con el proceso de limpieza local aun si falla el logout remoto
        }
        
        // Eliminar las cookies de autenticación
        response.cookies.set({
            name: 'accessToken',
            value: '',
            path: '/',
            expires: new Date(0),
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        });
        
        // Eliminar cualquier otra cookie relacionada con la sesión
        response.cookies.set({
            name: 'session',
            value: '',
            path: '/',
            expires: new Date(0)
        });
        
        return response;
        
    } catch (error) {
        console.error("Error inesperado en el manejo del logout:", error);
        // En caso de error inesperado, devolver una respuesta vacía con las cookies limpiadas
        const errorResponse = new NextResponse(JSON.stringify({ 
            success: false, 
            message: "Error inesperado durante el logout" 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
        
        // Asegurarse de limpiar las cookies incluso en caso de error
        errorResponse.cookies.set('accessToken', '', { path: '/', expires: new Date(0) });
        
        
        return errorResponse;
    }
}