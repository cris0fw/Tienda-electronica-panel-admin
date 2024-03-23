import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryBlogService from "./blogCategoryService";

const initialState = {
  categoryBlog: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getCategoryBlogs = createAsyncThunk(
  "categoryBlog/get-category-blog",
  async (thunkAPI) => {
    try {
      return await categoryBlogService.getCategoryBlog();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCategoryBlog = createAsyncThunk(
  "categoryBlog/create-category-blog",
  async (dataCategoryBlog, thunkAPI) => {
    try {
      return await categoryBlogService.createCategoryBlog(dataCategoryBlog);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBlogCategory = createAsyncThunk(
  "categoryBlog/get-categoryBlog",
  async (id, thunkAPI) => {
    try {
      return await categoryBlogService.getBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updatedBlogCategory = createAsyncThunk(
  "categoryBlog/update-category-blog",
  async (dataCategoryBlog, thunkAPI) => {
    try {
      return await categoryBlogService.updatedBlogCategory(dataCategoryBlog);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBlogCategory = createAsyncThunk(
  "categoryBlog/delete-category-blog",
  async (id, thunkAPI) => {
    try {
      return await categoryBlogService.deleteBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset-all");

export const categoryBlogSlice = createSlice({
  name: "categoryBlog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategoryBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categoryBlog = action.payload;
        state.message = "";
      })
      .addCase(getCategoryBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(createCategoryBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategoryBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCategoryBlog = action.payload;
        state.message = "";
      })
      .addCase(createCategoryBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(getBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categoryBlogName = action.payload.title;
        state.message = "";
      })
      .addCase(getBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(updatedBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatedBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categoryBlogUpdated = action.payload;
        state.message = "";
      })
      .addCase(updatedBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(deleteBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categoryBlogDeleted = action.payload;
        state.message = "";
      })
      .addCase(deleteBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default categoryBlogSlice.reducer;
