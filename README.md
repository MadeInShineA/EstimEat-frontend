# EstimEat - Swiss Commune Analytics

A modern, interactive web application for exploring Swiss commune population trends and demographic data. Built with React, TypeScript, and Leaflet for comprehensive geospatial analysis.

## Features

- **Interactive Heat Maps**: Visualize commune data with dynamic heatmaps and custom markers
- **Real-time Search**: Find communes instantly with intelligent search functionality
- **Dark Mode**: Full dark theme support with smooth transitions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Data Analytics**: Access population growth, economic indicators, and trend analysis
- **Modern UI**: Glassmorphism effects, smooth animations, and professional design

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Maps**: Leaflet with heat layer support
- **Backend**: Supabase for data management
- **Build**: Vite for fast development and optimized production builds

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd estimEat-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Data Sources

This application uses official Swiss federal statistical data for commune information and geographic boundaries.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is open source and available under the MIT License.
