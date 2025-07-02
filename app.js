#!/usr/bin/env node

const chalk = require("chalk");
const yargs = require("yargs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const { validateConfig } = require("./config/config");

// Validate configuration
try {
  validateConfig();
} catch (error) {
  console.log(chalk.red("Configuration Error:"), error.message);
  console.log(
    chalk.yellow(
      "Please check your .env file and ensure all required variables are set.",
    ),
  );
  process.exit(1);
}

// Configure yargs
const argv = yargs
  .usage("$0 <location>", "Get weather forecast for a location")
  .command("$0 <location>", "Get weather forecast", (yargs) => {
    yargs.positional("location", {
      describe: "Location to get weather for",
      type: "string",
    });
  })
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Show detailed weather information",
  })
  .help()
  .alias("help", "h").argv;

const getWeather = async (location, verbose = false) => {
  try {
    console.log(chalk.blue("🔍 Searching for location..."));

    const geocodeData = await geocode(location);
    console.log(chalk.green("📍 Location found:"), geocodeData.location);

    console.log(chalk.blue("🌤️  Fetching weather data..."));

    const forecastData = await forecast(
      geocodeData.latitude,
      geocodeData.longitude,
    );

    console.log(chalk.green("\n📋 Weather Report:"));
    console.log(chalk.yellow("━".repeat(50)));
    console.log(chalk.cyan("Location:"), forecastData.location);
    console.log(chalk.cyan("Temperature:"), `${forecastData.temperature}°C`);
    console.log(chalk.cyan("Feels like:"), `${forecastData.feelsLike}°C`);
    console.log(chalk.cyan("Humidity:"), `${forecastData.humidity}%`);
    console.log(chalk.cyan("Conditions:"), forecastData.description);

    if (verbose) {
      console.log(chalk.yellow("\n📊 Detailed Information:"));
      console.log(
        chalk.cyan("Coordinates:"),
        `${geocodeData.latitude}, ${geocodeData.longitude}`,
      );
      console.log(chalk.cyan("Full Address:"), geocodeData.location);
    }

    console.log(chalk.yellow("━".repeat(50)));
    console.log(chalk.white(forecastData.summary));
  } catch (error) {
    console.log(chalk.red("❌ Error:"), error.message);
    process.exit(1);
  }
};

// Handle the command
if (argv.location) {
  getWeather(argv.location, argv.verbose);
} else {
  yargs.showHelp();
}
