import { MongoClient } from "mongodb";

const uri = "mongodb+srv://arafat-portfolio:c5WFK9iFOPF7pPpV@cluster0.ybjyx.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("arafat-portfolio20");
    const collection = db.collection("project");

    const newLink = "https://collaborative-study-website-9ehf.vercel.app/";

    // Update Collaborative Study Platform
    const result = await collection.updateOne(
      {
        $or: [
          { id: "study-platform" },
          { title: "Collaborative Study Platform" },
          { link: { $regex: "collaborative-study", $options: "i" } }
        ]
      },
      {
        $set: {
          link: newLink
        }
      }
    );

    console.log("Matched Count:", result.matchedCount);
    console.log("Modified Count:", result.modifiedCount);

    const updatedDoc = await collection.findOne({
      $or: [
        { id: "study-platform" },
        { title: "Collaborative Study Platform" }
      ]
    });

    console.log("Updated Document:", JSON.stringify(updatedDoc, null, 2));
  } catch (err) {
    console.error("Error updating project link:", err);
  } finally {
    await client.close();
  }
}

run();
