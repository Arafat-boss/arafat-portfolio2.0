import fs from "fs";
import path from "path";

const galleryDir = path.resolve("./public/gellary");
const projectsDir = path.resolve("./public/projects");

function cleanLegacyPngs(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;
    if (file.endsWith(".webp")) continue;
    
    const baseName = path.basename(file, ext);
    const webpPath = path.join(dir, `${baseName}.webp`);
    
    // If optimized webp version exists, delete heavy legacy original
    if (fs.existsSync(webpPath)) {
      const legacyPath = path.join(dir, file);
      const sizeMb = (fs.statSync(legacyPath).size / (1024 * 1024)).toFixed(2);
      fs.unlinkSync(legacyPath);
      console.log(`Deleted heavy legacy file: ${file} (${sizeMb} MB)`);
    }
  }
}

console.log("=== CLEANING PUBLIC/GELLARY ===");
cleanLegacyPngs(galleryDir);

console.log("\n=== CLEANING PUBLIC/PROJECTS ===");
cleanLegacyPngs(projectsDir);

console.log("\nClean up complete!");
