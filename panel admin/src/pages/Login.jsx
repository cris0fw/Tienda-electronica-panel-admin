import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let schema = Yup.object().shape({
    email: Yup.string()
      .email("El email no es valido")
      .required("el email es requerido"),
    password: Yup.string().required("la contraseña es requerida"),
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

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user !== null || isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isLoading, isError, isSuccess, message]);

  return (
    <div className="py-3" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-3 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Login</h3>
        <p className="text-center">inicie sesión en su cuenta para continuar</p>

        <div className="error text-center">
          {message.message == "Rejected" ? "No eres admin" : ""}
        </div>

        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="ingrese su email"
            id="email"
            name="email"
            val={formik.values.email}
            onCh={formik.handleChange}
          />

          <div className="error">
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>

          <CustomInput
            type="password"
            label="ingrese su contraseña"
            id="contraseña"
            name="password"
            val={formik.values.password}
            onCh={formik.handleChange}
          />

          <div className="error">
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="mb-3 text-end">
            <Link to="/forgot-password">¿Has olvidado tu contraseña?</Link>
          </div>

          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            type="submit"
            style={{ background: "#ffd333" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
