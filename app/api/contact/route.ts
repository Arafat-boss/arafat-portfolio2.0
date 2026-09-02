import { NextRequest, NextResponse } from "next/server";
import { saveContactMessage } from "@/lib/db/contact";
import { ContactFormData } from "@/lib/types/contact";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactFormData;

    // Validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, email, and message are required fields.",
        },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "unknown";

    const result = await saveContactMessage(body, { ip, userAgent });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Failed to process message.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message received successfully! I will reach out soon.",
        id: result.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("API Contact error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Internal server error.",
      },
      { status: 500 }
    );
  }
}
