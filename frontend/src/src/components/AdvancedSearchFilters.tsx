import React from 'react';
import { RotateCcw } from 'lucide-react';

interface SearchFilters {
  applicant?: string;
  class?: string;
  status?: string;
  dateRange?: {
    from: string;
    to: string;
  };
  country?: string;
  inventor?: string;
  patentNumber?: string;
}

interface AdvancedSearchFiltersProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
  onReset: () => void;
}

const AdvancedSearchFilters: React.FC<AdvancedSearchFiltersProps> = ({ 
  filters, 
  onChange, 
  onReset 
}) => {
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

  const hasAnyFilter = () => {
    return Object.entries(filters).some(([key, value]) => {
      if (key === 'dateRange' && value) {
        const dateRange = value as { from: string; to: string };
        return dateRange.from || dateRange.to;
      }
      return value && value !== '';
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Advanced Search Filters</h3>
        {hasAnyFilter() && (
          <button
            onClick={onReset}
            className="flex items-center space-x-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
        <strong>Note:</strong> All fields are optional. You can search using any single field or combination of fields. 
        At least one field must contain valid input to perform a search.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patent Number <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g., US1234567"
            value={filters.patentNumber || ''}
            onChange={(e) => updateFilter('patentNumber', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Applicant/Company <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Apple Inc."
            value={filters.applicant || ''}
            onChange={(e) => updateFilter('applicant', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Inventor <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g., John Smith"
            value={filters.inventor || ''}
            onChange={(e) => updateFilter('inventor', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patent Class <span className="text-gray-400">(Optional)</span>
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
            <option value="D07-123">D07-123 (Clothing & Textiles)</option>
            <option value="D21-456">D21-456 (Games & Toys)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status <span className="text-gray-400">(Optional)</span>
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
            Country <span className="text-gray-400">(Optional)</span>
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
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filing Date From <span className="text-gray-400">(Optional)</span>
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
            Filing Date To <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="date"
            value={filters.dateRange?.to || ''}
            onChange={(e) => updateDateRange('to', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchFilters;