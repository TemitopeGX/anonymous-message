import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

// In a real application, you would use a database
const messages = new Map<
  string,
  Array<{ id: string; content: string; createdAt: string }>
>();

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const linkId = params.id;
  const { message } = await request.json();

  if (!message || typeof message !== "string") {
    return NextResponse.json(
      { error: "Message is required and must be a string" },
      { status: 400 }
    );
  }

  // Create a new message
  const newMessage = {
    id: nanoid(),
    content: message,
    createdAt: new Date().toISOString(),
  };

  // Get existing messages for this link or initialize new array
  const existingMessages = messages.get(linkId) || [];
  messages.set(linkId, [...existingMessages, newMessage]);

  return NextResponse.json({ success: true }, { status: 201 });
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const linkId = params.id;
  const linkMessages = messages.get(linkId) || [];

  return NextResponse.json({ messages: linkMessages }, { status: 200 });
}
