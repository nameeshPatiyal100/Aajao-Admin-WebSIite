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
    isLuxury: boolean; // ✅ NEW (converted to boolean)
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
  };


  export interface PropertySearchFilter {
    keyword: string;
  }
  
  export interface PropertySearchBarProps {
    ThemeColors: {
      primary: string;
    };
  
    filterData: PropertySearchFilter;
  
    handleFilterUpdate: (
      key: keyof PropertySearchFilter,
      value: string,
      shouldSearch?: boolean
    ) => void;
  
    handleFilter: () => void;
    handleClear: () => void;
  }

  export interface PropertyRecord {
    is_active: any;
    id: number;
    property_name: string;
    host_name: string;
    max_price: number;
    avg_bookings: number;
    is_luxury: number; 
  }
  
  export interface PropertyFilterData {
    page: number;
    limit: number;
    keyword: string;
  }