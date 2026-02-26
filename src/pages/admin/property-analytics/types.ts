export interface PropertyListingItem {
    id: number;
    property_name: string;
    host_name: string;
    max_price: number;
    avg_bookings: number;
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
    id: string;
    property_name: string;
    host_name: string;
    max_price: number;
    avg_bookings: number;
  }
  
  export interface PropertyFilterData {
    page: number;
    limit: number;
    keyword: string;
  }