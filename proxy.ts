import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const role = request.cookies.get("role")?.value;

  const isAdminRoute = request.nextUrl.pathname.startsWith("/dashboard/admin");
  const isStudentRoute =
    request.nextUrl.pathname.startsWith("/dashboard/student");
  const isTeacherRoute =
    request.nextUrl.pathname.startsWith("/dashboard/teacher");

  // belum login
  if (!token && (isAdminRoute || isStudentRoute || isTeacherRoute)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //   if (isAdminRoute && role !== "ADMIN") {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }

  if (isTeacherRoute && role !== "TEACHER") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isStudentRoute && role !== "STUDENT") {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
