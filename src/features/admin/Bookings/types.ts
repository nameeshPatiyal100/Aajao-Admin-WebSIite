// types.ts (optional but recommended)
export interface BookingItem {
  book_id: string;
  book_total_amt: number;
  book_is_paid: 0 | 1;
  book_added_at: string;

  userDetails: {
    user_fullName: string;
  };

  bookingProperty: {
    property_name: string;
  };

  bookDetails: {
    bt_book_checkIn: string | null;
    bt_book_checkout: string | null;
  };

  bookingStatus: {
    bs_title: BookingStatus;
    bs_code: string;
  };
}


      
  
  export interface BookingListResponse {
    bookings: BookingItem[];
    totalRecords: number;
  }

  export type BookingStatus = "confirmed" | "pending" | "cancelled";

// types.ts
export interface BookingRow {
  id: string;
  userName: string;
  propertyName: string;
  checkIn: string;
  checkOut: string;
  amount: number;
  bookingStatus: string;     // ← EXACT title from API
  statusColor: string;       // ← bs_code
  paymentStatus: "paid" | "unpaid";
  createdAt: string;
}

// features/admin/Bookings/types.ts

export interface BookingHistoryItem {
  title: string;
  description: string;
}

export interface BookingDetail {
  id: string;

  createdAt: string;

  dates: {
    checkIn: string;
    checkOut: string;
  };

  pricing: {
    price: number;
    tax: number;
    taxPercentage: number;
    total: number;
    isPaid: boolean;
    isCOD: boolean;
  };

  user: {
    name: string;
    phone: string;
    email: string;
  };

  property: {
    name: string;
    contact: string;
    email: string;
  };

  host: {
    name: string;
    phone: string;
    email: string;
  };

  status: {
    title: string;
    color: string;
  };

  history: BookingHistoryItem[];
}

export interface BookingStatusItem {
  bs_id: number;
  bs_title: string;
  bs_code: string | null;
}



  