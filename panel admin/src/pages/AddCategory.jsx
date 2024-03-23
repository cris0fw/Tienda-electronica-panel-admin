import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import {
  createdCategory,
  getCategories,
  resetState,
  updatedCategory,
} from "../features/category/categorySlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const AddCategory = () => {
  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.category);
  const navigate = useNavigate();

  const location = useLocation();
  const getCategoryId = location.pathname.split("/")[3];

  const {
    isError,
    isLoading,
    isSuccess,
    createCategory,
    categoryName,
    categoryUpdated,
  } = categoryState;

  useEffect(() => {
    if (getCategoryId !== undefined) {
      dispatch(getCategories(getCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getCategoryId]);

  let schema = Yup.object().shape({
    title: Yup.string().required("La categoria del producto es requerida"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCategoryId !== undefined) {
        const data = { id: getCategoryId, categoryData: values };

        dispatch(updatedCategory(data));
      } else {
        dispatch(createdCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      }
    },
  });

  useEffect(() => {
    if (isSuccess && createCategory) {
      toast.success("Producto agregado correctamente");
    }

    if (isSuccess && categoryUpdated) {
      toast.success("categoria del producto actualizado correctamente");
      navigate("/admin/list-category");
    }

    if (isError) {
      toast.error("Error no se pudo agregar el producto");
    }
  }, [isError, isLoading, isSuccess]);

  return (
    <div>
      <h3 className="mb-3 title">
        {getCategoryId !== undefined ? "editar" : "Añadir"} categorias de
        productos
      </h3>

      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Ingrese la categoria del producto"
            name="title"
            val={formik.values.title}
            onBl={formik.handleBlur("title")}
            onCh={formik.handleChange("title")}
          />

          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>

          <button
            type="submit"
            className="btn btn-success border-4 rounded-3 my-5"
          >
            {getCategoryId !== undefined ? "Editar" : "Añadir"} categorias
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
