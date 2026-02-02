export interface CategoryRecord {
  cat_id: string;
  cat_title: string;
  cat_isActive: "1" | "0";
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
  categoryId?: string | null;
  formshow: boolean;
  // handleFormShow: (id?: string) => void;
  filterData: any;
  handleFormClose: () => void;
}

export interface ListingProps {
  ThemeColors: { text: { secondary: string }; secondary: string };
  categories: any;
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