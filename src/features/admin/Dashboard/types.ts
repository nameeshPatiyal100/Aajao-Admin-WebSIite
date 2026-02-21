/* ============================
   REUSABLE ENTITY TYPES
============================ */

export interface LatestUser {
  user_fullName: string;
  user_isVerified: 0 | 1;
  user_isActive: 0 | 1;
  "userCred.cred_user_email": string;
}

export interface LatestBooking {
  book_id: string;
  book_total_amt: number;
  book_is_paid: 0 | 1;
  "bookingStatus.bs_title": string;
  "bookingStatus.bs_code": string;
}

export interface LatestProperty {
  property_name: string;
  property_price: string;
  is_verify: boolean;
  is_active: boolean;
}

/* ============================
   INNER DASHBOARD DATA
============================ */
export interface DashboardPayload {
  userCount: number;
  hostCount: number;
  propCount: number;
  BookingCount: number;
  pendingPropCount: number;

  getLatestUser: LatestUser[];
  getLatestBooking: LatestBooking[];
  getLatestProperties: LatestProperty[];

  getMonthlyBookingsData: {
    months: string[];
    successful: number[];
    cancelled: number[];
  };

  getDailyUsersData: {
    dates: string[];
    users: number[];
  };

  getUserStatsData: {
    active: number;
    inactive: number;
    verified: number;
    other: number;
  };

  getHostStatsData: {
    active: number;
    inactive: number;
    verified: number;
    other: number;
  };
}

/* ============================
   FULL API RESPONSE
============================ */
export interface DashboardApiResponse {
  success: boolean;
  message: string;
  data: DashboardPayload;
}

/* ============================
   REDUX STATE
============================ */
export interface DashboardState {
  loading: boolean;
  success: boolean;
  error: string | null;
  data: DashboardApiResponse | null;
}