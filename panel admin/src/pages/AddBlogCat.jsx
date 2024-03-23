import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createCategoryBlog,
  getBlogCategory,
  resetState,
  updatedBlogCategory,
} from "../features/blogCategory/blogCategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const AddBlogCat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const getCategoryBlogId = location.pathname.split("/")[3];

  const categoryBlogState = useSelector((state) => state.categoryBlog);

  const {
    isError,
    isLoading,
    isSuccess,
    createdCategoryBlog,
    categoryBlogName,
    categoryBlogUpdated,
  } = categoryBlogState;

  useEffect(() => {
    if (getCategoryBlogId !== undefined) {
      dispatch(getBlogCategory(getCategoryBlogId));
    } else {
      dispatch(resetState());
    }
  }, [getCategoryBlogId]);

  let schema = Yup.object().shape({
    title: Yup.string().required("La categoria del blog es requerido"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryBlogName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCategoryBlogId !== undefined) {
        const data = { id: getCategoryBlogId, blogCategory: values };
        dispatch(updatedBlogCategory(data));
      } else {
        dispatch(createCategoryBlog(values));
        formik.resetForm;

        // En 3 segundos me lleva a la pagina de lista de productos
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      }
    },
  });

  useEffect(() => {
    if (isSuccess && createdCategoryBlog) {
      toast.success("Categoria del blog agregado correctamente");
    }

    if (isSuccess && categoryBlogUpdated) {
      toast.success("Categoria del blog actualizado correctamente");
      navigate("/admin/blog-category-list");
    }

    if (isError) {
      toast.error("Error no se pudo agregar la categoria del blog");
    }
  }, [isError, isLoading, isSuccess, createdCategoryBlog]);

  return (
    <div>
      <h3 className="mb-3 title">
        {getCategoryBlogId !== undefined ? "Editar" : "Añadir"} categoria de
        blog
      </h3>

      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Ingrese la categoria del blog"
            onCh={formik.handleChange("title")}
            onBl={formik.handleChange("title")}
            name="title"
            val={formik.values.title}
          />

          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>

          <button
            type="submit"
            className="btn btn-success border-4 rounded-3 my-5"
          >
            {getCategoryBlogId !== undefined ? "Editar" : "Añadir"} categoria
            del blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCat;
