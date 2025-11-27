// /middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Aquí verás el log CADA VEZ que alguien entra a una página (sujeto al matcher)
  console.log("hola desde el middleware");

  return NextResponse.next();
}

export const config = {
  // Esto asegura que intercepte casi todas las rutas
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
