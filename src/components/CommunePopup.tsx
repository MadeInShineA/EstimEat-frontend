import { Commune } from '../lib/supabase';

interface CommunePopupProps {
  commune: Commune;
}

export function CommunePopup({ commune }: CommunePopupProps) {
  return (
    <div className="min-w-[250px]">
      <h3 className="font-bold text-lg text-gray-900 mb-1">{commune.nom}</h3>
      <p className="text-sm text-gray-600 mb-2">Canton: {commune.canton}</p>
      <div className="mb-3">
        <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-800 text-sm font-semibold rounded">
          Score: {commune.score.toFixed(2)}
        </span>
      </div>
      {commune.features && commune.features.length > 0 && (
        <div className="mb-3">
          <h4 className="text-sm font-semibold text-gray-700 mb-1">Features:</h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {commune.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
      {commune.extra_info && (
        <p className="text-xs text-gray-500 border-t border-gray-200 pt-2 mt-2">
          {commune.extra_info}
        </p>
      )}
    </div>
  );
}
