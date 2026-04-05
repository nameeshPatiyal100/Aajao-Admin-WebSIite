// types.ts

export interface PropertyListingItem {
  id: number;
  property_name: string;
  host_name: string;
  max_price: number;
  avg_bookings: number;
}

export interface PropertyAnalytics {
  id: number;
  name: string;
  price: number;
  isActive: boolean;
  isVerified: boolean;
  isLuxury: number; // keep as number (matches API)
  totalBookings: number;
  hostName: string;
}

export interface PropertyListingProps {
  ThemeColors: {
    text: {
      secondary: string;
    };
    secondary: string;
  };

  propertyListing: PropertyListingItem[];
  totalRecords: number;
  loading: boolean;

  handleFormShow: (id: number) => void;
  handlePaginate: (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => void;

  page: number;
  rowsPerPage: number;
}

/* ✅ MAIN FILTER TYPE (USE EVERYWHERE) */
export interface PropertyFilterData {
  page: number;
  limit: number;
  keyword?: string;
  status?: number;     // 1 = active, 0 = inactive
  isLuxury?: number;   // 1 = luxury
}

export interface PropertySearchBarProps {
  ThemeColors: {
    primary: string;
  };

  filterData: PropertyFilterData;

  handleFilterUpdate: (
    key: keyof PropertyFilterData,
    value: string | number | undefined,
    shouldSearch?: boolean
  ) => void;

  handleFilter: () => void;
  handleClear: () => void;
}

export interface PropertyRecord {
  id: number;
  property_name: string;
  host_name: string;
  max_price: number;
  avg_bookings: number;
  is_luxury: number;
  is_active: boolean;
}