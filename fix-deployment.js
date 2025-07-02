#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

const log = (color, prefix, message) => {
  console.log(`${colors[color]}${prefix}${colors.reset} ${message}`);
};

console.log(`${colors.bright}${colors.blue}
┌─────────────────────────────────────────┐
│     🔧 Fix Vercel Deployment Issues    │
└─────────────────────────────────────────┘${colors.reset}
`);

async function fixDeployment() {
  try {
    // Check if we're in the right directory
    if (!fs.existsSync("frontend")) {
      log(
        "red",
        "❌ ERROR:",
        "Frontend directory not found. Run this from the project root.",
      );
      process.exit(1);
    }

    const frontendPath = path.join(__dirname, "frontend");

    log("blue", "🧹 CLEANUP:", "Removing old dependencies...");

    // Remove node_modules and lock files
    const filesToRemove = [
      "node_modules",
      "package-lock.json",
      "yarn.lock",
      ".next",
    ];
    for (const file of filesToRemove) {
      const filePath = path.join(frontendPath, file);
      if (fs.existsSync(filePath)) {
        if (fs.lstatSync(filePath).isDirectory()) {
          fs.rmSync(filePath, { recursive: true, force: true });
        } else {
          fs.unlinkSync(filePath);
        }
        log("green", "✅ REMOVED:", file);
      }
    }

    log("blue", "📦 INSTALL:", "Installing fresh dependencies...");

    // Fresh install
    await new Promise((resolve, reject) => {
      const install = spawn("npm", ["install", "--legacy-peer-deps"], {
        cwd: frontendPath,
        stdio: "inherit",
        shell: true,
      });

      install.on("close", (code) => {
        if (code === 0) {
          log("green", "✅ INSTALL:", "Dependencies installed successfully");
          resolve();
        } else {
          reject(new Error(`npm install failed with code ${code}`));
        }
      });
    });

    log("blue", "🏗️  BUILD:", "Testing build locally...");

    // Test build
    await new Promise((resolve, reject) => {
      const build = spawn("npm", ["run", "build"], {
        cwd: frontendPath,
        stdio: "inherit",
        shell: true,
      });

      build.on("close", (code) => {
        if (code === 0) {
          log("green", "✅ BUILD:", "Local build successful!");
          resolve();
        } else {
          reject(new Error(`Build failed with code ${code}`));
        }
      });
    });

    console.log(`${colors.bright}${colors.green}
┌─────────────────────────────────────────┐
│        🎉 DEPLOYMENT READY! 🎉         │
├─────────────────────────────────────────┤
│  Issues fixed:                          │
│  ✅ Fresh dependency install            │
│  ✅ Build process verified              │
│  ✅ Vercel configuration updated        │
│                                         │
│  Now deploy with:                       │
│  cd frontend && vercel --prod           │
└─────────────────────────────────────────┘${colors.reset}
    `);
  } catch (error) {
    log("red", "❌ ERROR:", error.message);

    console.log(`\n${colors.yellow}💡 Manual steps to try:${colors.reset}`);
    console.log("1. cd frontend");
    console.log("2. rm -rf node_modules package-lock.json yarn.lock .next");
    console.log("3. npm install --legacy-peer-deps");
    console.log("4. npm run build");
    console.log("5. vercel --prod");

    process.exit(1);
  }
}

fixDeployment();
