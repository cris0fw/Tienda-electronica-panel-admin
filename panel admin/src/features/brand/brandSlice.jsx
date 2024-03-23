import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import brandService from "./brandService";

const initialState = {
  brands: [],
  createBrand: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getBrands = createAsyncThunk(
  "brand/get-brands",
  async (thunkAPI) => {
    try {
      return await brandService.getBrands();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBrand = createAsyncThunk(
  "brand/get-brand",
  async (id, thunkAPI) => {
    try {
      return await brandService.getBrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createdBrand = createAsyncThunk(
  "brand/create-brands",
  async (dataBrand, thunkAPI) => {
    try {
      return await brandService.createdBrand(dataBrand);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updatedBrand = createAsyncThunk(
  "brand/update-brands",
  async (dataBrand, thunkAPI) => {
    try {
      return await brandService.updatedBrand(dataBrand);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBrand = createAsyncThunk(
  "brand/delete-brand",
  async (id, thunkAPI) => {
    try {
      return await brandService.deleteBrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset-all");

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brands = action.payload;
        state.message = "";
      })
      .addCase(getBrands.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createdBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createdBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createBrand = action.payload;
        state.message = "";
      })
      .addCase(createdBrand.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(getBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brandName = action.payload.title;
        state.message = "";
      })
      .addCase(getBrand.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(updatedBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatedBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateBrand = action.payload;
        state.message = "";
      })
      .addCase(updatedBrand.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBrand = action.payload;
        state.message = "";
      })
      .addCase(deleteBrand.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default brandSlice.reducer;
