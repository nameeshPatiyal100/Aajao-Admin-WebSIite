export interface CouponRecord {
  coupon_id: number;
  coupon_title: string;
  coupon_code: string;
  discount_percentage: number;
  is_active: boolean;
}

export interface CouponListingProps {
  ThemeColors: any;
  coupons: CouponRecord[];
  totalRecords: number;
  loading: boolean;
  page: number;
  rowsPerPage: number;
  handlePaginate: (event: React.ChangeEvent<unknown>, value: number) => void;
  handleToggleActive: (couponId: number) => void;
  handleDeleteClick: (couponId: number) => void;
  handleEditClick: (couponId: number) => void;
}
export interface CouponSearchBarProps {
  ThemeColors: any;
  filterData: {
    keyword?: string;
  };
  handleFilterUpdate: (
    key: string,
    value: string,
    isImmediate?: boolean
  ) => void;
  handleFilter: () => void;
  handleClear: () => void;
  onAddClick: () => void;
}

export interface CouponFormData {
  coupon_title: string;
  coupon_code: string;
  discount_percentage: number | "";
  status: number; // 1 = Active, 0 = Inactive
}

export interface CouponFormModalProps {
  open: boolean;
  mode: "add" | "edit";
  initialData?: CouponFormData | null;
  onClose: () => void;
  onSubmit: (data: CouponFormData) => void;
  loading?: boolean;
}
