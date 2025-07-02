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
┌───────────────��─────────────────────────┐
│        🚀 Weather App Deployment       │
└─────────────────────────────────────────┘${colors.reset}
`);

async function deploy() {
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

    // Check if frontend has node_modules
    if (!fs.existsSync("frontend/node_modules")) {
      log(
        "yellow",
        "⚠️  WARNING:",
        "Frontend dependencies not installed. Installing...",
      );

      await new Promise((resolve, reject) => {
        const install = spawn("npm", ["install"], {
          cwd: path.join(__dirname, "frontend"),
          stdio: "inherit",
          shell: true,
        });

        install.on("close", (code) => {
          if (code === 0) {
            log("green", "✅ SETUP:", "Dependencies installed successfully");
            resolve();
          } else {
            reject(new Error(`npm install failed with code ${code}`));
          }
        });
      });
    }

    // Check for environment variables
    const frontendEnvPath = path.join(__dirname, "frontend", ".env.local");
    if (!fs.existsSync(frontendEnvPath)) {
      log(
        "yellow",
        "⚠️  ENV:",
        "No .env.local found in frontend. You'll need to set environment variables in Vercel.",
      );
    }

    // Navigate to frontend directory
    process.chdir("frontend");

    log("blue", "📦 BUILD:", "Building Next.js application...");

    // Build the application
    await new Promise((resolve, reject) => {
      const build = spawn("npm", ["run", "build"], {
        stdio: "inherit",
        shell: true,
      });

      build.on("close", (code) => {
        if (code === 0) {
          log("green", "✅ BUILD:", "Application built successfully");
          resolve();
        } else {
          reject(new Error(`Build failed with code ${code}`));
        }
      });
    });

    log("blue", "🚀 DEPLOY:", "Deploying to Vercel...");

    // Deploy to Vercel
    await new Promise((resolve, reject) => {
      const deploy = spawn("npx", ["vercel", "--prod"], {
        stdio: "inherit",
        shell: true,
      });

      deploy.on("close", (code) => {
        if (code === 0) {
          log("green", "✅ DEPLOY:", "Deployment successful!");
          resolve();
        } else {
          reject(new Error(`Deployment failed with code ${code}`));
        }
      });
    });

    console.log(`${colors.bright}${colors.green}
┌─────────────────────────────────────────┐
│          🎉 DEPLOYMENT COMPLETE! 🎉     │
├─────────────────────────────────────────┤
│  Your weather app is now live!         │
│                                         │
│  Don't forget to set environment        │
│  variables in Vercel dashboard:         │
│  • OPENWEATHER_API_KEY                  │
│  • MAPBOX_ACCESS_TOKEN                  │
└─────────────────────────────────────────┘${colors.reset}
    `);
  } catch (error) {
    log("red", "❌ ERROR:", error.message);
    console.log(`\n${colors.yellow}💡 Troubleshooting:${colors.reset}`);
    console.log(
      "• Make sure you have Vercel CLI installed: npm install -g vercel",
    );
    console.log('• Run "vercel login" if not authenticated');
    console.log("• Check that all API keys are set in Vercel dashboard");
    process.exit(1);
  }
}

deploy();
