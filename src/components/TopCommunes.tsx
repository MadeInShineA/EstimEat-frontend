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
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">Top {topN}:</span>
      <div className="flex items-center gap-4 overflow-x-auto pb-1">
        {sorted.map((c, idx) => (
          <div
            key={c.id}
            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow whitespace-nowrap flex-shrink-0"
          >
            <div className="flex-shrink-0">
              {getIcon(idx)}
            </div>
            <div className="flex items-center gap-2">
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">{c.name}</h4>
                <p className="text-xs text-gray-500">
                  {getCantonName(communesByName[c.name.trim().toLowerCase()]?.geo?.properties?.KANTONSNUM)}
                </p>
              </div>
              <div className="ml-2 pl-2 border-l border-gray-200">
                <span className="text-lg font-bold text-emerald-600 tabular-nums">{c.score.toFixed(1)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});