export interface AmenityRecord {
  amn_id: string;
  amn_title: string;
  amn_isActive: 1 | 0;
}

export interface FilterData {
  page: number;
  limit: number;
  search: string;
  status: string;
}


export interface FormValues {
  id: string;
  name: string;
  status: "0" | "1";
}

export interface AddUpdateFormProps {
  amenetiesId?: string | null;
  formshow: boolean;
  // handleFormShow: (id?: string) => void;
  filterData: any;
  handleFormClose: () => void;
}

export interface ListingProps {
  ThemeColors: { text: { secondary: string }; secondary: string };
  amenities: any;
  totalRecords: number;
  loading: boolean;
  handleFormShow: (id: string) => void;
  handlePaginate: (event: React.ChangeEvent<unknown>, page: number) => void;
  page: number;
  rowsPerPage: number;
  handleToggleActive: (id: number) => void;
  handleDeleteClick: (id: string) => void;
}

export interface SearchBarProps {
  ThemeColors: {
    primary: string;
    secondary?: string;
    background?: string;
    text?: {
      primary?: string;
      secondary?: string;
    };
  };
  filterData: {
    status: string;
    [key: string]: any;
  };
  handleFilterUpdate: (name: keyof FilterData, value: string, apply?: boolean) => void;
  handleFilter: () => void;
  handleClear: () => void;
  handleFormShow: (id?: string) => void;
}