import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createProduct,
  getColor,
  resetState,
  updatedColor,
} from "../features/color/colorSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const AddColor = () => {
  const colorState = useSelector((state) => state.color);

  const {
    isError,
    isLoading,
    isSuccess,
    createdColor,
    colorName,
    colorUpdated,
  } = colorState;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const getColorId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId]);

  let schema = Yup.object().shape({
    title: Yup.string().required("El color del producto es requerido"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: values };
        dispatch(updatedColor(data));
        console.log(colorUpdated);
      } else {
        dispatch(createProduct(values));
        formik.resetForm();

        // En 3 segundos me lleva a la pagina de lista de productos
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      }
    },
  });

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color agregado correctamente");
    }

    if (isSuccess && colorUpdated) {
      toast.success("Color actualizado correctamente");
      navigate("/admin/list-color");
    }

    if (isError) {
      toast.error("Error no se pudo agregar el color");
    }
  }, [isError, isLoading, isSuccess]);

  return (
    <div>
      <h3 className="mb-3 title">Añadir color</h3>

      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Ingrese color"
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
            Añadir color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
