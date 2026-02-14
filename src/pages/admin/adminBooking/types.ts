export type BookingStatus =
  | "confirmed"
  | "pending"
  | "cancelled"
  | "completed";

export type PaymentStatus =
  | "paid"
  | "unpaid"
  | "refunded";

  export interface BookingRow {
    id: string;
    userName: string;
    propertyName: string;
    checkIn: string;
    checkOut: string;
    amount: number;
    bookingStatus: BookingStatus;
    paymentStatus: PaymentStatus;
    createdAt: string;
    statusColor?: string;
  }


  export interface BookingDetail {
    id: string;
    createdAt: string;
  
    pricing: {
      price: number;
      tax: number;
      taxPercentage: number;
      total: number;
      isPaid: boolean;
      isCOD: boolean;
    };
  
    dates: {
      checkIn: string;
      checkOut: string;
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
  
    history: {
      title: string;
      description: string;
    }[];
  }
  
  
