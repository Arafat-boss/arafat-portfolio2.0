import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";
if (!uri) {
  console.error("Please set MONGODB_URI in .env.local");
  process.exit(1);
}
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("arafat-portfolio20");
    
    console.log("Connected to MongoDB!");
    
    const collections = await db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));
    
    for (const col of collections) {
      const count = await db.collection(col.name).countDocuments();
      console.log(`\n=== Collection: ${col.name} (${count} documents) ===`);
      const sample = await db.collection(col.name).find({}).toArray();
      console.log(JSON.stringify(sample, null, 2));
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run();
