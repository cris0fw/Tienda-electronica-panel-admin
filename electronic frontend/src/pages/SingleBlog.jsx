import React, { useEffect } from "react";
import BreadCrum from "../components/BreadCrum";
import Meta from "../components/Meta";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleBlogId } from "../features/blogs/blogSlice";

const SingleBlog = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const blogStateId = useSelector((state) => state.blog.singleBlog);

  useEffect(() => {
    getBlogId();
  }, [id]);

  const getBlogId = () => {
    dispatch(getSingleBlogId(id));
  };

  return (
    <div>
      <BreadCrum title="blog unico" />
      <Meta title="blog unico" />

      <div className="container my-16 flex flex-col gap-3">
        <Link
          to="/blogs"
          className="flex items-center gap-2 text-lg font-semibold text-[#AAAAA8]"
        >
          <FaArrowLeftLong /> Volver a los blogs
        </Link>

        <h1 className="font-bold text-2xl">{blogStateId?.title}</h1>

        <img src={blogStateId?.images[0]?.url} alt="single blog image" />

        <p>{blogStateId?.description}</p>
      </div>
    </div>
  );
};

export default SingleBlog;
