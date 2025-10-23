import { memo } from 'react';
import { Search } from 'lucide-react';
import { Commune } from '../lib/supabase';
import { getCantonName } from './helper';

interface SearchBarProps {
  rawCommunes: Commune[];
  communesByName: Record<string, any>;
  onSelect: (commune: Commune) => void;
  isDark?: boolean;
}

export const SearchBar = memo(function SearchBar({ rawCommunes, communesByName, onSelect, isDark = false }: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = rawCommunes.find(c => c.id === parseInt(e.target.value));
    if (selected) {
      onSelect(selected);
    }
  };

  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
        <Search className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
      </div>
      <select
        onChange={handleChange}
        className={`block w-full rounded-lg pl-10 pr-4 py-2.5 text-sm shadow-sm transition-all appearance-none cursor-pointer ${
          isDark
            ? 'bg-gray-700 border-gray-600 text-white hover:border-gray-500 focus:border-emerald-500'
            : 'bg-white border-gray-300 text-gray-900 hover:border-gray-400 focus:border-emerald-500'
        } focus:ring-2 focus:ring-emerald-500/20`}
        defaultValue=""
      >
        <option value="" disabled className={isDark ? 'text-gray-400' : 'text-gray-500'}>
          🔍 Search for a commune...
        </option>
        {rawCommunes
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((commune) => (
            <option key={commune.id} value={commune.id} className="py-2">
              {commune.name} · {getCantonName(communesByName[commune.name.trim().toLowerCase()]?.geo?.properties?.KANTONSNUM)}
            </option>
          ))}
      </select>
    </div>
  );
});