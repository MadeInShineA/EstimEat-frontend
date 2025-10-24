# EstimEat Frontend - Restaurant Location Intelligence

This is the frontend repository for the EstimEat project, a data-driven platform helping restaurant owners find the best locations to open their businesses in Swiss communes. Built with React, TypeScript, and Leaflet for comprehensive geospatial analysis and location intelligence.

## Features

- **Interactive Map**: Explore Swiss communes with interactive heatmaps and detailed geographic data visualization
- **Demography per City**: Detailed demographic data and population statistics for each Swiss commune
- **New Buildings**: Track construction trends and new building developments across communes
- **Third Sector Jobs**: Detailed data on jobs in the third sector across Swiss communes
- **Third Sector Establishments**: Information on establishments in the third sector for economic analysis
- **Restaurants Growth**: Monitor the growth in number of restaurants and dining establishments over time
- **Real-time Search**: Find communes instantly with intelligent search functionality
- **Dark Mode**: Full dark theme support with smooth transitions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
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
