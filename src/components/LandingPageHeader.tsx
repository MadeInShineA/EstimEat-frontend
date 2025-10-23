import { MapPin, Moon, Sun } from 'lucide-react';

interface LandingPageHeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onEnterApp: () => void;
}

export function LandingPageHeader({ isDark, onToggleTheme, onEnterApp }: LandingPageHeaderProps) {
  return (
    <header className="px-6 py-8 relative z-10 glass dark:glass-dark border-b border-white/20 dark:border-gray-600/20 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4 animate-slide-in-left">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/25 dark:shadow-emerald-500/10 animate-glow">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl blur opacity-30 animate-pulse"></div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent dark:from-emerald-400 dark:via-cyan-400 dark:to-blue-400 animate-gradient">
            EstimEat
          </span>
        </div>
        <div className="flex items-center gap-3 animate-slide-in-right">
          <button
            onClick={onToggleTheme}
            className="group relative p-3 rounded-2xl glass dark:glass-dark hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 dark:from-yellow-400/10 dark:to-orange-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {isDark ? (
              <Sun className="relative w-5 h-5 text-yellow-400 group-hover:rotate-12 transition-transform duration-300" />
            ) : (
              <Moon className="relative w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:rotate-12 transition-transform duration-300" />
            )}
          </button>
          <button
            onClick={onEnterApp}
            className="group relative px-6 py-3 glass dark:glass-dark rounded-full text-sm font-semibold text-slate-700 dark:text-slate-200 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus-modern overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative">Enter App</span>
          </button>
        </div>
      </div>
    </header>
  );
}