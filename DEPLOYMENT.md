# 🚀 Vercel Deployment Guide

This guide will help you deploy the Weather App to Vercel in minutes.

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **API Keys**: Get your API keys ready:
   - [OpenWeatherMap API Key](https://openweathermap.org/api)
   - [Mapbox Access Token](https://www.mapbox.com/)

## 🚀 Quick Deploy (Recommended)

### Option 1: Deploy Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/weather-app&project-name=weather-app&repository-name=weather-app)

### Option 2: Manual Deployment

1. **Install Vercel CLI**:

```bash
npm install -g vercel
```

2. **Navigate to frontend directory**:

```bash
cd frontend
```

3. **Deploy to Vercel**:

```bash
vercel --prod
```

4. **Set Environment Variables** (during deployment or after):
   - `OPENWEATHER_API_KEY`: Your OpenWeatherMap API key
   - `MAPBOX_ACCESS_TOKEN`: Your Mapbox access token

## 🔐 Environment Variables Setup

### During Deployment

Vercel will prompt you to set environment variables:

```
? Set up environment variables? Yes
? OPENWEATHER_API_KEY: your_api_key_here
? MAPBOX_ACCESS_TOKEN: your_token_here
```

### After Deployment

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   - `OPENWEATHER_API_KEY` → Your OpenWeatherMap API key
   - `MAPBOX_ACCESS_TOKEN` → Your Mapbox access token

## 📁 Project Structure for Vercel

```
weather-app/
├── frontend/              # 👈 This gets deployed to Vercel
│   ├── app/
│   │   ├── api/
│   │   │   └── weather/
│   │   │       └── route.ts  # Serverless API endpoint
│   │   ├── page.tsx       # Main app page
│   │   └── layout.tsx     # App layout
│   ├── components/        # React components
│   ├── lib/              # Utilities
│   ├── package.json      # Frontend dependencies
│   ├── vercel.json       # Vercel configuration
│   └── next.config.js    # Next.js configuration
└── ...                   # Backend files (not deployed)
```

## 🔧 Vercel Configuration

The `frontend/vercel.json` file configures:

- **Framework**: Next.js
- **API Routes**: Weather endpoint with 10s timeout
- **CORS Headers**: Allow API access
- **Environment Variables**: Reference to secrets

## 🧪 Testing Deployment

After deployment, test these endpoints:

1. **Main App**: `https://your-app.vercel.app`
2. **API Health**: `https://your-app.vercel.app/api/weather?location=London`

Expected API response:

```json
{
  "success": true,
  "data": {
    "location": "London",
    "temperature": 15,
    "feelsLike": 14,
    "humidity": 80,
    "description": "light rain",
    "coordinates": { "latitude": 51.5074, "longitude": -0.1278 },
    "fullLocation": "London, England, United Kingdom"
  }
}
```

## 🐛 Troubleshooting

### Common Issues:

1. **"Missing API keys" error**:
   - Check environment variables in Vercel dashboard
   - Redeploy after adding variables

2. **API timeout errors**:
   - API routes have 10s timeout limit
   - Check external API availability

3. **Build failures**:
   - Ensure all dependencies are in `frontend/package.json`
   - Check Node.js version compatibility

4. **CORS errors**:
   - Check `vercel.json` headers configuration
   - Ensure API routes are under `/api/` path

### Debug Commands:

```bash
# Check deployment logs
vercel logs https://your-app.vercel.app

# Test API locally
cd frontend && npm run dev
curl http://localhost:3001/api/weather?location=London
```

## 🔄 Updates & Redeployment

### Automatic Deployment

- Connected to Git: Push to main branch
- Vercel automatically rebuilds and deploys

### Manual Deployment

```bash
cd frontend
vercel --prod
```

## 📊 Performance & Monitoring

- **Analytics**: Available in Vercel dashboard
- **Edge Locations**: Global CDN for fast loading
- **Serverless Functions**: Auto-scaling API endpoints

## 🌐 Custom Domain (Optional)

1. Go to Vercel project settings
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL certificate automatically provided

## 📞 Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Weather App Issues**: Create GitHub issue

---

🎉 **That's it!** Your weather app is now live on Vercel with serverless API endpoints and global CDN distribution.
