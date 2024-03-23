import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createdBrand,
  getBrand,
  resetState,
  updatedBrand,
} from "../features/brand/brandSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddBrand = () => {
  const dispatch = useDispatch();
  const brandState = useSelector((state) => state.brand);
  const navigate = useNavigate();

  // esto me sirve para ver que me mandan de otras paginas por ejemplo una id
  const location = useLocation();
  const getBrandId = location.pathname.split("/")[3];
  const { isError, isLoading, isSuccess, createBrand, brandName, updateBrand } =
    brandState;

  // Si existe un id mostrame los valores y la primera carga cambia el valor de la id
  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getBrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  let schema = Yup.object().shape({
    title: Yup.string().required("La marca del producto es requerido"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // Si es diferente a undefined actualiza
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: values };

        dispatch(updatedBrand(data));
      } else {
        // de lo contrario elimina
        dispatch(createdBrand(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  useEffect(() => {
    if (isSuccess && createBrand) {
      toast.success("Producto agregado correctamente");
    }

    if (isSuccess && updateBrand) {
      toast.success("Producto actualizado correctamente");
      navigate("/admin/list-brand");
    }

    if (isError) {
      toast.error("Error no se pudo agregar el producto");
    }
  }, [isError, isLoading, isSuccess]);

  return (
    <div>
      <h3 className="mb-3 title">
        {getBrandId !== undefined ? "editar" : "añadir"} marcas de productos
      </h3>

      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            name="title"
            val={formik.values.title}
            type="text"
            label="Ingresa el nombre del producto"
          />

          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>

          <button
            type="submit"
            className="btn btn-success border-4 rounded-3 my-5"
          >
            {getBrandId !== undefined ? "editar" : "añadir"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
