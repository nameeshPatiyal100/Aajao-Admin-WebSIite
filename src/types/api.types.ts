export interface ApiUser {
    user_id: number;
    user_fullName: string;
    user_isActive: number;
    user_isVerified: number;
    added_at: string;
    user_dob?: string;
    userCred?: {
      cred_user_email: string;
    };
  }
  