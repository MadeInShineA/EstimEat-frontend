interface StatsSectionProps {
  isVisible: boolean;
}

export function StatsSection({ isVisible }: StatsSectionProps) {
  return (
    <section className="max-w-6xl mx-auto mt-24">
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">2,200+</div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Swiss Communes</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">15+</div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Data Versions</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">99.9%</div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Data Accuracy</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-2">24/7</div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Real-time Updates</p>
        </div>
      </div>
    </section>
  );
}