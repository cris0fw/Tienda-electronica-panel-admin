import React, { useEffect } from "react";
import BreadCrum from "../components/BreadCrum";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/user/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();

  let schema = Yup.object().shape({
    email: Yup.string()
      .email("El email es invalido")
      .required("El email es requerido"),
    password: Yup.string().required("La contraseña es requerida"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  useEffect(() => {
    if (authState.user !== null && authState.isError === false) {
      navigate("/");
    }
  }, [authState]);

  return (
    <div>
      <BreadCrum title="Login" />
      <Meta title="Login" />

      <div className="container my-16 flex justify-center items-center">
        <div className="p-4 bg-blanco w-[500px]">
          <h2 className="text-center font-bold text-lg mb-3">Login</h2>

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

            <Link to="/forgot-password" className="text-[#00438A]">
              ¿Has olvidado tu contraseña?
            </Link>

            <div className="w-full mt-5 flex justify-center gap-3">
              <button
                type="submit"
                className="bg-negro w-28 text-blanco self-start p-3 rounded-full hover:bg-[#DDDDDB] hover:text-negro"
              >
                Entrar
              </button>
              <Link
                to="/register"
                className="bg-rojo w-28 text-blanco self-start p-3 rounded-full hover:bg-[#DDDDDB] hover:text-negro"
              >
                Registrarse
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
