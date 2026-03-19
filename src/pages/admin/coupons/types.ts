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
  // handleToggleActive: (couponId: number) => void;
  handleToggleActive: (couponId: number, status: boolean) => void;
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
  discount_type: number;
  discount_percentage: number | "";
  discount_amount: number | "";
  min_amount: number | "";
  max_amount: number | "";
  valid_from: string;
  valid_to: string;
  usage_limit: number | "";
  status: number;
}

export interface CouponApiResponse {
  cpn_id: number;
  cpn_title: string;
  cpn_code: string;
  cpn_dsctn_type: number;
  cpn_dsctn_percnt: number;
  cpn_dsctn_amt: number;
  cpn_min_amt: number;
  cpn_max_amt: number;
  cpn_valid_from: string;
  cpn_valid_to: string;
  cpn_usage_limit: number;
  cpn_status: number;
}

import { CouponDetailApi } from "../../../features/admin/Coupons/couponDetailed.slice";

export interface CouponFormModalProps {
  open: boolean;
  mode: "add" | "edit";
  initialData: CouponDetailApi | null; // ✅ FIXED
  onClose: () => void;
  onSubmit: (data: CouponFormData) => void;
  loading?: boolean;
}
// export interface CouponFormModalProps {
//   open: boolean;
//   mode: "add" | "edit";
//   initialData?: CouponApiResponse; // ✅ FIXED
//   onClose: () => void;
//   onSubmit: (data: CouponFormData) => void;
//   loading?: boolean;
// }
