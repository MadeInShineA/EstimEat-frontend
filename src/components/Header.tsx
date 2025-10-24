import { MapPin, ArrowLeft, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  showBackButton?: boolean;
  onBackClick?: () => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export function Header({ showBackButton = false, onBackClick, isDark = false, onToggleTheme }: HeaderProps) {
  return (
    <header className="glass dark:glass-dark border-b border-white/20 dark:border-gray-600/20 shadow-2xl">
      <div className="max-w-[1800px] mx-auto px-8 sm:px-12 lg:px-16 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {showBackButton && (
              <button
                onClick={onBackClick}
                className="group p-3 rounded-2xl glass dark:glass-dark hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200" />
              </button>
            )}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/25 dark:shadow-emerald-500/10">
                  <MapPin className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl blur opacity-30"></div>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                  EstimEat
                </h1>
                <p className="text-base text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  Swiss Commune Analytics
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
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
          </div>
        </div>
      </div>
    </header>
  );
}
