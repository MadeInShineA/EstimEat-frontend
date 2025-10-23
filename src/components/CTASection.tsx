import { ArrowRight, Sparkles } from 'lucide-react';

interface CTASectionProps {
  isVisible: boolean;
  onEnterApp: () => void;
}

export function CTASection({ isVisible, onEnterApp }: CTASectionProps) {
  return (
    <section className="py-24 px-8 sm:px-12 lg:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100/80 to-cyan-100/80 dark:from-emerald-900/30 dark:to-cyan-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium mb-8 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/50">
            <Sparkles className="w-4 h-4" />
            Ready to Explore?
          </div>

          <h2 className="text-4xl sm:text-5xl font-black mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent">
            Start Your Analytics Journey
          </h2>

          <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
            Join thousands of analysts, researchers, and decision-makers who trust EstimEat for their Swiss commune data needs.
          </p>

          <button
            onClick={onEnterApp}
            className="group relative px-8 py-4 md:px-12 md:py-6 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:from-emerald-600 hover:via-cyan-600 hover:to-blue-600 text-white font-bold text-xl rounded-3xl shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center gap-3">
              Launch Analytics Platform
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-6">
            No registration required • Free to use • Open source
          </p>
        </div>
      </div>
    </section>
  );
}