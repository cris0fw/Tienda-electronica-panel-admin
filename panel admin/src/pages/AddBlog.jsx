import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getCategoryBlogs } from "../features/blogCategory/blogCategorySlice";
import { deleteImg, uploading } from "../features/uploads/uploadSlice";
import {
  createBlogs,
  getBlog,
  resetState,
  updatedBlog,
} from "../features/blog/blogSlice";

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];

  const categoryBlogState = useSelector(
    (state) => state.categoryBlog.categoryBlog
  );
  const uploadState = useSelector((state) => state.upload.images);
  const createBlogState = useSelector((state) => state.blog);

  const {
    isError,
    isLoading,
    isSuccess,
    createdBlog,
    blogName,
    blogDescription,
    blogCategory,
    blogImage,
    blogUpdated,
  } = createBlogState;

  const img = [];

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getBlog(getBlogId));
      img.push(blogImage);
    } else {
      dispatch(resetState());
    }
  }, [getBlogId]);

  let schema = Yup.object().shape({
    title: Yup.string().required("El nombre del blog es requerido"),
    description: Yup.string().required("la descripcion del blog es requerido"),
    category: Yup.string().required("La categoria del blog es requerida"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || "",
      description: blogDescription || "",
      category: blogCategory || "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updatedBlog(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogs(values));
        formik.resetForm;

        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Producto agregado correctamente");
    }

    if (isSuccess && blogUpdated) {
      toast.success("Blog actualizado correctamente");
      navigate("/admin/blog-list");
    }

    if (isError) {
      toast.error("Error no se pudo agregar el producto");
    }
  }, [isError, isLoading, isSuccess, createdBlog]);

  uploadState.forEach((element) => {
    img.push({
      public_id: element.public_id,
      url: element.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, []);

  useEffect(() => {
    dispatch(getCategoryBlogs());
  }, []);

  return (
    <div>
      <h3 className="mb-4 title">
        {getBlogId !== undefined ? "Editar" : "Añadir"} blog
      </h3>

      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <CustomInput
              type="text"
              label="añadir titulo del blog"
              onCh={formik.handleChange("title")}
              onBl={formik.handleChange("title")}
              name="title"
              val={formik.values.title}
            />
          </div>

          <div className="error mb-3">
            {formik.touched.title && formik.errors.title}
          </div>

          <select
            className="form-control py-3 mb-3"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleChange("category")}
            name="category"
            value={formik.values.category}
          >
            <option value="">Selecciona categoria del blog</option>

            {categoryBlogState.map((element) => {
              return <option key={element._id}>{element.title}</option>;
            })}
          </select>

          <div className="error mb-3">
            {formik.touched.category && formik.errors.category}
          </div>

          <ReactQuill
            theme="snow"
            value={formik.values.description}
            onChange={formik.handleChange("description")}
            onBlur={formik.handleChange("description")}
            name="description"
          />

          <div className="error mb-3">
            {formik.touched.description && formik.errors.description}
          </div>

          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploading(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>

          <div className="showimages d-flex flex-wrap gap-3">
            {uploadState.map((img) => {
              return (
                <div key={img.public_id} className="position-relative">
                  <button
                    type="button"
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                    onClick={() => dispatch(deleteImg(img.public_id))}
                  ></button>
                  <img src={img.url} width={200} alt="" />
                </div>
              );
            })}
          </div>

          <button
            type="submit"
            className="btn btn-success border-4 rounded-3 my-5"
          >
            {getBlogId !== undefined ? "Editar" : "Añadir"} blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
