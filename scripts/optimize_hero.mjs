import sharp from "sharp";
import fs from "fs";
import path from "path";

async function downloadAndOptimizeHero() {
  const url = "https://i.ibb.co.com/DHtbRXZS/imaget.png";
  console.log("Fetching hero image from:", url);
  
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  console.log("Original hero size:", (buffer.length / 1024).toFixed(1), "KB");
  
  const destPath = path.resolve("./public/hero-portrait.webp");
  await sharp(buffer)
    .resize({ width: 1000, withoutEnlargement: true })
    .webp({ quality: 85, effort: 6 })
    .toFile(destPath);
    
  const stat = fs.statSync(destPath);
  console.log("Saved public/hero-portrait.webp:", (stat.size / 1024).toFixed(1), "KB");
}

downloadAndOptimizeHero().catch(console.error);
