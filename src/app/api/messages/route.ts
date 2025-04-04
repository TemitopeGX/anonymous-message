import { NextResponse } from "next/server";

// In a real application, you would store messages in a database
const messages: string[] = [];

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string" },
        { status: 400 }
      );
    }

    // In a real application, you would save the message to a database
    messages.push(message);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error processing message:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // In a real application, you would fetch messages from a database
  return NextResponse.json({ messages }, { status: 200 });
}
