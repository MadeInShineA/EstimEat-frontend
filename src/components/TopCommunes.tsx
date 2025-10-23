import { memo, useMemo } from 'react';
import { Trophy, Award, Medal } from 'lucide-react';
import { Commune } from '../lib/supabase';
import { getCantonName } from './helper';

interface TopCommunesProps {
  communes: Commune[];
  topN?: number;
  communesByName: Record<string, any>;
}

export const TopCommunes = memo(function TopCommunes({ communes, topN = 5, communesByName }: TopCommunesProps) {
  const sorted = useMemo(() =>
    [...communes].sort((a, b) => b.score - a.score).slice(0, topN),
    [communes, topN]
  );

  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-4 h-4 text-yellow-500" strokeWidth={2} />;
      case 1:
        return <Award className="w-4 h-4 text-gray-400" strokeWidth={2} />;
      case 2:
        return <Medal className="w-4 h-4 text-orange-600" strokeWidth={2} />;
      default:
        return <div className="w-5 h-5 flex items-center justify-center text-xs font-semibold text-gray-400">{index + 1}</div>;
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-4 overflow-x-auto pb-1">
        {sorted.map((c, idx) => (
          <div
            key={c.id}
            className="group flex items-center gap-3 px-4 py-2 glass dark:glass-dark rounded-2xl border border-white/30 dark:border-gray-600/30 shadow-lg hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1 whitespace-nowrap flex-shrink-0"
          >
            <div className="flex-shrink-0">
              {getIcon(idx)}
            </div>
            <div className="flex items-center gap-2">
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">{c.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors duration-300">
                  {getCantonName(communesByName[c.name.trim().toLowerCase()]?.geo?.properties?.KANTONSNUM)}
                </p>
              </div>
              <div className="ml-3 pl-3 border-l border-white/30 dark:border-gray-600/50">
                <span className="text-lg font-bold text-emerald-600 tabular-nums">{c.score.toFixed(1)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
