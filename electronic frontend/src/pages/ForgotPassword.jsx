import React from "react";
import BreadCrum from "../components/BreadCrum";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../features/user/userSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  let schema = Yup.object().shape({
    email: Yup.string()
      .email("El email no es valido")
      .required("El email es requerido"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(forgetPassword(values));
    },
  });

  return (
    <div>
      <BreadCrum title="Cambiar contraseña" />
      <Meta title="Cambiar contraseña" />

      <div className="container my-16 flex justify-center">
        <div className="p-4 bg-blanco w-[500px]">
          <h2 className="text-center font-bold text-lg mb-3">
            ¿Olvidaste tu contraseña?
          </h2>

          <p className="text-center text-sm mb-3">
            Le enviaremos un correo electrónico para restablecer su contraseña.
          </p>

          <form
            onSubmit={formik.handleSubmit}
            action=""
            className="flex flex-col gap-3 mb-3"
          >
            <CustomInput
              className="px-5 w-full h-10 bg-[#F7F7F5] rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              type="email"
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onCh={formik.handleChange}
              OnBl={formik.handleBlur}
            />

            <div className="error">
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="w-full flex justify-center gap-3">
              <button
                type="submit"
                className="bg-negro w-28 mt-1 text-blanco self-start p-3 rounded-full hover:bg-[#DDDDDB] hover:text-negro"
              >
                Cambiar
              </button>
              <Link
                to="/login"
                className="bg-rojo text-center w-28 mt-1 text-blanco self-start p-3 rounded-full hover:bg-[#DDDDDB] hover:text-negro"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
