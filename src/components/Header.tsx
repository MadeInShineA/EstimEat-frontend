import { MapPin } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-[1800px] mx-auto px-8 sm:px-12 lg:px-16 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center shadow-sm">
              <MapPin className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
                EstimEat
              </h1>
              <p className="text-base text-gray-500 mt-1">
                Swiss Commune Analytics
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
