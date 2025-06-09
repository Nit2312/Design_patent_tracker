import React from 'react';

interface SearchFilters {
  applicant?: string;
  class?: string;
  status?: string;
  dateRange?: {
    from: string;
    to: string;
  };
  country?: string;
}

interface SearchFiltersProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onChange }) => {
  const updateFilter = (key: keyof SearchFilters, value: any) => {
    onChange({ ...filters, [key]: value });
  };

  const updateDateRange = (field: 'from' | 'to', value: string) => {
    const dateRange = filters.dateRange || { from: '', to: '' };
    onChange({
      ...filters,
      dateRange: { ...dateRange, [field]: value }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Applicant
        </label>
        <input
          type="text"
          placeholder="Company name"
          value={filters.applicant || ''}
          onChange={(e) => updateFilter('applicant', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Class
        </label>
        <select
          value={filters.class || ''}
          onChange={(e) => updateFilter('class', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">All Classes</option>
          <option value="D14-138">D14-138 (Electronics)</option>
          <option value="D06-301">D06-301 (Furniture)</option>
          <option value="D14-179">D14-179 (Audio Equipment)</option>
          <option value="D12-108">D12-108 (Transportation)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          value={filters.status || ''}
          onChange={(e) => updateFilter('status', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">All Status</option>
          <option value="granted">Granted</option>
          <option value="pending">Pending</option>
          <option value="abandoned">Abandoned</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filing Date From
        </label>
        <input
          type="date"
          value={filters.dateRange?.from || ''}
          onChange={(e) => updateDateRange('from', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filing Date To
        </label>
        <input
          type="date"
          value={filters.dateRange?.to || ''}
          onChange={(e) => updateDateRange('to', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Country
        </label>
        <select
          value={filters.country || ''}
          onChange={(e) => updateFilter('country', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">All Countries</option>
          <option value="US">United States</option>
          <option value="EP">European Union</option>
          <option value="JP">Japan</option>
          <option value="CN">China</option>
          <option value="KR">South Korea</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilters;