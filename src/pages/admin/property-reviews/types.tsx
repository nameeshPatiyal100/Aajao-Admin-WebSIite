export interface ReviewRecord {
  id: string;
  property: string;
  user_name: string;
  title: string;
  description: string;
  rating: "1" | "2" | "3" | "4" | "5";
  status: "0" | "1" | "2";
}

export interface FilterData {
  keyword: string;
  [key: string]: any;
}

export interface FormValues {
  id: string;
  property: string;
  user_name: string;
  title: string;
  description: string;
  rating: "1" | "2" | "3" | "4" | "5";
  status: "0" | "1" | "2";
}

export interface UpdateFormProps {
  formData: FormValues | null;
  formshow: boolean;
  handleFormClose: () => void;
  handleUpdateReview: (values: FormValues) => void;
}

export interface ListingProps {
  ThemeColors: { text: { secondary: string }; secondary: string };
  reviewsListing: {
    id: string;
    property: string;
    user_name: string;
    status: "0" | "1" | "2";
    rating: "1" | "2" | "3" | "4" | "5";
  }[];
  totalRecords: number;
  loading: boolean;
  handleFormShow: (id: string) => void;
  handlePaginate: (event: React.ChangeEvent<unknown>, page: number) => void;
  page: number;
  rowsPerPage: number;
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
    keyword: string;
    [key: string]: any;
  };
  handleFilterUpdate: (key: string, value: any, apply: boolean) => void;
  handleFilter: () => void;
  handleClear: () => void;
}
