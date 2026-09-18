import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";
if (!uri) {
  console.error("Please set MONGODB_URI");
  process.exit(1);
}
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("arafat-portfolio20");
    const collection = db.collection("project");

    // Update Project 1: Collaborative Study Platform
    await collection.updateOne(
      {
        $or: [
          { id: "study-platform" },
          { title: "Collaborative Study Platform" },
        ]
      },
      {
        $set: {
          imageSrc: "/projects/study-platform-live.png",
          liveBanner: "/projects/study-platform-live.png"
        }
      }
    );

    // Update Project 2: Volunteer for Bangladesh
    await collection.updateOne(
      {
        $or: [
          { id: "volunteer-platform" },
          { title: "Volunteer for Bangladesh" },
        ]
      },
      {
        $set: {
          imageSrc: "/projects/volunteer-platform-live.png",
          liveBanner: "/projects/volunteer-platform-live.png"
        }
      }
    );

    // Update Project 3: Game Reviews Hub
    await collection.updateOne(
      {
        $or: [
          { id: "game-reviews" },
          { title: "Game Reviews Hub" },
        ]
      },
      {
        $set: {
          imageSrc: "/projects/game-reviews-live.png",
          liveBanner: "/projects/game-reviews-live.png"
        }
      }
    );

    console.log("Successfully updated all projects with actual banner imageSrc!");

    const updatedProjects = await collection.find({}).toArray();
    console.log("Updated projects:", JSON.stringify(updatedProjects, null, 2));
  } catch (err) {
    console.error("Error updating projects:", err);
  } finally {
    await client.close();
  }
}

run();
