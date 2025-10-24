import { Github, Heart } from 'lucide-react';

export function LandingPageFooter() {
  return (
    <footer className="border-t border-white/20 dark:border-gray-600/20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <div>
              <p className="text-slate-600 dark:text-slate-300 font-medium">
                EstimEat - Swiss Commune Analytics
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Built with modern web technologies
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/MadeInShineA/EstimEat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">View Source</span>
            </a>

            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for Switzerland</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © 2025 EstimEat. Data sourced from official Swiss federal statistics.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
