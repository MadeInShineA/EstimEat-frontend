import { Database, Shield, Cpu, Globe } from 'lucide-react';

interface AdvancedFeaturesSectionProps {
  isVisible: boolean;
}

export function AdvancedFeaturesSection({ isVisible }: AdvancedFeaturesSectionProps) {
  const advancedFeatures = [
    {
      icon: Database,
      title: 'Comprehensive Database',
      description: 'Access to extensive Swiss commune datasets including population, geography, and economic indicators from multiple reliable sources.'
    },
    {
      icon: Shield,
      title: 'Data Security',
      description: 'Enterprise-grade security with encrypted data transmission and secure API endpoints protecting your analytics sessions.'
    },
    {
      icon: Cpu,
      title: 'Advanced Algorithms',
      description: 'Powered by sophisticated algorithms for trend analysis, predictive modeling, and statistical computations.'
    },
    {
      icon: Globe,
      title: 'Global Standards',
      description: 'Built following international data visualization standards and Swiss federal data compliance requirements.'
    }
  ];

  return (
    <section className="py-24 px-8 sm:px-12 lg:px-16 bg-gradient-to-r from-slate-50/50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl sm:text-5xl font-black mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent">
            Advanced Capabilities
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Professional-grade tools and infrastructure for serious data analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {advancedFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className={`group p-6 md:p-8 glass dark:glass-dark rounded-3xl hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-2xl border border-white/20 dark:border-gray-600/20 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${(index + 4) * 100}ms` }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}