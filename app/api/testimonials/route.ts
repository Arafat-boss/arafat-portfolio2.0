import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getDatabase();

    if (!db) {
      return NextResponse.json({
        success: false,
        error: "Database not connected.",
        data: [],
      }, { status: 503 });
    }

    const collection = db.collection("testimonials");
    const mongoTestimonials = await collection.find({}).toArray();

    return NextResponse.json({
      success: true,
      source: "mongodb",
      data: mongoTestimonials || [],
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to fetch testimonials.",
        data: [],
      },
      { status: 500 }
    );
  }
}
