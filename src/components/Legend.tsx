export function Legend() {
  return (
    <div className="flex items-center gap-6">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">Score Range:</span>
      
      {/* Compact horizontal legend items */}
      <div className="flex items-center gap-4 overflow-x-auto pb-1">
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-4 rounded shadow-sm" style={{ backgroundColor: 'rgb(30, 58, 138)' }}></div>
          <span className="text-xs font-medium text-gray-700">Very Low</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-4 rounded shadow-sm" style={{ backgroundColor: 'rgb(59, 130, 246)' }}></div>
          <span className="text-xs font-medium text-gray-700">Low</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-4 rounded shadow-sm" style={{ backgroundColor: 'rgb(6, 182, 212)' }}></div>
          <span className="text-xs font-medium text-gray-700">Medium Low</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-4 rounded shadow-sm" style={{ backgroundColor: 'rgb(34, 197, 94)' }}></div>
          <span className="text-xs font-medium text-gray-700">Medium High</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-4 rounded shadow-sm" style={{ backgroundColor: 'rgb(251, 191, 36)' }}></div>
          <span className="text-xs font-medium text-gray-700">High</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-4 rounded shadow-sm" style={{ backgroundColor: 'rgb(249, 115, 22)' }}></div>
          <span className="text-xs font-medium text-gray-700">Very High</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-4 rounded shadow-sm" style={{ backgroundColor: 'rgb(239, 68, 68)' }}></div>
          <span className="text-xs font-medium text-gray-700">Extreme</span>
        </div>
      </div>

      {/* Separator */}
      <div className="h-8 w-px bg-gray-200"></div>

      {/* Gradient bar */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="text-xs font-medium text-gray-500">Continuous:</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Low</span>
          <div className="w-32 h-3 rounded-full shadow-inner" style={{ 
            background: 'linear-gradient(to right, rgb(30, 58, 138), rgb(59, 130, 246), rgb(6, 182, 212), rgb(34, 197, 94), rgb(251, 191, 36), rgb(249, 115, 22), rgb(239, 68, 68))'
          }}></div>
          <span className="text-xs text-gray-400">High</span>
        </div>
      </div>
    </div>
  );
}