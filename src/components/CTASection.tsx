import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  isVisible: boolean;
  onEnterApp: () => void;
}

export function CTASection({ isVisible, onEnterApp }: CTASectionProps) {
  return (
    <section className="max-w-4xl mx-auto mt-24 text-center">
      <div className={`transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Ready to Explore Swiss Demographics?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of researchers, policymakers, and businesses using EstimEat
          to make data-driven decisions about Switzerland's future.
        </p>
        <button
          onClick={onEnterApp}
          className="group relative inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 text-white font-bold rounded-2xl shadow-2xl shadow-emerald-500/25 dark:shadow-emerald-500/10 hover:shadow-3xl hover:shadow-emerald-500/40 transform hover:scale-105 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative text-lg">Start Exploring</span>
          <ArrowRight className="relative w-6 h-6 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 to-blue-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
        </button>
      </div>
    </section>
  );
}