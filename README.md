# Weather Analytics Dashboard 🌤️

A modern, real-time weather analytics dashboard built with React, TypeScript, and Redux. Get instant weather updates, forecasts, and manage your favorite cities with a beautiful, responsive interface.

![Weather Analytics Dashboard](<img width="2256" height="1377" alt="image" src="https://github.com/user-attachments/assets/d8d0c1f4-d054-4d99-9d32-d2c218e3aaed" />
)
![TypeScript](<img width="2256" height="1377" alt="image" src="https://github.com/user-attachments/assets/e5e87e37-ae4d-4b27-b52f-bab487f1111b" />
)
![Redux](<img width="2256" height="1377" alt="image" src="https://github.com/user-attachments/assets/1c4ca2b5-4573-4248-b361-c60e282d45d3" />
)

## ✨ Features

### 🌍 City Search & Management
- **Smart City Search**: Real-time city search with autocomplete
- **Favorite Cities**: Add unlimited cities to your favorites
- **One-Click Selection**: Click any search result to add and view weather
- **Quick Favorites**: Star icon for instant favorite addition

### 🌡️ Weather Data
- **Current Weather**: Real-time temperature, humidity, wind speed, and more
- **5-Day Forecast**: Detailed 3-hour interval forecasts
- **Multiple Units**: Toggle between Celsius and Fahrenheit
- **Weather Icons**: Intuitive weather condition icons
- **Feels Like Temperature**: Apparent temperature display

### 📊 Dashboard Features
- **Beautiful UI**: Modern gradient design with smooth animations
- **Responsive Grid**: Adapts to any screen size (mobile, tablet, desktop)
- **Weather Cards**: Interactive cards with hover effects
- **Auto-Refresh**: Manual refresh button with loading states
- **Last Updated**: Timestamp showing data freshness
- **Empty State**: Helpful guidance when no cities are added

### ⚙️ Settings & Customization
- **Temperature Units**: Switch between Celsius (°C) and Fahrenheit (°F)
- **Persistent Storage**: Settings and favorites saved to localStorage
- **Theme Support**: Clean, professional color scheme

### 🚀 Performance
- **API Caching**: 10-minute cache to reduce API calls
- **Debounced Search**: Optimized search with 300ms debounce
- **Lazy Loading**: Efficient component rendering
- **Smooth Animations**: Framer Motion for fluid transitions

## 🛠️ Technology Stack

### Frontend Framework
- **React 18.x**: Latest React with concurrent features
- **TypeScript 5.x**: Type-safe development
- **React Router 6**: Client-side routing

### State Management
- **Redux Toolkit**: Modern Redux with less boilerplate
- **Redux Thunk**: Async action handling
- **React Redux**: React bindings for Redux

### UI & Animation
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth, production-ready animations
- **Lucide React**: Beautiful, consistent icons

### API & Data
- **Axios**: HTTP client for API requests
- **OpenWeatherMap API**: Weather data provider
- **Lodash**: Utility functions (debounce)

### Development Tools
- **Create React App**: Zero-config setup
- **ESLint**: Code linting
- **Prettier**: Code formatting

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16.x or higher)
- **npm** (v8.x or higher) or **yarn** (v1.22.x or higher)
- **OpenWeatherMap API Key** (free tier available)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/weather-analytics.git
cd weather-analytics
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key_here
```

**How to get an API key:**
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to API Keys section
4. Copy your API key
5. Paste it in the `.env` file

### 4. Start Development Server
```bash
npm start
# or
yarn start
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
weather-analytics/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx          # Main dashboard component
│   │   ├── WeatherCard.tsx        # Weather card component
│   │   ├── SearchBar.tsx          # City search modal
│   │   ├── SettingsPanel.tsx      # Settings component
│   │   └── CityDetail.tsx         # Detailed city view
│   ├── store/
│   │   ├── index.ts               # Redux store configuration
│   │   └── weatherSlice.ts        # Weather state slice
│   ├── services/
│   │   └── weatherAPI.ts          # API service layer
│   ├── types/
│   │   └── weather.ts             # TypeScript interfaces
│   ├── utils/
│   │   └── weatherUtils.ts        # Utility functions
│   ├── App.tsx                    # Main app component
│   ├── index.tsx                  # App entry point
│   └── index.css                  # Global styles
├── .env                           # Environment variables
├── .env.example                   # Example env file
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
└── README.md                      # This file
```

## 🎯 Usage Guide

### Adding Cities

#### Method 1: Search and Click
1. Click on the search bar at the top
2. Type a city name (e.g., "Mumbai", "New York")
3. Click on any search result
4. City is added to favorites and weather is displayed

#### Method 2: Star Icon
1. Click on the search bar
2. Type a city name
3. Click the star (⭐) icon next to the city
4. City is added to favorites

### Viewing Weather Details
- Click on any weather card to view detailed information
- See 5-day forecast with 3-hour intervals
- View wind direction, precipitation probability, and more

### Removing Cities
- Click the filled star (⭐) icon on any weather card
- City is removed from favorites

### Changing Temperature Units
1. Click the settings icon (⚙️) in the header
2. Toggle between Celsius and Fahrenheit
3. All temperatures update instantly

### Refreshing Data
- Click the "Refresh" button in the header
- All weather data is updated for all cities
- Loading indicator shows during update

## 🔧 Configuration

### API Configuration
Edit `src/services/weatherAPI.ts` to customize:
- **Cache Duration**: Default is 10 minutes
- **Request Timeout**: Add timeout to axios config
- **Units**: Default is metric (Celsius)

```typescript
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
```

### Search Configuration
Edit `src/components/SearchBar.tsx` to customize:
- **Debounce Delay**: Default is 300ms
- **Results Limit**: Default is 5 cities

```typescript
debounce(async (searchQuery: string) => {
  // Search logic
}, 300) // 300ms debounce
```

## 🎨 Customization

### Styling
The app uses Tailwind CSS. Customize colors in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#6366F1',
      }
    }
  }
}
```

### Animations
Customize animations in component files using Framer Motion:

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {/* Content */}
</motion.div>
```

## 📊 API Endpoints Used

### OpenWeatherMap API (Free Tier)

1. **Current Weather Data**
   - Endpoint: `/data/2.5/weather`
   - Method: GET
   - Returns: Current weather conditions

2. **5 Day Forecast**
   - Endpoint: `/data/2.5/forecast`
   - Method: GET
   - Returns: 5-day forecast with 3-hour intervals

3. **Geocoding API**
   - Endpoint: `/geo/1.0/direct`
   - Method: GET
   - Returns: City coordinates and details

## 🐛 Troubleshooting

### Common Issues

#### API Key Not Working
- Ensure API key is correctly added to `.env` file
- Wait 10-15 minutes after generating a new API key
- Check OpenWeatherMap account is activated

#### Cities Not Loading
- Check internet connection
- Verify API key is valid
- Check browser console for errors
- Clear browser cache and localStorage

#### Search Not Working
- Ensure city name is spelled correctly
- Try searching with different variations
- Check if API rate limit is reached

#### Temperature Not Displaying
- Verify API response in browser DevTools
- Check Redux store state
- Ensure temperature unit conversion is working

### Debug Mode
Open browser console (F12) to see:
- API request/response logs
- Redux state changes
- Error messages

## 🚀 Building for Production

### Create Production Build
```bash
npm run build
# or
yarn build
```

This creates an optimized build in the `build/` folder.

### Environment Variables for Production
Create a `.env.production` file:

```env
REACT_APP_WEATHER_API_KEY=your_production_api_key
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Drag and drop `build/` folder to Netlify
3. Add environment variables in Netlify settings

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Add environment variables in Vercel dashboard

## 📈 Performance Optimization

### Implemented Optimizations
- ✅ API response caching (10 minutes)
- ✅ Debounced search (300ms)
- ✅ Lazy loading components
- ✅ Memoized expensive calculations
- ✅ Optimized re-renders with React.memo
- ✅ Code splitting with React.lazy

### Future Optimizations
- [ ] Service Worker for offline support
- [ ] Image lazy loading
- [ ] Virtual scrolling for large city lists
- [ ] Progressive Web App (PWA) features

## 🔐 Security

### Best Practices Implemented
- ✅ API key stored in environment variables
- ✅ No sensitive data in client-side code
- ✅ Input sanitization in search
- ✅ HTTPS enforcement in production
- ✅ XSS protection with React

### Recommendations
- Never commit `.env` file to Git
- Use environment-specific API keys
- Implement rate limiting on API calls
- Regular dependency updates

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit Your Changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines
- Write clear, descriptive commit messages
- Follow existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for the weather API
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities
- React and TypeScript communities

## 📞 Support

Having issues? Here's how to get help:

- **GitHub Issues**: [Create an issue](https://github.com/yourusername/weather-analytics/issues)
- **Email**: your.email@example.com
- **Documentation**: Check this README and code comments

## 🗺️ Roadmap

### Version 2.0 (Planned)
- [ ] Weather alerts and notifications
- [ ] Historical weather data charts
- [ ] Compare weather between cities
- [ ] Dark mode support
- [ ] Mobile app (React Native)

### Version 2.1 (Future)
- [ ] Weather radar integration
- [ ] Air quality index
- [ ] UV index and sun position
- [ ] Weather widgets for embedding
- [ ] Multi-language support

## 📊 Project Stats

- **React**: v18.2.0
- **TypeScript**: v5.0.0
- **Redux Toolkit**: v1.9.0
- **Bundle Size**: ~500KB (gzipped)
- **Performance Score**: 95+ (Lighthouse)

---

**Made with ❤️ by [Your Name]**

⭐ Star this repo if you find it helpful!
