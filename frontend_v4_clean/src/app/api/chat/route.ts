import { NextRequest, NextResponse } from "next/server";

// Define the expected request body structure from the frontend
interface ChatRequestBody {
  messages: Array<{ role: string; content: string }>;
}

// Define the expected response structure from the Flask API
interface FlaskApiResponse {
  response?: string;
  error?: string;
  details?: string;
}

const FLASK_API_URL = process.env.FLASK_API_URL || "http://127.0.0.1:5002/api/v1/chat";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as ChatRequestBody;
    const conversationMessages = body.messages || [];

    if (conversationMessages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    // The Flask API expects the same 'messages' array structure
    const flaskApiRequestBody = {
      messages: conversationMessages,
    };

    const flaskResponse = await fetch(FLASK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flaskApiRequestBody),
    });

    const flaskResponseData: FlaskApiResponse = await flaskResponse.json();

    if (!flaskResponse.ok || flaskResponseData.error) {
      console.error("Error from Flask API:", flaskResponseData.error, "Details:", flaskResponseData.details);
      return NextResponse.json(
        { 
          error: flaskResponseData.error || "Failed to get response from AI service", 
          details: flaskResponseData.details 
        },
        { status: flaskResponse.status || 500 }
      );
    }
    
    // The frontend AIChatBot expects a streaming response, but for now, let's adapt to a non-streaming JSON response
    // It expects { response: "AI message" } or similar for success.
    // The Flask API should return { "response": "..." } on success.
    // If the Flask API returns the AI response directly in `flaskResponseData.response`
    if (flaskResponseData.response) {
        // The AIChatBot is set up for streaming. To make it work with a non-streaming response from Flask for now:
        // We need to send back a ReadableStream that yields the full response once.
        const stream = new ReadableStream({
            start(controller) {
                const encodedMessage = new TextEncoder().encode(flaskResponseData.response);
                controller.enqueue(encodedMessage);
                controller.close();
            }
        });
        return new Response(stream, {
            headers: { "Content-Type": "text/plain; charset=utf-8" }, // Or application/octet-stream
        });
    } else {
        // This case should ideally be caught by flaskResponseData.error check above
        return NextResponse.json({ error: "Invalid response structure from AI service" }, { status: 500 });
    }

  } catch (error) {
    console.error("Error in Next.js /api/chat POST handler:", error);
    let errorMessage = "Internal Server Error in Next.js API route";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

