export interface CategoryRecord {
  id: string;
  name: string;
  status: "1" | "0";
}

export interface FilterData {
  status: string;
  keyword: string;
  [key: string]: any;
}

export interface FormValues {
  id: string;
  name: string;
  status: "0" | "1";
}

export interface AddUpdateFormProps {
  formData: FormValues | null;
  formshow: boolean;
  handleFormClose: () => void;
  handleAddOrUpdateCategory: (values: FormValues) => void;
}

export interface ListingProps {
  ThemeColors: { text: { secondary: string }; secondary: string };
  categoryListing: { id: string; name: string; status: "0" | "1" }[];
  totalRecords: number;
  loading: boolean;
  handleFormShow: (id: string) => void;
  handlePaginate: (event: React.ChangeEvent<unknown>, page: number) => void;
  page: number;
  rowsPerPage: number;
  handleToggleActive: (id: string) => void;
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
  handleFilterUpdate: (key: string, value: any, apply: boolean) => void;
  handleFilter: () => void;
  handleClear: () => void;
  handleFormShow: (id?: string) => void;
}