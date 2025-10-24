import { MapPin, Users, Building, Briefcase, Factory, Utensils } from 'lucide-react';

interface FeaturesSectionProps {
  isVisible: boolean;
}

export function FeaturesSection({ isVisible }: FeaturesSectionProps) {
  const features = [
    {
      icon: MapPin,
      title: 'Interactive Map',
      description: 'Explore Swiss communes with our interactive heatmaps and detailed geographic data visualization.'
    },
    {
      icon: Users,
      title: 'Demography per City',
      description: 'Detailed demographic data and population statistics for each Swiss commune.'
    },
    {
      icon: Building,
      title: 'New Buildings',
      description: 'Track construction trends and new building developments across communes.'
    },
    {
      icon: Briefcase,
      title: 'Third Sector Jobs',
      description: 'Detailed data on jobs in the third sector across Swiss communes.'
    },
    {
      icon: Factory,
      title: 'Third Sector Establishments',
      description: 'Information on establishments in the third sector for economic analysis.'
    },
    {
      icon: Utensils,
      title: 'Restaurants Growth',
      description: 'Monitor the growth in number of restaurants and dining establishments over time.'
    }
  ];

  return (
    <section className="py-24 px-8 sm:px-12 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl sm:text-5xl font-black mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Everything you need to analyze and understand Swiss commune data at your fingertips.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group p-6 md:p-8 glass dark:glass-dark rounded-3xl hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-2xl border border-white/20 dark:border-gray-600/20 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
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