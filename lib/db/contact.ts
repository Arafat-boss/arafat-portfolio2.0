import { getDatabase } from "../mongodb";
import { ContactFormData, ContactMessageDocument } from "../types/contact";

export async function saveContactMessage(
  data: ContactFormData,
  meta?: { ip?: string; userAgent?: string }
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const db = await getDatabase();

    if (!db) {
      return {
        success: false,
        error: "Database connection is not available.",
      };
    }

    const collection = db.collection<ContactMessageDocument>("contact_messages");

    const messageDoc: ContactMessageDocument = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      projectType: data.projectType.trim(),
      message: data.message.trim(),
      createdAt: new Date(),
      status: "unread",
      ip: meta?.ip || "unknown",
      userAgent: meta?.userAgent || "unknown",
    };

    const result = await collection.insertOne(messageDoc);

    return {
      success: true,
      id: result.insertedId.toString(),
    };
  } catch (error: any) {
    console.error("Error saving contact message to MongoDB:", error);
    return {
      success: false,
      error: error?.message || "Failed to save message to database",
    };
  }
}
