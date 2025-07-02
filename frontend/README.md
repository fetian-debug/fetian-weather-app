# WeatherPro Frontend

A professional Next.js frontend for the Weather App with modern React components, TypeScript, and Tailwind CSS.

## Features

- 🚀 **Next.js 14** with App Router
- 💎 **TypeScript** for type safety
- 🎨 **Tailwind CSS** for styling
- ✨ **Framer Motion** for animations
- 🔍 **Lucide React** for icons
- 📱 **Responsive Design** for all devices
- 🌟 **Glass Morphism** UI design
- ⚡ **Fast Performance** and SEO optimized

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env.local
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3001](http://localhost:3001) in your browser.

## Project Structure

```
frontend/
├── app/                 # App Router pages
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── SearchForm.tsx   # Search form component
│   ├── WeatherCard.tsx  # Weather display component
│   ├── LoadingSpinner.tsx
│   └── ErrorMessage.tsx
├── lib/                 # Utilities and services
│   └── weatherApi.ts    # Weather API service
├── types/               # TypeScript type definitions
│   └── weather.ts       # Weather data types
└── styles/              # Additional styles
    └── globals.css      # Global CSS with Tailwind
```

## Components

### SearchForm

- Modern search input with validation
- Loading states and error handling
- Smooth animations

### WeatherCard

- Professional weather data display
- Interactive elements with hover effects
- Temperature color coding
- Responsive grid layout

### LoadingSpinner

- Animated loading states
- Weather-themed animations
- Progress indicators

### ErrorMessage

- User-friendly error handling
- Retry functionality
- Clear error messages

## API Integration

The frontend communicates with the Express.js backend running on port 3000. The weather API service handles:

- HTTP requests to weather endpoints
- Error handling and retry logic
- Type-safe data transformation
- Loading state management

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The frontend can be deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any platform supporting Node.js

Make sure to set the `WEATHER_API_URL` environment variable to point to your deployed backend API.
