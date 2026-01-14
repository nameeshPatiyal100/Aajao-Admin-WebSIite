export interface PropertyRecord {
  id: string;
  name: string;
  host_name: string;
  status: "0" | "1";
  is_verified: "0" | "1";
}

export interface FilterData {
  status: string;
  keyword: string;
  [key: string]: any;
}

export interface FormValues {
  id: string;
  name: string;
  host_name: string;
  user_id: number | "";
  description: string;
  address: string;
  city: string;
  zip_code: string;
  country: string;
  state: string;
  phone: string;
  email: string;
  website_url: string;
  check_in_time: string;
  check_out_time: string;
  price: number;
  minimum_price: number;
  weekly_minimum_price: number;
  weekly_maximum_price: number;
  monthly_security: number;
  status: "0" | "1";
  is_verified: "0" | "1";
  is_luxury: "0" | "1";
  is_pet_friendly: "0" | "1";
  is_smoking_free: "0" | "1";
  categories: number[];
  tags: number[];
  amenities: number[];
  cover_image: File | null;
  images: (File | string)[];
}

export interface AddUpdateFormProps {
  formData: FormValues | null;
  formshow: boolean;
  handleFormClose: () => void;
  handleAddOrUpdateProperty: (values: FormValues) => void;
}

export interface ListingProps {
  ThemeColors: { text: { secondary: string }; secondary: string };
  propertiesListing: {
    id: string;
    name: string;
    host_name: string;
    status: "0" | "1";
    is_verified: "0" | "1";
  }[];
  totalRecords: number;
  loading: boolean;
  handlePaginate: (event: React.ChangeEvent<unknown>, page: number) => void;
  page: number;
  rowsPerPage: number;
  handleToggleActive: (id: string) => void;
  handleVerifiedStatus: (id: string) => void;
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
}
