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
        className={`block w-full glass dark:glass-dark rounded-xl border border-white/30 dark:border-gray-600/30 pl-10 pr-3 py-2 text-sm shadow-lg hover:shadow-xl transition-all duration-300 focus-modern appearance-none cursor-pointer text-slate-900 dark:text-slate-100`}
        defaultValue=""
      >
        <option value="" disabled className="text-slate-900 dark:text-slate-100 bg-white dark:bg-gray-800">
          Search for a commune...
        </option>
        {rawCommunes
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((commune) => (
            <option key={commune.id} value={commune.id} className="text-slate-900 dark:text-slate-100 bg-white dark:bg-gray-800 py-2">
              {commune.name} · {getCantonName(communesByName[commune.name.trim().toLowerCase()]?.geo?.properties?.KANTONSNUM)}
            </option>
          ))}
      </select>
    </div>
  );
});
