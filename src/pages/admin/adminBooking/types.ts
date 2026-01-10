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
}
