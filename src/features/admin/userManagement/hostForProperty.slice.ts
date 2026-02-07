import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";
import { ApiHost } from "../../../types/api.types";

interface HostForPropertyState {
  hosts: ApiHost[];
  loading: boolean;
  error: string | null;
}

const initialState: HostForPropertyState = {
  hosts: [],
  loading: false,
  error: null,
};

interface HostApiResponse { 
    data: ApiHost[];

}
export const fetchHostsForProperty = createAsyncThunk<
HostApiResponse,
  { search: string }
>("hostForProperty/search", async ({ search }, { rejectWithValue }) => {
  try {
    const res = await api.get(
      `${ADMINENDPOINTS.HOST_SEARCH_ASSIGN_PROPERTY}?search=${search}`
    );
    return res.data.data;
  } catch (err: any) {
    return rejectWithValue("Failed to search hosts");
  }
});

const hostForPropertySlice = createSlice({
  name: "hostForProperty",
  initialState,
  reducers: {
    resetHostForProperty: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHostsForProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHostsForProperty.fulfilled, (state, action) => {
        console.log(action,"action in slice");
        state.loading = false;
        state.hosts = action.payload.data;
      })
      .addCase(fetchHostsForProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetHostForProperty } = hostForPropertySlice.actions;
export default hostForPropertySlice.reducer;
