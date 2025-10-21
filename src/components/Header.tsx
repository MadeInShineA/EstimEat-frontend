import { MapPin } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-3">
          <MapPin className="w-8 h-8 text-emerald-600" />
          <h1 className="text-2xl font-bold text-gray-900">EstimEat</h1>
        </div>
      </div>
    </header>
  );
}
