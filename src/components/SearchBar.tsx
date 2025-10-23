import { memo } from 'react';
import { Commune } from '../lib/supabase';
import { getCantonName } from './helper';

interface SearchBarProps {
  rawCommunes: Commune[];
  communesByName: Record<string, any>;
  onSelect: (commune: Commune) => void;
}

export const SearchBar = memo(function SearchBar({ rawCommunes, communesByName, onSelect }: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = rawCommunes.find(c => c.id === parseInt(e.target.value));
    if (selected) {
      onSelect(selected);
    }
  };

  return (
    <div className="relative">
      <select
        onChange={handleChange}
        className="block w-full md:w-auto glass dark:glass-dark rounded-xl border border-white/30 dark:border-gray-600/30 py-2 px-3 text-sm shadow-lg hover:shadow-xl transition-all duration-300 focus-modern text-slate-900 dark:text-slate-100"
        defaultValue=""
      >
        <option value="" disabled className="text-slate-500 dark:text-slate-400 bg-white dark:bg-gray-800">
          Search for a commune
        </option>
        {rawCommunes.map((commune) => (
          <option key={commune.id} value={commune.id} className="py-3 text-slate-900 dark:text-slate-100 bg-white dark:bg-gray-800">
            {commune.name} · {getCantonName(communesByName[commune.name.trim().toLowerCase()]?.geo?.properties?.KANTONSNUM)}
          </option>
        ))}
      </select>

    </div>
  );
});
