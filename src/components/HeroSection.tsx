import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  isVisible: boolean;
  onEnterApp: () => void;
}

export function HeroSection({ isVisible, onEnterApp }: HeroSectionProps) {
  return (
    <section className="px-6 py-20">
      <div className="max-w-7xl mx-auto text-center">
        <div className={`animate-fade-in-up ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-6xl md:text-8xl font-black mb-8 transform hover:scale-105 transition-transform duration-500">
            <span className="bg-gradient-to-r from-emerald-600 via-cyan-600 via-blue-600 to-purple-600 dark:from-emerald-400 dark:via-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent animate-gradient">
              EstimEat
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-4xl mx-auto leading-relaxed font-light">
            Advanced analytics for Swiss commune population trends and growth patterns.
            Discover insights that drive informed decisions with cutting-edge AI technology.
          </p>
        </div>

        <div className={`animate-fade-in-scale ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
          <button
            onClick={onEnterApp}
            className="group relative inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 text-white font-bold rounded-2xl shadow-2xl shadow-emerald-500/25 dark:shadow-emerald-500/10 hover:shadow-3xl hover:shadow-emerald-500/40 transform hover:scale-105 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative text-lg">Explore Analytics</span>
            <ArrowRight className="relative w-6 h-6 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 to-blue-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
}