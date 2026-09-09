import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

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
    const skillsCol = db.collection("skills");

    console.log("Connected to MongoDB!");

    // 1. Move MongoDB, Figma, Tailwind CSS to inside (unfeatured)
    await skillsCol.updateMany(
      { id: { $in: ["mongodb", "figma", "tailwind"] } },
      { $set: { isFeatured: false } }
    );
    console.log("Updated MongoDB, Figma, and Tailwind CSS to isFeatured: false");

    // 2. Add / Update WordPress, Wix, Squarespace as isFeatured: true
    const cmsSkills = [
      {
        id: "wordpress",
        name: "WordPress",
        category: "Tools",
        level: "Expert",
        color: "#21759B",
        icon: "wordpress",
        isFeatured: true,
      },
      {
        id: "wix",
        name: "Wix",
        category: "Tools",
        level: "Expert",
        color: "#0C6EFC",
        icon: "wix",
        isFeatured: true,
      },
      {
        id: "squarespace",
        name: "Squarespace",
        category: "Tools",
        level: "Expert",
        color: "#121212",
        icon: "squarespace",
        isFeatured: true,
      },
    ];

    for (const skill of cmsSkills) {
      const res = await skillsCol.updateOne(
        { id: skill.id },
        { $set: skill },
        { upsert: true }
      );
      console.log(`Upserted ${skill.name}: matched=${res.matchedCount}, upsertedId=${res.upsertedId}`);
    }

    // 3. Fetch and log all featured skills
    const featured = await skillsCol.find({ isFeatured: true }).toArray();
    console.log("\n=== Current Featured Skills ===");
    console.table(featured.map(s => ({ id: s.id, name: s.name, category: s.category, isFeatured: s.isFeatured })));

    // 4. Fetch and log all skills count
    const totalCount = await skillsCol.countDocuments();
    console.log(`\nTotal skills in database: ${totalCount}`);

  } catch (err) {
    console.error("Error updating skills:", err);
  } finally {
    await client.close();
  }
}

run();
