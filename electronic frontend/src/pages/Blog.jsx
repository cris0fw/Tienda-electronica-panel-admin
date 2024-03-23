import React, { useEffect } from "react";
import BreadCrum from "../components/BreadCrum";
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";

const Blog = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = () => {
    dispatch(getAllBlogs());
  };

  const blogState = useSelector((state) => state.blog.blog);

  return (
    <div>
      <BreadCrum title="Blogs" />
      <Meta title="Blogs" />

      <div className="container my-16 flex gap-4 ">
        <div className="w-[300px] bg-blanco">
          <h2 className="mb-3 font-semibold text-lg">comprar por categorías</h2>

          <ul className="text-[#5C5D5E]">
            <li className="text-sm mb-2">Smart Tv y Led Tv</li>
            <li className="text-sm mb-2">Tecnologia</li>
            <li className="text-sm mb-2">Lavado y secado</li>
            <li className="text-sm mb-2">Audio</li>
            <li className="text-sm mb-2">Climatizacion</li>
            <li className="text-sm">Cocina y hornos</li>
          </ul>
        </div>
        <div className="w-full flex gap-4 flex-wrap p-4">
          {blogState.map((items) => {
            return <BlogCard data={items} key={items._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Blog;
