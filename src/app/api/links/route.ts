import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { nanoid } from "nanoid";

// In a real application, you would use a database
const links = new Map<string, { id: string; userId: string; url: string }>();

export async function POST(request: Request) {
  const session = cookies().get("session");

  if (!session?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.value;
  const id = nanoid();
  const url = `${request.headers.get("host")}/message/${id}`;

  const link = { id, userId, url };
  links.set(id, link);

  return NextResponse.json(link, { status: 201 });
}

export async function GET(request: Request) {
  const session = cookies().get("session");

  if (!session?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.value;
  const userLinks = Array.from(links.values()).filter(
    (link) => link.userId === userId
  );

  return NextResponse.json({ links: userLinks }, { status: 200 });
}
