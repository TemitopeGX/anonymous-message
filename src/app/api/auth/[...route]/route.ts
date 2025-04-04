import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// In a real application, you would:
// 1. Use a proper authentication library (e.g., NextAuth.js, Auth.js)
// 2. Hash passwords before storing them
// 3. Use a real database
const users = new Map<string, { email: string; password: string }>();

export async function POST(
  request: Request,
  { params }: { params: { route: string[] } }
) {
  const [route] = params.route;
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  if (route === "register") {
    if (users.has(email)) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    users.set(email, { email, password });

    // Set a session cookie
    cookies().set("session", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return NextResponse.json({ success: true }, { status: 201 });
  }

  if (route === "login") {
    const user = users.get(email);
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Set a session cookie
    cookies().set("session", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return NextResponse.json({ success: true }, { status: 200 });
  }

  return NextResponse.json({ error: "Invalid route" }, { status: 404 });
}
