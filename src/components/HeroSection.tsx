import { ArrowRight, TrendingUp } from 'lucide-react';

interface HeroSectionProps {
  isVisible: boolean;
  onEnterApp: () => void;
}

export function HeroSection({ isVisible, onEnterApp }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-8 sm:px-12 lg:px-16 py-20">
      <div className={`max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/80 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/50">
            <TrendingUp className="w-4 h-4" />
            Swiss Commune Analytics Platform
          </div>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
          <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent">
            Discover Swiss
          </span>
          <br />
          <span className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
            Commune Trends
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Explore population growth, economic indicators, and demographic shifts across Switzerland's communes.
          Make data-driven decisions with our interactive analytics platform.
        </p>

        <div className="flex justify-center">
          <button
            onClick={onEnterApp}
            className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold text-lg rounded-2xl shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center gap-3">
              Explore the Map
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </div>


      </div>
    </section>
  );
}