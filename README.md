# Professional Weather App

A modern, professional weather application built with Node.js backend and Next.js frontend that provides accurate weather information through CLI, web, and professional Next.js interfaces.

## Features

- 🌤️ **Real-time Weather Data**: Get current weather conditions for any location
- 🖥️ **Triple Interface**: CLI tool, Express web app, and professional Next.js frontend
- 🚀 **Next.js Frontend**: Modern React with TypeScript, Tailwind CSS, and Framer Motion
- 🎨 **Glass Morphism UI**: Beautiful, modern design with smooth animations
- 🔒 **Secure**: Environment-based API key management
- ⚡ **Fast**: Modern async/await architecture with optimized performance
- 🌍 **Global**: Works with locations worldwide
- 📱 **Responsive**: Mobile-friendly design across all interfaces
- 💎 **TypeScript**: Full type safety and developer experience

## Prerequisites

- Node.js (v14 or higher)
- NPM or Yarn
- OpenWeatherMap API key
- Mapbox Access Token

## Quick Start

**🚀 One-command setup:**

```bash
npm run setup && npm run dev
```

**Manual setup:**

1. Clone and install:

```bash
git clone <repository-url>
cd weather-app
npm install
```

2. Run setup:

```bash
npm run setup
```

3. Edit `.env` file with your API keys:

```env
OPENWEATHER_API_KEY=your_openweathermap_api_key_here
MAPBOX_ACCESS_TOKEN=your_mapbox_access_token_here
PORT=3000
NODE_ENV=development
```

4. Start development:

```bash
npm run dev
```

## Getting API Keys

### OpenWeatherMap API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key
4. Add it to your `.env` file

### Mapbox Access Token

1. Visit [Mapbox](https://www.mapbox.com/)
2. Create a free account
3. Generate an access token
4. Add it to your `.env` file

## Usage

**🎯 Main Development (Recommended):**

```bash
npm run dev
```

Opens both:

- **Next.js Frontend**: http://localhost:3001 (Professional UI)
- **Express Backend**: http://localhost:3000 (API & Simple Web)

**🖥️ CLI Interface:**

```bash
npm start "New York"              # Basic usage
node app.js "London, UK" --verbose # Detailed output
node app.js --help                 # Show help
```

**⚙️ Individual Services:**

```bash
npm run dev:frontend    # Next.js only (port 3001)
npm run dev:web        # Express only (port 3000)
npm run dev:cli        # CLI with auto-restart
```

## Development

Run in development mode with auto-restart:

```bash
npm run dev
```

## Project Structure

```
weather-app/
├── config/
│   └── config.js          # Configuration management
├── frontend/              # Next.js frontend application
│   ├── app/              # App Router pages
│   ├── components/       # React components
│   ├── lib/             # Utilities and services
│   ├── types/           # TypeScript definitions
│   └── package.json     # Frontend dependencies
├── public/               # Express web interface assets
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── utils/
│   ├── forecast.js       # Weather API integration
│   └── geocode.js        # Location geocoding
├── app.js                # CLI application
├── web-server.js         # Express web server
├── package.json          # Backend dependencies
├── .env.example
└── README.md
```

## API Endpoints

### GET /api/weather

Get weather data for a location.

**Parameters:**

- `location` (query): Location name or address

**Response:**

```json
{
  "success": true,
  "data": {
    "location": "London",
    "temperature": 15,
    "feelsLike": 14,
    "humidity": 80,
    "description": "light rain",
    "summary": "light rain. It is currently 15°C (feels like 14°C) with 80% humidity.",
    "coordinates": {
      "latitude": 51.5074,
      "longitude": -0.1278
    },
    "fullLocation": "London, England, United Kingdom"
  }
}
```

## Error Handling

The application includes comprehensive error handling for:

- Network connectivity issues
- Invalid API keys
- Location not found
- API rate limits
- Malformed requests

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 🚀 Deployment

### Vercel (Recommended)

Deploy the Next.js frontend with built-in API routes:

1. **Quick Deploy**:

   ```bash
   cd frontend && vercel --prod
   ```

2. **Set Environment Variables**:
   - `OPENWEATHER_API_KEY`: Your OpenWeatherMap API key
   - `MAPBOX_ACCESS_TOKEN`: Your Mapbox access token

3. **Access your app**: `https://your-app.vercel.app`

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

### Other Platforms

The Next.js frontend can also be deployed to:

- **Netlify**: Set build command to `npm run build`
- **AWS Amplify**: Use the frontend directory
- **Docker**: Use the included Dockerfile

## License

ISC License
