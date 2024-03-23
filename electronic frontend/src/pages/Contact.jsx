import React from "react";
import BreadCrum from "../components/BreadCrum";
import Meta from "../components/Meta";
import { IoMdHome } from "react-icons/io";
import { FaPhoneAlt, FaCalendarAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../components/CustomInput";
import { useDispatch } from "react-redux";
import { queryContact } from "../features/contact/contactSlice";

const Contact = () => {
  const dispatch = useDispatch();

  let schema = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido"),
    email: Yup.string()
      .email("El email no es valido")
      .required("El email es requerido"),
    mobile: Yup.string().required("El numero de telefono es requerido"),
    comment: Yup.string().required("El comentario es requerido"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      comment: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(
        queryContact({
          name: values.name,
          email: values.email,
          mobile: values.mobile,
          comment: values.comment,
        })
      );
    },
  });

  return (
    <div>
      <BreadCrum title="Contactos" />
      <Meta title="Contactos" />

      <section className="container my-16 flex flex-col gap-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.5846758800158!2d-62.070996924421706!3d-31.42556709669517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95cad7e6da673169%3A0xd3a2c6bb73b89e67!2sParque%20Cincuentenario!5e0!3m2!1ses!2sar!4v1707679202882!5m2!1ses!2sar"
          className="w-full"
          height="450"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <div className=" bg-blanco shadow-lg p-4 flex gap-24">
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 p-4"
          >
            <h2 className="text-2xl font-semibold">Contacto</h2>

            <CustomInput
              placeholder="Nombre"
              type="text"
              className="w-[440px] bg-[#F7F7F5] h-10 px-5 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              name="name"
              value={formik.values.name}
              onCh={formik.handleChange}
              OnBl={formik.handleBlur}
            />

            <div className="error">
              {formik.touched.name && formik.errors.name ? (
                <div>{formik.errors.name}</div>
              ) : null}
            </div>

            <CustomInput
              placeholder="Email"
              type="text"
              className="w-[440px] bg-[#F7F7F5] h-10 px-5 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
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
              placeholder="Numero de telefono"
              type="text"
              className="w-[440px] bg-[#F7F7F5] h-10 px-5 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
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

            <textarea
              name="comment"
              cols="30"
              rows="3"
              className="w-[440px] bg-[#F7F7F5] h-10 px-5 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="Comentario"
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>

            <div className="error">
              {formik.touched.comment && formik.errors.comment ? (
                <div>{formik.errors.comment}</div>
              ) : null}
            </div>

            <button
              type="submit"
              className="bg-negro w-24 text-blanco self-start p-3 rounded-full"
            >
              Enviar
            </button>
          </form>
          <div>
            <h2 className="text-2xl font-semibold">
              Ponte en contacto con nosotros
            </h2>

            <ul className="mt-9">
              <li className="flex items-center gap-2">
                <IoMdHome color="#FF283F" size={25} />
                <address className="text-lg mt-1">
                  2405, San Francisco, Córdoba
                </address>
              </li>
              <li className="flex items-center gap-3 mt-2">
                <FaPhoneAlt color="#FF283F" size={19} />
                <a className="text-lg mt-1" href="(+54) 9 3564 40-8281">
                  (+54) 9 3564 40-8281
                </a>
              </li>
              <li className="flex items-center gap-2 mt-2">
                <MdEmail color="#FF283F" size={22} />
                <a className="text-lg mt-1" href="mailto:crisludue5@gmail.com">
                  crisludue5@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 mt-2">
                <FaCalendarAlt color="#FF283F" size={22} />
                <p className="text-lg mt-1">Abierto las 24 horas</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
