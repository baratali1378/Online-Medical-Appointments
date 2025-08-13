import { DoctorListItem } from "./doctor";

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

export interface DoctorSearchResult {
  success: boolean;
  message: string;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  data: DoctorListItem[];
}

export interface FilterValues {
  city: string;
  specialty: string;
  query: string;
  verifiedOnly: boolean;
  minRating: number;
}

export interface SearchSidebarProps {
  initialFilters?: Partial<FilterValues>;
  cities: string[];
  specialties: string[];
  onFilterChange: (filters: FilterValues) => void;
  onClose?: () => void;
  isMobile?: boolean;
}
