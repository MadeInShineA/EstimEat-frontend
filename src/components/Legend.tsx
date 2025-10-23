import { memo } from 'react';

export const Legend = memo(function Legend() {
  return (
    <div className="flex items-center justify-center gap-6">
      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap">Score Range:</span>
      
      {/* Compact horizontal legend items */}
      <div className="flex items-center gap-4 overflow-x-auto pb-1">
        <div className="flex items-center gap-2 flex-shrink-0 group cursor-pointer">
          <div className="w-8 h-4 rounded shadow-sm group-hover:scale-110 transition-transform duration-200" style={{ backgroundColor: 'rgb(30, 58, 138)' }}></div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">Very Low</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 group cursor-pointer">
          <div className="w-8 h-4 rounded shadow-sm group-hover:scale-110 transition-transform duration-200" style={{ backgroundColor: 'rgb(59, 130, 246)' }}></div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">Low</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 group cursor-pointer">
          <div className="w-8 h-4 rounded shadow-sm group-hover:scale-110 transition-transform duration-200" style={{ backgroundColor: 'rgb(6, 182, 212)' }}></div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">Medium Low</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 group cursor-pointer">
          <div className="w-8 h-4 rounded shadow-sm group-hover:scale-110 transition-transform duration-200" style={{ backgroundColor: 'rgb(34, 197, 94)' }}></div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">Medium High</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 group cursor-pointer">
          <div className="w-8 h-4 rounded shadow-sm group-hover:scale-110 transition-transform duration-200" style={{ backgroundColor: 'rgb(251, 191, 36)' }}></div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">High</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 group cursor-pointer">
          <div className="w-8 h-4 rounded shadow-sm group-hover:scale-110 transition-transform duration-200" style={{ backgroundColor: 'rgb(249, 115, 22)' }}></div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">Very High</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 group cursor-pointer">
          <div className="w-8 h-4 rounded shadow-sm group-hover:scale-110 transition-transform duration-200" style={{ backgroundColor: 'rgb(239, 68, 68)' }}></div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">Extreme</span>
        </div>
      </div>

      {/* Separator */}
      <div className="h-8 w-px bg-gray-200"></div>

      {/* Gradient bar */}
      <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Continuous:</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 dark:text-gray-500">Low</span>
          <div className="w-32 h-3 rounded-full shadow-inner" style={{ 
            background: 'linear-gradient(to right, rgb(30, 58, 138), rgb(59, 130, 246), rgb(6, 182, 212), rgb(34, 197, 94), rgb(251, 191, 36), rgb(249, 115, 22), rgb(239, 68, 68))'
          }}></div>
            <span className="text-xs text-gray-400 dark:text-gray-500">High</span>
        </div>
      </div>
    </div>
  );
});