
export interface ApiHost {
  user_id: number;
  user_fullName: string;
  user_isActive: number;
  user_isVerified: number;
  added_at: string;
  propertyCount: number;
  userCred: {
    cred_user_email: string;
  } | null;
}

  
export interface ApiUser {
    user_id: number;
    user_fullName: string;
    user_isActive: 1 | 0;
    user_isVerified: number;
    added_at: string;
    userCred?: {
      cred_user_email?: string;
    };
  }