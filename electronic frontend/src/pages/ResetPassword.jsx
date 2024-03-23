import React from "react";
import BreadCrum from "../components/BreadCrum";
import Meta from "../components/Meta";
import CustomInput from "../components/CustomInput";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { resetpassword } from "../features/user/userSlice";

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    password: Yup.string().required("La contraseña es requerida"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(resetpassword({ token, password: values.password }));
    },
  });

  return (
    <div>
      <BreadCrum title="Restablecer contraseña" />
      <Meta title="Restablecer contraseña" />

      <div className="container my-16 flex justify-center">
        <div className="p-4 bg-blanco w-[500px]">
          <h2 className="text-center font-bold text-lg mb-3">
            Restablecer contraseña
          </h2>

          <form
            onSubmit={formik.handleSubmit}
            action=""
            className="flex flex-col gap-3 mb-3"
          >
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
                className="bg-negro w-28 text-blanco self-start p-3 rounded-full hover:bg-[#DDDDDB] hover:text-negro"
              >
                Ok
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
