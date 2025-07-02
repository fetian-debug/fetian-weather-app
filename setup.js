#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

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
│        🌤️  Weather App Setup           │
└─────────────────────────────────────────┘${colors.reset}
`);

async function setup() {
  try {
    // 1. Copy .env.example to .env if it doesn't exist
    if (!fs.existsSync(".env")) {
      log("blue", "📝 CONFIG:", "Creating .env file from template...");
      fs.copyFileSync(".env.example", ".env");
      log("green", "✅ CONFIG:", ".env file created successfully");
    } else {
      log("yellow", "⚠️  CONFIG:", ".env file already exists, skipping...");
    }

    // 2. Install frontend dependencies
    if (fs.existsSync("frontend")) {
      log("blue", "📦 FRONTEND:", "Installing Next.js dependencies...");

      await new Promise((resolve, reject) => {
        const install = spawn("npm", ["install"], {
          cwd: path.join(__dirname, "frontend"),
          stdio: "inherit",
          shell: true,
        });

        install.on("close", (code) => {
          if (code === 0) {
            log("green", "✅ FRONTEND:", "Dependencies installed successfully");
            resolve();
          } else {
            reject(new Error(`npm install failed with code ${code}`));
          }
        });
      });
    }

    // 3. Create frontend .env if needed
    const frontendEnvPath = path.join(__dirname, "frontend", ".env.local");
    if (!fs.existsSync(frontendEnvPath)) {
      log("blue", "📝 FRONTEND:", "Creating frontend environment file...");
      const frontendEnv = `WEATHER_API_URL=http://localhost:3000\nNEXT_PUBLIC_APP_NAME=WeatherPro\n`;
      fs.writeFileSync(frontendEnvPath, frontendEnv);
      log("green", "✅ FRONTEND:", "Environment file created");
    }

    console.log(`${colors.bright}${colors.green}
┌─────────────────────────────────────────┐
│            🎉 SETUP COMPLETE! 🎉       │
├─────────────────────────────────────────┤
│  Next Steps:                            │
│  1. Edit .env with your API keys        │
│  2. Run: npm run dev                    │
│  3. Visit: http://localhost:3001        │
└─────────────────────────────────────────┘${colors.reset}

${colors.yellow}📋 Required API Keys:${colors.reset}
• OpenWeatherMap: https://openweathermap.org/api
• Mapbox: https://www.mapbox.com/

${colors.cyan}🚀 Quick Start:${colors.reset}
npm run dev    # Start both frontend and backend
npm start      # CLI tool (after setting up .env)
    `);
  } catch (error) {
    log("red", "❌ ERROR:", error.message);
    process.exit(1);
  }
}

setup();
