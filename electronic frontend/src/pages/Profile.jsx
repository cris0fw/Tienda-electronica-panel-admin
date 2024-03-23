import React, { useState } from "react";
import BreadCrum from "../components/BreadCrum";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../features/user/userSlice";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  const userState = useSelector((state) => state.auth.user.data);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(true);

  let schema = Yup.object().shape({
    nombre: Yup.string().required("El nombre es requerido"),
    apellido: Yup.string().required("El apellido es requerido"),
    email: Yup.string()
      .email("El email no es valido")
      .required("El email es requerido"),
    mobile: Yup.string().required("El numero telefonico es requerido"),
  });

  const formik = useFormik({
    initialValues: {
      nombre: userState?.nombre,
      apellido: userState?.apellido,
      email: userState?.email,
      mobile: userState?.mobile,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(updateUser(values));
      setEdit(true);
    },
  });

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <BreadCrum title="Mi perfil" />

      <section className="container my-16 flex justify-around">
        <div className=" w-[50%]">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Actualizar datos del usuario</h2>
            <FaEdit
              color="#EE1721"
              className="cursor-pointer"
              size={30}
              onClick={() => setEdit(false)}
            />
          </div>

          <form
            action=""
            className=" flex flex-col gap-4 mt-5 p-5 rounded-lg"
            onSubmit={formik.handleSubmit}
          >
            <CustomInput
              className="px-5 w-full h-10 bg-[#F7F7F5] rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              type="text"
              placeholder="Nombre"
              name="nombre"
              value={formik.values.nombre}
              onCh={formik.handleChange}
              OnBl={formik.handleBlur}
              disabled={edit}
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
              disabled={edit}
            />

            <div className="error">
              {formik.touched.apellido && formik.errors.apellido ? (
                <div>{formik.errors.apellido}</div>
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
              disabled={edit}
            />

            <div className="error">
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>

            <CustomInput
              className="px-5 w-full h-10 bg-[#F7F7F5] rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              type="text"
              placeholder="Telefono"
              name="mobile"
              value={formik.values.mobile}
              onCh={formik.handleChange}
              OnBl={formik.handleBlur}
              disabled={edit}
            />

            <div className="error">
              {formik.touched.mobile && formik.errors.mobile ? (
                <div>{formik.errors.mobile}</div>
              ) : null}
            </div>

            {edit === false && (
              <button
                type="submit"
                className="bg-[#EE1721] text-white self-start p-2  font-bold rounded-lg hover:bg-[#DDDDDB] hover:text-black"
              >
                Guardar Cambios
              </button>
            )}
          </form>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="bg-[#00438A] text-white p-2 font-bold rounded-xl"
          >
            Salir de la cuenta
          </button>
        </div>
      </section>
    </div>
  );
};

export default Profile;
