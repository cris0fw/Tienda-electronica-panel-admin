// Creamos los slices y los errores
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// importamos el servicio para consumir
import { blogService } from "./blogService";

export const getAllBlogs = createAsyncThunk("blog/get", async (thunkAPI) => {
  try {
    return await blogService.getBlogs();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getSingleBlogId = createAsyncThunk(
  "blog/getId",
  async (id, thunkAPI) => {
    try {
      return await blogService.getBlogId(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const giveAlike = createAsyncThunk(
  "blog/like",
  async (data, thunkAPI) => {
    try {
      return await blogService.giveAlike(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const giveAdislike = createAsyncThunk(
  "blog/dislike",
  async (data, thunkAPI) => {
    try {
      return await blogService.giveAdislike(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  blog: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const blogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.blog = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getSingleBlogId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleBlogId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.singleBlog = action.payload;
      })
      .addCase(getSingleBlogId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(giveAlike.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(giveAlike.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.like = action.payload;
      })
      .addCase(giveAlike.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(giveAdislike.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(giveAdislike.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.dislike = action.payload;
      })
      .addCase(giveAdislike.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default blogSlice.reducer;
