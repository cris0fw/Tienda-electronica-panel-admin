import React, { useEffect } from "react";
import BreadCrum from "../components/BreadCrum";
import Meta from "../components/Meta";
import CustomInput from "../components/CustomInput";
import { Navigate, useNavigate } from "react-router-dom";

// IMPORTAMOS FORMIK
import { useFormik } from "formik";
// IMPORTAMOS YUP
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
// importo mi funcionalidad desde el userSlice
import { register } from "../features/user/userSlice";

const Signop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  // HACEMOS EL ESQUEMA DE YUP
  let schema = Yup.object().shape({
    nombre: Yup.string().required("El nombre es requerido"),
    apellido: Yup.string().required("El apellido es requerido"),
    mobile: Yup.string().required("El numero de telefono es requerido"),
    email: Yup.string()
      .email("El email no es valido")
      .required("El email es requerido"),
    password: Yup.string().required("La contraseña es requerida"),
  });

  // USAMOS LA LIBRERIA DE FORMIK
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      mobile: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(register(values));
    },
  });

  useEffect(() => {
    if (authState.isSuccess) {
      navigate("/login");
    }
  }, [authState.isSuccess, navigate]);

  return (
    <div>
      <BreadCrum title="registrarse" />
      <Meta title="Registrarse" />

      <div className="container my-16 flex justify-center">
        <div className="p-4 bg-blanco w-[500px]">
          <h2 className="text-center font-bold text-lg mb-3">Crear cuenta</h2>

          <form
            action=""
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3 mb-3"
          >
            <CustomInput
              className="px-5 w-full h-10 bg-[#F7F7F5] rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              type="text"
              placeholder="Nombre"
              name="nombre"
              value={formik.values.nombre}
              onCh={formik.handleChange}
              OnBl={formik.handleBlur}
            />

            <div className="error">
              {formik.touched.nombre && formik.errors.nombre ? (
                <div>{formik.errors.nombre}</div>
              ) : null}
            </div>

            <CustomInput
              className="px-5 w-full h-10 bg-[#F7F7F5] rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              type="text"
              placeholder="Apellido"
              name="apellido"
              value={formik.values.apellido}
              onCh={formik.handleChange}
              OnBl={formik.handleBlur}
            />

            <div className="error">
              {formik.touched.apellido && formik.errors.apellido ? (
                <div>{formik.errors.apellido}</div>
              ) : null}
            </div>

            <CustomInput
              className="px-5 w-full h-10 bg-[#F7F7F5] rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              type="text"
              placeholder="Numero de telefono"
              name="mobile"
              value={formik.values.mobile}
              onCh={formik.handleChange}
              OnBl={formik.handleBlur}
            />

            <div className="error">
              {formik.touched.mobile && formik.errors.mobile ? (
                <div>{formik.errors.mobile}</div>
              ) : null}
            </div>

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

            <CustomInput
              className="px-5 w-full h-10 bg-[#F7F7F5] rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              type="password"
              placeholder="Contraseña"
              name="password"
              value={formik.values.password}
              onCh={formik.handleChange}
              OnBl={formik.handleBlur}
            />

            <div className="error">
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="w-full mt-5 flex justify-center gap-3">
              <button
                type="submit"
                className="bg-negro w-32 text-blanco self-start p-3 rounded-full hover:bg-[#DDDDDB] hover:text-negro"
              >
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signop;
