import { memo } from 'react';
import { Search } from 'lucide-react';
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
      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
        <Search className="h-5 w-5 text-slate-400 dark:text-slate-500" strokeWidth={2} />
      </div>
      <select
        onChange={handleChange}
        className="block w-full pl-14 pr-12 py-4 glass dark:glass-dark rounded-2xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-slate-900 dark:text-slate-100 text-base shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer appearance-none focus-modern"
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
      <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
        <svg className="w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
});
