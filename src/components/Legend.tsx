import { memo, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface LegendProps {
  isDark?: boolean;
}

export const Legend = memo(function Legend({ isDark = false }: LegendProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const legendItems = [
    { color: 'rgb(30, 58, 138)', label: 'Very Low', range: '0-20%' },
    { color: 'rgb(59, 130, 246)', label: 'Low', range: '20-40%' },
    { color: 'rgb(6, 182, 212)', label: 'Medium Low', range: '40-60%' },
    { color: 'rgb(34, 197, 94)', label: 'Medium High', range: '60-75%' },
    { color: 'rgb(251, 191, 36)', label: 'High', range: '75-90%' },
    { color: 'rgb(249, 115, 22)', label: 'Very High', range: '90-95%' },
    { color: 'rgb(239, 68, 68)', label: 'Extreme', range: '95-100%' },
  ];

  return (
    <div className="w-full">
      {/* Mobile: Collapsible */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center justify-between w-full py-2 px-3 rounded-lg transition-colors ${
            isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
          }`}
        >
          <span className={`text-xs font-semibold uppercase tracking-wide ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Score Legend
          </span>
          {isExpanded ? (
            <ChevronUp className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          ) : (
            <ChevronDown className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          )}
        </button>
        
        {isExpanded && (
          <div className="mt-3 space-y-2 pb-2">
            {legendItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 px-2">
                <div 
                  className="w-8 h-4 rounded shadow-sm flex-shrink-0" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.label}</span>
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.range}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Gradient bar */}
            <div className="mt-4 px-2">
              <p className={`text-xs mb-2 font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Continuous Scale</p>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Low</span>
                <div 
                  className="flex-1 h-3 rounded-full shadow-inner" 
                  style={{ 
                    background: 'linear-gradient(to right, rgb(30, 58, 138), rgb(59, 130, 246), rgb(6, 182, 212), rgb(34, 197, 94), rgb(251, 191, 36), rgb(249, 115, 22), rgb(239, 68, 68))'
                  }}
                ></div>
                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>High</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop: Full horizontal layout */}
      <div className="hidden lg:flex lg:items-center lg:gap-6">
        <span className={`text-xs font-semibold uppercase tracking-wide whitespace-nowrap ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Score Range:
        </span>
        
        {/* Legend items */}
        <div className="flex items-center gap-4 flex-wrap">
          {legendItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 group cursor-default">
              <div 
                className="w-8 h-4 rounded shadow-sm group-hover:scale-110 transition-transform" 
                style={{ backgroundColor: item.color }}
              ></div>
              <div>
                <span className={`text-xs font-medium ${isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>
                  {item.label}
                </span>
                <span className={`text-xs ml-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>({item.range})</span>
              </div>
            </div>
          ))}
        </div>

        {/* Separator */}
        <div className={`h-8 w-px ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>

        {/* Gradient bar */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className={`text-xs font-medium whitespace-nowrap ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Continuous:</span>
          <div className="flex items-center gap-2">
            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Low</span>
            <div 
              className="w-32 h-3 rounded-full shadow-inner" 
              style={{ 
                background: 'linear-gradient(to right, rgb(30, 58, 138), rgb(59, 130, 246), rgb(6, 182, 212), rgb(34, 197, 94), rgb(251, 191, 36), rgb(249, 115, 22), rgb(239, 68, 68))'
              }}
            ></div>
            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>High</span>
          </div>
        </div>
      </div>
    </div>
  );
});