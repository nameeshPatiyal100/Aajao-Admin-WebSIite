import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

interface DeleteImagePayload {
  afile_id: number;
  property_id: number;
}

interface DeleteImageState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: DeleteImageState = {
  loading: false,
  error: null,
  success: false,
};

export const deletePropertyImage = createAsyncThunk<
  number, // return afile_id on success
  DeleteImagePayload,
  { rejectValue: string }
>(
  "property/deleteImage",
  async ({ afile_id, property_id }, { rejectWithValue }) => {
    try {
      await api.post(ADMINENDPOINTS.DELETE_PROPERTY_IMAGE, {
        afile_id,
        property_id,
      });

      return afile_id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete image"
      );
    }
  }
);
