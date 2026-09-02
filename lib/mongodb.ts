import { MongoClient, MongoClientOptions, Db } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const options: MongoClientOptions = {};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export function isMongoConfigured(): boolean {
  return Boolean(uri && uri.trim().length > 0);
}

// Canonical collection names matching user's MongoDB database
export const COLLECTIONS = {
  PROJECTS: "project",
  GALLERY: "Gellary",
  CONTACT: "contact_messages",
  SKILLS: "skills",
  TESTIMONIALS: "testimonials",
  SERVICES: "services",
} as const;

if (isMongoConfigured()) {
  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the MongoClient is not repeated on every hot reload
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production mode, avoid using a global variable
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

export async function getDatabase(dbName?: string): Promise<Db | null> {
  if (!clientPromise) {
    return null;
  }
  try {
    const connectedClient = await clientPromise;
    const targetDb = dbName || process.env.MONGODB_DB || "arafat-portfolio20";
    return connectedClient.db(targetDb);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return null;
  }
}

export default clientPromise;
