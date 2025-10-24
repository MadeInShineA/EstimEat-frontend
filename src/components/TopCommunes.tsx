import { memo, useMemo, useState } from 'react';
import { Trophy, Award, Medal, ChevronLeft, ChevronRight } from 'lucide-react';
import { Commune } from '../lib/supabase';
import { getCantonName } from './helper';

interface TopCommunesProps {
  communes: Commune[];
  topN?: number;
  communesByName: Record<string, any>;
  isDark?: boolean;
  scoreType?: string;
  onSelect?: (commune: Commune) => void;
}

export const TopCommunes = memo(function TopCommunes({
  communes,
  topN = 3,
  communesByName,
  isDark = false,
  scoreType = 'total',
  onSelect
}: TopCommunesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const sorted = useMemo(() => 
    [...communes].sort((a, b) => (b.score) - (a.score)).slice(0, topN),
    [communes, topN]
  );

  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-500" strokeWidth={2.5} />;
      case 1:
        return <Award className="w-5 h-5 text-gray-400" strokeWidth={2.5} />;
      case 2:
        return <Medal className="w-5 h-5 text-orange-600" strokeWidth={2.5} />;
      default:
        return null;
    }
  };

  const getRankStyle = (index: number) => {
    switch (index) {
      case 0:
        return {
          ring: 'ring-2 ring-yellow-500/40',
          badge: 'bg-yellow-500 text-white',
          hover: 'hover:ring-yellow-500/60'
        };
      case 1:
        return {
          ring: 'ring-2 ring-gray-400/40',
          badge: 'bg-gray-400 text-white',
          hover: 'hover:ring-gray-400/60'
        };
      case 2:
        return {
          ring: 'ring-2 ring-orange-600/40',
          badge: 'bg-orange-600 text-white',
          hover: 'hover:ring-orange-600/60'
        };
      default:
        return { ring: '', badge: '', hover: '' };
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % sorted.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + sorted.length) % sorted.length);
  };

  return (
    <div className="w-full">
      {/* Mobile: Carrousel (< 640px) */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-semibold uppercase tracking-wide ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            🏆 Top {topN}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={prevSlide}
              className={`p-1.5 rounded-lg transition-colors ${
                isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
              aria-label="Previous"
            >
              <ChevronLeft className={`w-4 h-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>
            <span className={`text-xs min-w-[3rem] text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {currentIndex + 1} / {sorted.length}
            </span>
            <button
              onClick={nextSlide}
              className={`p-1.5 rounded-lg transition-colors ${
                isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
              aria-label="Next"
            >
              <ChevronRight className={`w-4 h-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>
          </div>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {sorted.map((c, idx) => {
              const style = getRankStyle(idx);
              return (
                <div key={c.id} className="w-full flex-shrink-0 px-1">
                  <div
                    className={`flex items-center gap-3 p-3 rounded-xl shadow-lg transition-all cursor-pointer ${
                      isDark
                        ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-800'
                        : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:bg-gradient-to-br hover:from-gray-50 hover:to-white'
                    } ${style.ring} ${style.hover}`}
                    onClick={() => onSelect?.(c)}
                  >
                    <div className="flex-shrink-0">{getIcon(idx)}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-bold text-sm truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {c.name}
                      </h4>
                      <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {getCantonName(communesByName[c.name.trim().toLowerCase()]?.geo?.properties?.KANTONSNUM)}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <div className="text-xl font-bold text-emerald-600 tabular-nums">
                        {(c.score).toFixed(1)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-1.5 mt-2">
          {sorted.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentIndex 
                  ? 'w-6 bg-emerald-600' 
                  : isDark 
                    ? 'w-1.5 bg-gray-600 hover:bg-gray-500'
                    : 'w-1.5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Tablet & Desktop: Horizontal compact cards (>= 640px) */}
      <div className="hidden sm:block">
        <div className="flex items-center gap-3 mb-2">
          <span className={`text-xs font-semibold uppercase tracking-wide whitespace-nowrap ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            🏆 Top {topN}
          </span>
          <div className={`h-px flex-1 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        </div>
        
        {/* Horizontal compact layout */}
        <div className="flex gap-2">
          {sorted.map((c, idx) => {
            const style = getRankStyle(idx);
            return (
              <div
                key={c.id}
                className={`flex-1 relative flex items-center gap-2 p-2.5 rounded-lg shadow-sm transition-all group cursor-pointer ${
                  isDark
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-emerald-600 hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-800'
                    : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-emerald-300 hover:bg-gradient-to-br hover:from-gray-50 hover:to-white'
                } ${style.ring} ${style.hover}`}
                onClick={() => onSelect?.(c)}
              >
                {/* Badge rank */}
                <div className={`absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md ${style.badge}`}>
                  {idx + 1}
                </div>
                
                {/* Icon */}
                <div className="flex-shrink-0 ml-1">
                  {getIcon(idx)}
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className={`font-semibold text-xs truncate transition-colors ${
                    isDark
                      ? 'text-white group-hover:text-emerald-400'
                      : 'text-gray-900 group-hover:text-emerald-600'
                  }`}>
                    {c.name}
                  </h4>
                  <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {getCantonName(communesByName[c.name.trim().toLowerCase()]?.geo?.properties?.KANTONSNUM)}
                  </p>
                </div>
                
                {/* Score */}
                <div className="flex-shrink-0 text-right">
                  <div className="text-lg font-bold text-emerald-600 tabular-nums leading-none">
                    {(c.score).toFixed(1)}
                  </div>
                  <div className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {scoreType === 'total' ? 'total' : scoreType.slice(0, 8)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
