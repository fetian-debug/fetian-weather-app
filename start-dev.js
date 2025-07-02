#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

const log = (color, prefix, message) => {
  console.log(`${colors[color]}${prefix}${colors.reset} ${message}`);
};

// Check if frontend directory exists
if (!fs.existsSync(path.join(__dirname, "frontend"))) {
  log(
    "red",
    "❌ ERROR:",
    "Frontend directory not found. Please run setup first.",
  );
  process.exit(1);
}

// Check if .env file exists
if (!fs.existsSync(".env")) {
  log(
    "yellow",
    "⚠️  WARNING:",
    ".env file not found. Please copy .env.example to .env and configure API keys.",
  );
}

console.log(`${colors.bright}${colors.blue}
┌─────────────────────────────────────────┐
│     🌤️  Weather App Dev Environment     │
└─────────────────────────────────────────┘${colors.reset}
`);

let backendReady = false;
let frontendReady = false;

// Start Express backend
log("blue", "📡 BACKEND:", "Starting Express server on port 3000...");
const backend = spawn("node", ["web-server.js"], {
  cwd: __dirname,
  stdio: ["inherit", "pipe", "pipe"],
});

// Start Next.js frontend
setTimeout(() => {
  log(
    "cyan",
    "⚛️  FRONTEND:",
    "Starting Next.js development server on port 3001...",
  );

  const frontend = spawn("npm", ["run", "dev"], {
    cwd: path.join(__dirname, "frontend"),
    stdio: ["inherit", "pipe", "pipe"],
    shell: true,
  });

  // Handle backend output
  backend.stdout.on("data", (data) => {
    const output = data.toString().trim();
    if (output.includes("Weather app server running")) {
      backendReady = true;
      log(
        "green",
        "✅ BACKEND:",
        "Express server ready at http://localhost:3000",
      );
      checkAllReady();
    } else {
      log("blue", "📡 BACKEND:", output);
    }
  });

  backend.stderr.on("data", (data) => {
    log("red", "❌ BACKEND ERROR:", data.toString().trim());
  });

  // Handle frontend output
  frontend.stdout.on("data", (data) => {
    const output = data.toString().trim();
    if (output.includes("Ready") || output.includes("localhost:3001")) {
      frontendReady = true;
      log("green", "✅ FRONTEND:", "Next.js ready at http://localhost:3001");
      checkAllReady();
    } else if (!output.includes("webpack") && !output.includes("Compiling")) {
      log("cyan", "⚛️  FRONTEND:", output);
    }
  });

  frontend.stderr.on("data", (data) => {
    const error = data.toString().trim();
    if (!error.includes("webpack-dev-server") && error.length > 0) {
      log("red", "❌ FRONTEND ERROR:", error);
    }
  });

  // Handle process termination
  const cleanup = () => {
    log("yellow", "🛑 SHUTDOWN:", "Stopping development servers...");
    try {
      backend.kill("SIGTERM");
      frontend.kill("SIGTERM");
    } catch (e) {
      // Processes might already be dead
    }
    setTimeout(() => process.exit(0), 1000);
  };

  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);

  backend.on("close", (code) => {
    if (code !== 0) {
      log("red", "❌ BACKEND:", `Process exited with code ${code}`);
    }
    frontend.kill("SIGTERM");
  });

  frontend.on("close", (code) => {
    if (code !== 0) {
      log("red", "❌ FRONTEND:", `Process exited with code ${code}`);
    }
    backend.kill("SIGTERM");
  });
}, 1000);

function checkAllReady() {
  if (backendReady && frontendReady) {
    console.log(`${colors.bright}${colors.green}
┌─────────────────────────────────────────┐
│            🎉 ALL READY! 🎉            │
├─────────────────────────────────────────┤
│  Next.js Frontend: http://localhost:3001  │
│  Express Backend:  http://localhost:3000  │
│  CLI Tool: npm start "London"             │
└─────────────────────────────────────────┘${colors.reset}
    `);
  }
}
