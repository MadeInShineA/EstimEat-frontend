import { memo } from 'react';

export const Legend = memo(function Legend() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-center md:gap-6">
      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap">Score Range:</span>
      
      {/* Legend items */}
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2">
        <div className="flex items-center gap-2 flex-shrink-0 group cursor-pointer">
          <div className="w-6 h-3 md:w-8 md:h-4 rounded shadow-sm group-hover:scale-110 transition-transform duration-200" style={{ backgroundColor: 'rgb(30, 58, 138)' }}></div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">Very Low</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 group cursor-pointer">
          <div className="w-6 h-3 md:w-8 md:h-4 rounded shadow-sm group-hover:scale-110 transition-transform duration-200" style={{ backgroundColor: 'rgb(59, 130, 246)' }}></div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">Low</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 group cursor-pointer">
          <div className="w-6 h-3 md:w-8 md:h-4 rounded shadow-sm group-hover:scale-110 transition-transform duration-200" style={{ backgroundColor: 'rgb(6, 182, 212)' }}></div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">Medium Low</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 group cursor-pointer">
          <div className="w-6 h-3 md:w-8 md:h-4 rounded shadow-sm group-hover:scale-110 transition-transform duration-200" style={{ backgroundColor: 'rgb(34, 197, 94)' }}></div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">Medium High</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 group cursor-pointer">
          <div className="w-6 h-3 md:w-8 md:h-4 rounded shadow-sm group-hover:scale-110 transition-transform duration-200" style={{ backgroundColor: 'rgb(251, 191, 36)' }}></div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">High</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 group cursor-pointer">
          <div className="w-6 h-3 md:w-8 md:h-4 rounded shadow-sm group-hover:scale-110 transition-transform duration-200" style={{ backgroundColor: 'rgb(249, 115, 22)' }}></div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">Very High</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 group cursor-pointer">
          <div className="w-6 h-3 md:w-8 md:h-4 rounded shadow-sm group-hover:scale-110 transition-transform duration-200" style={{ backgroundColor: 'rgb(239, 68, 68)' }}></div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">Extreme</span>
        </div>
      </div>

      {/* Separator */}
      <div className="hidden md:block h-8 w-px bg-gray-200 dark:bg-gray-600"></div>

      {/* Gradient bar */}
      <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Continuous:</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 dark:text-gray-500">Low</span>
          <div className="w-20 md:w-24 lg:w-32 h-3 rounded-full shadow-inner" style={{ 
            background: 'linear-gradient(to right, rgb(30, 58, 138), rgb(59, 130, 246), rgb(6, 182, 212), rgb(34, 197, 94), rgb(251, 191, 36), rgb(249, 115, 22), rgb(239, 68, 68))'
          }}></div>
            <span className="text-xs text-gray-400 dark:text-gray-500">High</span>
        </div>
      </div>
    </div>
  );
});