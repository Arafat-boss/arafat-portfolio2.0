import { MongoClient } from "mongodb";

const uri = "mongodb+srv://arafat-portfolio:c5WFK9iFOPF7pPpV@cluster0.ybjyx.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("arafat-portfolio20");
    
    console.log("Connected to MongoDB, updating collections to .webp...");

    // 1. Update project collection
    const projects = await db.collection("project").find({}).toArray();
    for (const p of projects) {
      const updateDoc = {};
      if (p.imageSrc && typeof p.imageSrc === "string") {
        updateDoc.imageSrc = p.imageSrc.replace(/\.(png|jpg|jpeg)$/i, ".webp");
      }
      if (p.liveBanner && typeof p.liveBanner === "string") {
        updateDoc.liveBanner = p.liveBanner.replace(/\.(png|jpg|jpeg)$/i, ".webp");
      }
      if (Object.keys(updateDoc).length > 0) {
        await db.collection("project").updateOne({ _id: p._id }, { $set: updateDoc });
        console.log(`Updated project ${p.title} -> ${JSON.stringify(updateDoc)}`);
      }
    }

    // 2. Update Gellary collection
    const gallery = await db.collection("Gellary").find({}).toArray();
    for (const g of gallery) {
      if (g.src && typeof g.src === "string") {
        const newSrc = g.src.replace(/\.(png|jpg|jpeg)$/i, ".webp");
        await db.collection("Gellary").updateOne({ _id: g._id }, { $set: { src: newSrc } });
        console.log(`Updated gallery ${g.title} -> ${newSrc}`);
      }
    }

    console.log("\nDatabase update completed successfully!");
  } catch (err) {
    console.error("Error updating MongoDB:", err);
  } finally {
    await client.close();
  }
}

run();
