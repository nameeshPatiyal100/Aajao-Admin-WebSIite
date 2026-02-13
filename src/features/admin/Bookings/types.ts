// types.ts (optional but recommended)
export interface BookingItem {
  book_id: string;
  book_total_amt: number;
  book_is_paid: number; // 0 | 1
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
    bs_title: string;
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


  