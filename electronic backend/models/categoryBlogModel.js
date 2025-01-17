import mongoose from "mongoose";

const BlogCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const BlogCategory = mongoose.model("BlogCategory", BlogCategorySchema);
export default BlogCategory;
