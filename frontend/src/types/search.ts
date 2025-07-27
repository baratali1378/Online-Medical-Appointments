export interface SearchFilters {
  city: string;
  specialty: string;
  searchQuery: string;
}

export interface DoctorSearchContainerProps {
  onSearch: (filters: SearchFilters) => void;
  cities: string[];
  specialties: string[];
  initialFilters?: Partial<SearchFilters>;
}

export interface DoctorSearchViewProps {
  filters: SearchFilters;
  cities: string[];
  specialties: string[];
  loading: boolean;
  isMobile: boolean;
  onFilterChange: (field: keyof SearchFilters, value: string) => void;
  onClearFilters: () => void;
}
