export type APIResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type User = {
    name:string
}
export type UserType = {
  user_fullName: string;
  user_pnumber: string;
  user_dob: string;
  user_address: string;
  user_city: string;
  user_zipcode: string;
  user_isHost: boolean;
  user_isUser: boolean;
  attachment: string;
  userId: number;
  cred_username: string;
  cred_user_email: string;
};

export type AuthContextType = {
  user: UserType | null;
  loading: boolean;
};
