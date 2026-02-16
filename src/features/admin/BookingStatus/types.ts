export interface UpdateBookingStatusPayload {
    bs_id: number;
    bs_title: string;
    bs_code: string | null;
  }
  
  export interface UpdateBookingStatusState {
    loading: boolean;
    success: boolean;
    error: string | null;
  }

  
  