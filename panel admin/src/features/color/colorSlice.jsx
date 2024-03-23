import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import colorService from "./colorService";

const initialState = {
  colors: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getColors = createAsyncThunk(
  "color/get-colors",
  async (thunkAPI) => {
    try {
      return await colorService.getColors();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getColor = createAsyncThunk(
  "color/get-color",
  async (id, thunkAPI) => {
    try {
      return await colorService.getColor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProduct = createAsyncThunk(
  "color/create-colors",
  async (dataColor, thunkAPI) => {
    try {
      return await colorService.createProduct(dataColor);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updatedColor = createAsyncThunk(
  "color/update-color",
  async (dataColor, thunkAPI) => {
    try {
      return await colorService.updatedColor(dataColor);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteColor = createAsyncThunk(
  "color/delete-color",
  async (id, thunkAPI) => {
    try {
      return await colorService.deleteColor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset-all");

export const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colors = action.payload;
        state.message = "";
      })
      .addCase(getColors.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })

      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdColor = action.payload;
        state.message = "";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })

      .addCase(updatedColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatedColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colorUpdated = action.payload;
        state.message = "";
      })
      .addCase(updatedColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })

      .addCase(getColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colorName = action.payload.title;
        state.message = "";
      })
      .addCase(getColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })

      .addCase(deleteColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colorDeleted = action.payload;
        state.message = "";
      })
      .addCase(deleteColor.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })

      .addCase(resetState, () => initialState);
  },
});

export default colorSlice.reducer;
