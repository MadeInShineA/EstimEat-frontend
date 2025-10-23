import { useState, useEffect } from 'react';
import { LandingPageHeader } from './LandingPageHeader';
import { HeroSection } from './HeroSection';
import { StatsSection } from './StatsSection';
import { FeaturesSection } from './FeaturesSection';
import { AdvancedFeaturesSection } from './AdvancedFeaturesSection';
import { CTASection } from './CTASection';
import { LandingPageFooter } from './LandingPageFooter';

interface LandingPageProps {
  onEnterApp: () => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export function LandingPage({ onEnterApp, isDark = false, onToggleTheme }: LandingPageProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/80 via-indigo-50/60 to-purple-50/40 dark:from-slate-950 dark:via-slate-900/90 dark:via-slate-800/70 dark:to-slate-900 overflow-hidden transition-colors duration-500 relative">
      {/* Additional layered gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 dark:from-transparent dark:via-slate-900/5 dark:to-slate-800/10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/20 via-transparent to-purple-50/20 dark:from-emerald-950/10 dark:via-transparent dark:to-purple-950/10"></div>

      {/* Smooth animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary gradient orbs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-emerald-200/25 to-cyan-200/20 dark:from-emerald-800/15 dark:to-cyan-800/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-indigo-200/25 to-purple-200/20 dark:from-indigo-800/15 dark:to-purple-800/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>

        {/* Subtle floating elements */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-emerald-300/40 dark:bg-emerald-600/30 rounded-full animate-float animation-delay-1000"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-purple-300/40 dark:bg-purple-600/30 rounded-full animate-float animation-delay-3000"></div>

        {/* Minimal grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(16,185,129,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </div>

      <div className="relative z-10">
        <LandingPageHeader isDark={isDark} onToggleTheme={onToggleTheme!} onEnterApp={onEnterApp} />

        <main>
          <HeroSection isVisible={isVisible} onEnterApp={onEnterApp} />
          <StatsSection isVisible={isVisible} />
          <FeaturesSection isVisible={isVisible} />
          <AdvancedFeaturesSection isVisible={isVisible} />
          <CTASection isVisible={isVisible} onEnterApp={onEnterApp} />
        </main>

        <LandingPageFooter />
      </div>
    </div>
  );
}