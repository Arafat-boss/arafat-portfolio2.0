import sharp from "sharp";
import fs from "fs";
import path from "path";

const galleryDir = path.resolve("./public/gellary");
const projectsDir = path.resolve("./public/projects");

async function optimizeFolder(dir, maxWidth = 1200, quality = 82) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) continue;
    
    const ext = path.extname(file).toLowerCase();
    if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;
    if (file.endsWith(".webp")) continue;
    
    const baseName = path.basename(file, ext);
    const webpPath = path.join(dir, `${baseName}.webp`);
    
    const originalSizeMb = (stat.size / (1024 * 1024)).toFixed(2);
    
    console.log(`Optimizing: ${file} (${originalSizeMb} MB)...`);
    
    try {
      await sharp(filePath)
        .resize({ width: maxWidth, withoutEnlargement: true, fit: "inside" })
        .webp({ quality: quality, effort: 6 })
        .toFile(webpPath);
        
      const newStat = fs.statSync(webpPath);
      const newSizeKb = (newStat.size / 1024).toFixed(1);
      const reduction = (((stat.size - newStat.size) / stat.size) * 100).toFixed(1);
      
      console.log(`  -> Saved ${baseName}.webp: ${newSizeKb} KB (${reduction}% reduction)`);
    } catch (err) {
      console.error(`  Error optimizing ${file}:`, err.message);
    }
  }
}

async function run() {
  console.log("=== OPTIMIZING GALLERY IMAGES ===");
  await optimizeFolder(galleryDir, 1200, 80);
  
  console.log("\n=== OPTIMIZING PROJECT IMAGES ===");
  await optimizeFolder(projectsDir, 1200, 80);
  
  console.log("\nDone!");
}

run();
