import { MongoClient } from "mongodb";

const uri = "mongodb+srv://arafat-portfolio:c5WFK9iFOPF7pPpV@cluster0.ybjyx.mongodb.net/?appName=Cluster0";
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
