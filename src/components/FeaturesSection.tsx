import { TrendingUp, BarChart3, MapPin } from 'lucide-react';

interface FeaturesSectionProps {
  isVisible: boolean;
}

export function FeaturesSection({ isVisible }: FeaturesSectionProps) {
  return (
    <section className="max-w-6xl mx-auto mt-24">
      <div className={`grid md:grid-cols-3 gap-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
        <div className="group relative glass dark:glass-dark rounded-3xl p-8 shadow-2xl border border-white/30 dark:border-gray-600/30 hover:shadow-3xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-2 hover:rotate-1 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 via-cyan-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">Population Trends</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">Track and analyze population growth patterns across Swiss communes with precision and accuracy.</p>
          </div>
        </div>

        <div className="group relative glass dark:glass-dark rounded-3xl p-8 shadow-2xl border border-white/30 dark:border-gray-600/30 hover:shadow-3xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 hover:-rotate-1 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 via-purple-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Data Visualization</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">Interactive heatmaps and charts provide clear insights into demographic changes and trends.</p>
          </div>
        </div>

        <div className="group relative glass dark:glass-dark rounded-3xl p-8 shadow-2xl border border-white/30 dark:border-gray-600/30 hover:shadow-3xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2 hover:rotate-1 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">Geographic Analysis</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">Comprehensive mapping of Swiss territories with detailed commune-level data and boundaries.</p>
          </div>
        </div>
      </div>
    </section>
  );
}