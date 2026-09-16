import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const targetDir = path.resolve("./public/projects");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Possible browser executable paths on Windows
const browserPaths = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env.LOCALAPPDATA}\\Microsoft\\Edge\\Application\\msedge.exe`,
  `${process.env.PROGRAMFILES}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env["PROGRAMFILES(X86)"]}\\Microsoft\\Edge\\Application\\msedge.exe`,
];

let foundBrowser = null;
for (const p of browserPaths) {
  if (p && fs.existsSync(p)) {
    foundBrowser = p;
    console.log("Found browser executable:", foundBrowser);
    break;
  }
}

const sites = [
  {
    id: "study-platform",
    url: "https://collaborative-study-website-9ehf.vercel.app/",
    filename: "study-platform-live.png",
  },
  {
    id: "volunteer-platform",
    url: "https://assignment-11-eabb3.web.app/",
    filename: "volunteer-platform-live.png",
  },
  {
    id: "game-reviews",
    url: "https://assignment-game-review.web.app/",
    filename: "game-reviews-live.png",
  },
];

async function capture() {
  if (foundBrowser) {
    for (const site of sites) {
      const outputPath = path.join(targetDir, site.filename);
      console.log(`Capturing screenshot for ${site.url} -> ${outputPath}`);
      try {
        const cmd = `"${foundBrowser}" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,900 --virtual-time-budget=10000 --screenshot="${outputPath}" "${site.url}"`;
        execSync(cmd, { stdio: "inherit", timeout: 45000 });
        console.log(`Successfully captured ${site.filename}, size: ${fs.statSync(outputPath).size} bytes`);
      } catch (err) {
        console.error(`Error taking screenshot with browser for ${site.url}:`, err.message);
      }
    }
  } else {
    console.log("No local browser found, trying online screenshot API...");
    for (const site of sites) {
      const outputPath = path.join(targetDir, site.filename);
      const apiUrl = `https://image.thum.io/get/width/1200/crop/800/noanimate/${site.url}`;
      try {
        console.log(`Downloading from screenshot service: ${apiUrl}`);
        const res = await fetch(apiUrl);
        if (res.ok) {
          const buffer = Buffer.from(await res.arrayBuffer());
          fs.writeFileSync(outputPath, buffer);
          console.log(`Successfully saved ${site.filename} (${buffer.length} bytes)`);
        }
      } catch (err) {
        console.error(`Error fetching from service for ${site.url}:`, err.message);
      }
    }
  }
}

capture();
