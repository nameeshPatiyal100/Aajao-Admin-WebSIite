// 🔹 Fetch all individuals
// export const fetchIndividualData = createAsyncThunk('individuals/fetch', async (_, { getState, dispatch, rejectWithValue }) => {
//     try {
//         dispatch(showLoading());
//         const { search, filters, search_columns, sort, page, limit } = getState().individualSlice;
//         const response = await HttpClient.get('individual-client', { search, filters, search_columns, sort, page, limit }, {}, { showToast: false });
//         dispatch(hideLoading());
//         return response;
//     } catch (error) {
//         dispatch(hideLoading());
//         return rejectWithValue(error);
//     } finally {
//         dispatch(hideLoading()); // Ensure that loading state is hidden
//     }
// });

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axios } from '../axios/axios';

interface AuthState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  data: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (
    { user_email, user_password, isHost }: { user_email: string; user_password: string; isHost: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post('/user/login', { user_email, user_password, isHost });
      return response
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const forgotPassword = (email: string) => {
  return axios.post('/user/forget-password', { userEmail: email })
}
export const verifyOtp = (data: object) => {
  return axios.post('/user/forget/verify-otp', data)
}
export const resetPassword = (data:object) => {
  return axios.post('/user/update/forget-password',data)
}
export const getUser = createAsyncThunk("/auth/user", async (_,{ rejectWithValue }) => {
  try {
    const response = await axios.get("/user/detail")
    return response
  } catch (error: any) {
    console.log(error);
    return rejectWithValue(error.response?.data?.message || 'Login failed');
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
       .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data.user; // Assuming response.data.user is the shape
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.data = null;
      });
    
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
