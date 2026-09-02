import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const db = await getDatabase();

    if (!db) {
      return NextResponse.json({
        success: false,
        error: "Database not connected.",
        data: [],
      }, { status: 503 });
    }

    const collection = db.collection("skills");
    const query: any = {};
    if (category && category !== "All") {
      query.category = category;
    }

    const mongoSkills = await collection.find(query).toArray();

    return NextResponse.json({
      success: true,
      source: "mongodb",
      data: mongoSkills || [],
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to fetch skills.",
        data: [],
      },
      { status: 500 }
    );
  }
}
