import { auth } from "@/lib/auth"
import { NextResponse } from "next/server";

// export { auth as middleware } from "@/lib/auth"

export default auth((req) => {
  console.log("Middleware executed for request:", req.auth);

  return NextResponse.next();
})

export const config = {
  matcher: [
    // Excluimos las carpetas de archivos estáticos y la de imágenes de Next.js
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};