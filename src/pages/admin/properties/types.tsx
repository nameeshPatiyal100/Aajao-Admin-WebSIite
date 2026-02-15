export interface PropertyRecord {
  property_id: string;
  property_name: string;
  ["HostDetails.user_fullName"]: string;
  host_name: string;
  is_active: boolean;
  categories: string[];
}
type ApiFile = {
  afile_id: number;
  url: string;
};

interface PreviewItem {
  id: string;
  src: string;
  file?: File;
  afile_id?: number;
}

export interface FilterData {
  page: number;
  limit: number;
  search: string;
  status: string;
  [key: string]: any;
}
type CoverImage =
  | File
  | {
      afile_id: number;
      url: string;
    }
  | null;

type ImageValue =
  | File
  | {
      afile_id: number;
      url: string;
    };

export interface FormValues {
  id: string;
  name: string;

  hostId: number | null;
  hostName: string;

  description: string;
  address: string;
  city: string;
  zip_code: string;
  country: string;
  state: string;
  phone: string;
  email: string;

  latitude: string;
  longitude: string;

  price: number;
  minimum_price: number;
  weekly_minimum_price: number;
  weekly_maximum_price: number;
  monthly_security: number;

  check_in_time: string;
  check_out_time: string;

  status: "0" | "1";
  is_verified: "0" | "1" | "2";
  is_luxury: "0" | "1";
  is_pet_friendly: "0" | "1";
  is_smoking_free: "0" | "1";

  categories: number[];
  tags: number[];
  amenities: number[];

  description_points: string[];
  description_extra: string;

  // cover_image: File | null;
  images: ImageValue[];
  cover_image: File | ApiFile | null;
  documents: (File | ApiFile)[];
}

export const DEFAULT_FORM_VALUES: FormValues = {
  id: "",
  name: "",
  hostId: null, // ok
  hostName :"",
  description: "",
  address: "",
  city: "",
  zip_code: "",
  country: "",
  state: "",
  phone: "",
  email: "",
  latitude: "",
  longitude: "",
  check_in_time: "",
  check_out_time: "",
  price: 0,
  minimum_price: 0,
  weekly_minimum_price: 0,
  weekly_maximum_price: 0,
  monthly_security: 0,
  status: "0",
  is_verified: "0",
  is_luxury: "0",
  is_pet_friendly: "0",
  is_smoking_free: "0",
  categories: [],
  tags: [],
  amenities: [],
  description_points: [],
  description_extra: "",
  cover_image: null,
  images: [],
  documents: [],
};


export interface ListingProps {
  ThemeColors: { text: { secondary: string }; secondary: string };
  properties: any;
  totalRecords: number;
  loading: boolean;
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
  handleFilterUpdate: (
    name: keyof FilterData,
    value: string,
    apply?: boolean
  ) => void;
  handleFilter: () => void;
  handleClear: () => void;
  [key: string]: any;
}
