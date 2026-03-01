import { NextResponse } from "next/server";

export async function POST(req) {
  const { password } = await req.json();

  if (password === process.env.ADMIN_PASSWORD) {
    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: "admin_auth",
      value: "true",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  }

  return NextResponse.json(
    { error: "Invalid password" },
    { status: 401 }
  );
}