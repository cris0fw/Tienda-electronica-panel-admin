import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createCoupons,
  getCoupon,
  resetState,
  updatedCoupon,
} from "../features/cuopon/couponSlice";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const AddCoupon = () => {
  const couponState = useSelector((state) => state.coupon);
  const {
    isError,
    isLoading,
    isSuccess,
    createCoupon,
    couponName,
    couponExpiry,
    couponDiscount,
    couponUpdated,
  } = couponState;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCouponId = location.pathname.split("/")[3];

  // vamos a convertir en fecha el couponExpiry
  const changeDateFormat = (data) => {
    const date = new Date(data);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getCoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId]);

  let schema = Yup.object().shape({
    name: Yup.string().required("El cupon es requerido"),
    expiry: Yup.date().required("La fecha de expiracion es requerida"),
    discount: Yup.number().required("El descuento es requerido"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      expiry: changeDateFormat(couponExpiry) || "",
      discount: couponDiscount || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updatedCoupon(data));
      } else {
        dispatch(createCoupons(values));
        formik.resetForm();

        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      }
    },
  });

  useEffect(() => {
    if (isSuccess && createCoupon) {
      toast.success("Producto agregado correctamente");
    }

    if (isSuccess && couponUpdated) {
      toast.success("Cupon agregado correctamente");
      navigate("/admin/coupon-list");
    }

    if (isError) {
      toast.error("Error no se pudo agregar el producto");
    }
  }, [isError, isLoading, isSuccess, createCoupon, couponUpdated]);

  return (
    <div>
      <h3 className="mb-3 title">
        {getCouponId !== undefined ? "Editar" : "Añadir"} cupones
      </h3>

      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Ingresa el cupon del producto"
            onCh={formik.handleChange("name")}
            onBl={formik.handleChange("name")}
            name="name"
            val={formik.values.name}
          />

          <div className="error mb-3">
            {formik.touched.name && formik.errors.name}
          </div>

          <CustomInput
            type="date"
            label="Ingresa la fecha de expiracion"
            onCh={formik.handleChange("expiry")}
            onBl={formik.handleChange("expiry")}
            name="expiry"
            val={formik.values.expiry}
          />

          <div className="error mb-3">
            {formik.touched.expiry && formik.errors.expiry}
          </div>

          <CustomInput
            type="number"
            label="Ingresa el descuento"
            onCh={formik.handleChange("discount")}
            onBl={formik.handleChange("discount")}
            name="discount"
            val={formik.values.discount}
          />

          <div className="error mb-3">
            {formik.touched.discount && formik.errors.discount}
          </div>

          <button
            type="submit"
            className="btn btn-success border-4 rounded-3 my-5"
          >
            {getCouponId !== undefined ? "Editar" : "Añadir"} marcas
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
