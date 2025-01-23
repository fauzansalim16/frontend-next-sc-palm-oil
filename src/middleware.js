import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname, origin } = req.nextUrl;
  const token = req.cookies.get('token');

  // Izinkan akses ke file statis dan API tanpa pemeriksaan token
  if (pathname.startsWith('/_next/') || pathname.startsWith('/static/') || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Izinkan akses ke halaman login tanpa token
  if (pathname === '/login') {
    return NextResponse.next();
  }

  // Redirect ke /login jika tidak ada token dan mencoba mengakses halaman lain
  if (!token) {
    return NextResponse.redirect(`${origin}/login`);
  }

  // Jika ada token, izinkan akses ke halaman lainnya
  return NextResponse.next();
}

// Konfigurasi untuk semua route kecuali file statis dan API
export const config = {
  matcher: '/((?!_next|static|api|login).*)', // Terapkan middleware untuk semua route kecuali file statis, API, dan login
};
