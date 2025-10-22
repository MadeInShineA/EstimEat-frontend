import { Search } from 'lucide-react';
import { Commune } from '../lib/supabase';
import { getCantonName } from './helper';

interface SearchBarProps {
  rawCommunes: Commune[];
  communesByName: Record<string, any>;
  onSelect: (commune: Commune) => void;
}

export function SearchBar({ rawCommunes, communesByName, onSelect }: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = rawCommunes.find(c => c.id === parseInt(e.target.value));
    if (selected) {
      onSelect(selected);
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
        <Search className="h-5 w-5 text-gray-400" strokeWidth={2} />
      </div>
      <select
        onChange={handleChange}
        className="block w-full pl-14 pr-12 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 bg-white text-gray-900 text-base shadow-sm hover:border-gray-400 transition-all duration-200 cursor-pointer appearance-none"
        defaultValue=""
      >
        <option value="" disabled className="text-gray-500">
          Search for a commune
        </option>
        {rawCommunes.map((commune) => (
          <option key={commune.id} value={commune.id} className="py-3">
            {commune.name} · {getCantonName(communesByName[commune.name.trim().toLowerCase()]?.geo?.properties?.KANTONSNUM)}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
