// export interface Attendant {
//   user_id: string;
//   user_fullName: string;
//   dob?: string;
//   email: string;
//   date: string;
//   user_isActive: "1" | "0";
//   loading: boolean;
// }
export interface Attendant {
  user_id: number;
  name: string;
  email: string;
  createdAt: string;
  isActive: boolean;
}
// api.types.ts
export interface User {
  user_id: string;
  user_fullName: string;
  email: string;
  user_isActive: "1" | "0";
}

export type ModalMode = "add" | "view" | "edit";
