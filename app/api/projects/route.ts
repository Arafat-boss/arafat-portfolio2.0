import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

// Helper to query collections matching user's names: 'project' & 'Gellary'
async function getCollectionData(db: any, collectionNames: string[], query = {}) {
  for (const name of collectionNames) {
    try {
      const col = db.collection(name);
      const items = await col.find(query).toArray();
      if (items && items.length > 0) {
        return items;
      }
    } catch {
      // Continue to next alias
    }
  }
  return [];
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // 'featured' | 'gallery' | 'all'
    const category = searchParams.get("category");

    const db = await getDatabase();

    if (!db) {
      return NextResponse.json({
        success: false,
        error: "Database not connected.",
        data: [],
      }, { status: 503 });
    }

    const query: any = {};
    if (category && category !== "all") {
      query.filterTag = category;
    }

    if (type === "gallery") {
      const galleryData = await getCollectionData(db, ["Gellary", "gellary", "gallery"], query);
      return NextResponse.json({
        success: true,
        source: "mongodb",
        collection: "Gellary",
        data: galleryData,
      });
    } else if (type === "featured") {
      const projectData = await getCollectionData(db, ["project", "projects"], query);
      return NextResponse.json({
        success: true,
        source: "mongodb",
        collection: "project",
        data: projectData,
      });
    } else {
      const [projectData, galleryData] = await Promise.all([
        getCollectionData(db, ["project", "projects"]),
        getCollectionData(db, ["Gellary", "gellary", "gallery"]),
      ]);

      return NextResponse.json({
        success: true,
        source: "mongodb",
        data: {
          featured: projectData,
          gallery: galleryData,
        },
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to fetch projects.",
        data: [],
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const db = await getDatabase();
    if (!db) {
      return NextResponse.json(
        { success: false, error: "Database not connected." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const targetCollectionName = body.type === "gallery" ? "Gellary" : "project";
    const collection = db.collection(targetCollectionName);

    const result = await collection.insertOne({
      ...body.data,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        message: `Successfully inserted item into ${targetCollectionName} collection`,
        insertedId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to insert project." },
      { status: 500 }
    );
  }
}
