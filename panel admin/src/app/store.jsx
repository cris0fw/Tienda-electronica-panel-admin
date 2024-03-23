import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/CustomerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import categoryReducer from "../features/category/categorySlice";
import colorReducer from "../features/color/colorSlice";
import blogReducer from "../features/blog/blogSlice";
import categoryBlogReducer from "../features/blogCategory/blogCategorySlice";
import enquiryReducer from "../features/enquiries/enquirySlice";
import uploadReducer from "../features/uploads/uploadSlice";
import couponReducer from "../features/cuopon/couponSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    category: categoryReducer,
    color: colorReducer,
    blog: blogReducer,
    categoryBlog: categoryBlogReducer,
    enquiry: enquiryReducer,
    upload: uploadReducer,
    coupon: couponReducer,
  },
});
