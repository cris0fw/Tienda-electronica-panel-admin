import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";

const initialState = {
  enquiry: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getEnquiry = createAsyncThunk(
  "enquiry/get-enquiries",
  async (thunkAPI) => {
    try {
      return await enquiryService.getEnquiry();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteEnquiry = createAsyncThunk(
  "enquiry/delete-enquiry",
  async (id, thunkAPI) => {
    try {
      return await enquiryService.deleteEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOneEnquiry = createAsyncThunk(
  "enquiry/get-enquiry",
  async (id, thunkAPI) => {
    try {
      return await enquiryService.getOneEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updatedEnquiry = createAsyncThunk(
  "enquiry/update-enquiry",
  async (id, thunkAPI) => {
    try {
      return await enquiryService.updatedEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset-all");

export const enquirySlice = createSlice({
  name: "enquiry",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiry = action.payload;
        state.message = "";
      })
      .addCase(getEnquiry.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(deleteEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiryDeleted = action.payload;
        state.message = "";
      })
      .addCase(deleteEnquiry.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(getOneEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiryName = action.payload.name;
        state.enquiryEmail = action.payload.email;
        state.enquiryMobile = action.payload.mobile;
        state.enquiryComment = action.payload.comment;
        state.enquiryStatus = action.payload.status;
        state.message = "";
      })
      .addCase(getOneEnquiry.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(updatedEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatedEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiryUpdated = action.payload;
        state.message = "";
      })
      .addCase(updatedEnquiry.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default enquirySlice.reducer;
