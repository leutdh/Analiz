import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        // Obtener las cookies de la solicitud
        const cookies = req.headers.get("cookie") || "";
        
        // Crear la respuesta base
        const response = new NextResponse();
        
        try {
            // Intentar hacer logout en el backend
            const responseApi = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/logout`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': cookies
                },
                credentials: 'include'
            });

            // Obtener la respuesta JSON solo si la respuesta es exitosa
            const resApiJson = responseApi.ok ? await responseApi.json() : null;
            
            // Configurar la respuesta con los datos del backend si existen
            if (resApiJson) {
                response.json(resApiJson);
            } else {
                response.json({ success: false, message: "Error en el servidor" });
            }
        } catch (error) {
            console.error("Error durante el logout:", error);
            response.json({ success: false, message: "Error durante el logout" });
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
        
        response.cookies.set({
            name: 'refreshToken',
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
        errorResponse.cookies.set('refreshToken', '', { path: '/', expires: new Date(0) });
        
        return errorResponse;
    }
}