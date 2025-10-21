import { Search } from 'lucide-react';
import { Commune } from '../lib/supabase';

interface SearchBarProps {
  communes: Commune[];
  onSelect: (commune: Commune) => void;
}

export function SearchBar({ communes, onSelect }: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = communes.find(c => c.id === parseInt(e.target.value));
    if (selected) {
      onSelect(selected);
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <select
        onChange={handleChange}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900"
        defaultValue=""
      >
        <option value="" disabled>
          Search for a commune...
        </option>
        {communes.map((commune) => (
          <option key={commune.id} value={commune.id}>
            {commune.nom} ({commune.canton})
          </option>
        ))}
      </select>
    </div>
  );
}
