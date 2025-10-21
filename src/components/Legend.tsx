export function Legend() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Heat Intensity</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-4 rounded" style={{ backgroundColor: 'rgba(0, 0, 255, 0.6)' }}></div>
          <span className="text-xs text-gray-600">Low Score</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-4 rounded" style={{ backgroundColor: 'rgba(0, 255, 0, 0.6)' }}></div>
          <span className="text-xs text-gray-600">Medium Score</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-4 rounded" style={{ backgroundColor: 'rgba(255, 255, 0, 0.6)' }}></div>
          <span className="text-xs text-gray-600">High Score</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-4 rounded" style={{ backgroundColor: 'rgba(255, 0, 0, 0.6)' }}></div>
          <span className="text-xs text-gray-600">Very High Score</span>
        </div>
      </div>
    </div>
  );
}
