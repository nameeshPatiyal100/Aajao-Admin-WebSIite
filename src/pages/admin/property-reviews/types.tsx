/* ================= API TYPES ================= */

export interface ReviewApiRecord {
  br_id: number;
  br_book_id: string;
  br_propId: number;
  br_rating: string;
  br_isActive: number;
  br_addedAt: string;

  propReview: {
    property_name: string;
  };

  userReview: {
    user_fullName: string;
  };
}

export interface ReviewApiResponse {
  success: boolean;
  message: string;
  data: {
    page: number;
    limit: number;
    offset: number;
    totalRecords: number;
    currentPage: number;
    totalPages: number;
    reviews: ReviewApiRecord[];
  };
}

/* ================= UI TYPES ================= */

export interface ReviewRecord {
  id: string;
  property: string;
  user_name: string;
  rating: "1" | "2" | "3" | "4" | "5";
  status: "0" | "1";
}

/* ================= FILTER TYPES ================= */

export interface FilterData {
  page: number;
  limit: number;
  search: string;
  status: string;
  rating: string;
  keyword: string;
  [key: string]: any;
}

/* ================= FORM TYPES ================= */

export interface FormValues {
  id: string;
  property: string;
  description: string;
  user_name: string;
  title: string;
  rating: "1" | "2" | "3" | "4" | "5";
  status: "0" | "1";
}


export interface ListingProps {
  ThemeColors: { text: { secondary: string }; secondary: string };

  reviewsListing: {
    id: string;
    property: string;
    user_name: string;
    status: "0" | "1";
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
    keyword?: string;
    status?: string;
    rating?: string;
    [key: string]: any;
  };

  handleFilterUpdate: (key: string, value: any, apply: boolean) => void;
  handleFilter: () => void;
  handleClear: () => void;
}

export interface PropertyReview {
  br_id: number;
  br_book_id: string;
  br_rating: string;
  br_title: string | null;
  br_desc: string | null;
  br_isActive: number;
}

export interface HostReview {
  hr_id: number;
  hr_book_id: string;
  hr_rating: number;
  hr_title: string | null;
  hr_description: string | null;
}

export interface PlatformReview {
  pr_id: number;
  pr_book_id: string;
  pr_rating: number;
  pr_title: string | null;
  pr_description: string | null;
}

export interface HostReviewForUser {
  hru_id: number;
  hru_bookingId: string;
  hru_rating: number;
  hru_title: string | null;
  hru_description: string | null;
  hru_userId: number;
  hru_hostId: number;
  "reviewUsername.user_fullName": string;
  "reviewHostName.user_fullName": string;
  "reviewProp.property_name": string;
}

export interface ReviewDetailData {
  propertyReview: PropertyReview | null;
  hostReview?: HostReview | null;
  platformReview?: PlatformReview | null;
  hostReviewForUser?: HostReviewForUser | null;
}

export interface UpdateFormProps {
  reviewDetail: ReviewDetailData | null;
  loading: boolean;
  formshow: boolean;
  handleFormClose: () => void;
  handleUpdateReview: (values: any) => void;
}

// export interface FormValues {
//   id: string;
//   status: "0" | "1" | "2";
// }
