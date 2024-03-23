import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

const CheckOut = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.auth.getCartProduct) || [];
  const [total, setTotal] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].price;
      setTotal(sum);
    }
  }, [cartState]);

  let schema = Yup.object().shape({
    nombre: Yup.string().required("El nombre es requerido"),
    apellido: Yup.string().required("El apellido tiene que ser requerido"),
    address: Yup.string().required("La direccion tiene que ser requerida"),
    ciudad: Yup.string().required("La ciudad es requerida"),
    estado: Yup.string().required("El estado es requerido"),
    codigoPin: Yup.string().required("El codigo pin es requerido"),
    pais: Yup.string().required("El pais tiene que ser requerido"),
    other: Yup.string().required("El apartamento es requerido"),
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      address: "",
      ciudad: "",
      estado: "",
      codigoPin: "",
      pais: "",
      other: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      setShippingInfo(values);
    },
  });

  return (
    <div>
      <div className="container my-16 flex gap-4">
        {/* BARRA IZQUIERDA */}
        <div className="w-[700px] ">
          <h1 className="font-bold text-3xl">Cristian Ludueña</h1>

          {/* BreadCum */}
          <div className="flex gap-3 text-[#5C5D5E] text-lg mt-3">
            <Link to="/cart" className="text-[#5581B1]">
              Carrito
            </Link>
            /<p>Informacion</p> /<p>Envio</p> /<p>Pago</p>
          </div>

          <h1 className="font-bold text-3xl mt-3">Informacion De Contacto</h1>
          <p className="mt-3 font-medium">
            Cristian Ludueña (crisludue5@gmail.com)
          </p>

          {/* FORMULARIO */}
          <form
            onSubmit={formik.handleSubmit}
            action=""
            className="mt-3 w-full flex flex-col gap-3"
          >
            <select
              name="pais"
              value={formik.values.pais}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full bg-[#F7F7F5] h-10 px-5 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              <option value="select-country">Seleccionar país</option>
              <option value="Argentina">Argentina</option>
              <option value="Uruguay">Uruguay</option>
              <option value="Bolivia">Bolivia</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Chile">Chile</option>
              <option value="Brasil">Brasil</option>
              <option value="Peru">Peru</option>
              <option value="Venezuela">Venezuela</option>
              <option value="Ecuador">Ecuador</option>
              <option value="Colombia">Colombia</option>
            </select>

            <div className="error">
              {formik.touched.pais && formik.errors.pais ? (
                <div>{formik.errors.pais}</div>
              ) : null}
            </div>

            <div className="flex gap-3">
              <div className="w-[50%]">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  className="w-[330px] bg-[#F7F7F5] h-10 px-5 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                <div className="error">
                  {formik.touched.nombre && formik.errors.nombre ? (
                    <div>{formik.errors.nombre}</div>
                  ) : null}
                </div>
              </div>

              <div>
                <input
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  className="w-[330px] bg-[#F7F7F5] h-10 px-5 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                  value={formik.values.apellido}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                <div className="error">
                  {formik.touched.apellido && formik.errors.apellido ? (
                    <div>{formik.errors.apellido}</div>
                  ) : null}
                </div>
              </div>
            </div>

            <input
              type="text"
              name="address"
              placeholder="Direccion"
              className="w-full bg-[#F7F7F5] h-10 px-5 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <div className="error">
              {formik.touched.address && formik.errors.address ? (
                <div>{formik.errors.address}</div>
              ) : null}
            </div>

            <input
              type="text"
              name="other"
              value={formik.values.other}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Apartamento, suite, etc."
              className="w-full bg-[#F7F7F5] h-10 px-5 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            />

            <div className="error">
              {formik.touched.other && formik.errors.other ? (
                <div>{formik.errors.other}</div>
              ) : null}
            </div>

            <div className="flex gap-3">
              <div>
                <input
                  type="text"
                  name="ciudad"
                  placeholder="Ciudad"
                  className="w-[240px] bg-[#F7F7F5] h-10 px-5 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                  value={formik.values.ciudad}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                <div className="error">
                  {formik.touched.ciudad && formik.errors.ciudad ? (
                    <div>{formik.errors.ciudad}</div>
                  ) : null}
                </div>
              </div>

              <div>
                <select
                  name="estado"
                  className="w-[200px] bg-[#F7F7F5] h-10 px-5 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                  value={formik.values.estado}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="select-country">Seleccione estado</option>
                  <option value="cordoba">Cordoba</option>
                  <option value="bueno aires">Buenos Aires</option>
                  <option value="jujuy">Jujuy</option>
                  <option value="neuquen">Neuquen</option>
                  <option value="rosario">Rosario</option>
                  <option value="santa fe">Santa Fe</option>
                  <option value="corrientes">Corrientes</option>
                  <option value="chubut">Chubut</option>
                  <option value="tierra del fuego">Tierra del fuego</option>
                </select>
              </div>

              <div>
                <input
                  type="text"
                  name="codigoPin"
                  placeholder="Código postal"
                  className="w-[240px] bg-[#F7F7F5] h-10 px-5 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                  value={formik.values.codigoPin}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              <div className="error">
                {formik.touched.codigoPin && formik.errors.codigoPin ? (
                  <div>{formik.errors.codigoPin}</div>
                ) : null}
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <p className="flex items-center gap-2 text-lg font-semibold text-[#5C5D5E]">
                <IoMdArrowRoundBack /> Volver al carrito
              </p>

              <div className="flex gap-3">
                <Link
                  to="/cart"
                  className="bg-negro font-semibold p-4 text-blanco text-center rounded-full"
                >
                  Continuar con el envío
                </Link>
                <button
                  type="submit"
                  className="bg-[#EE1721] font-semibold p-4 text-blanco text-center rounded-full"
                >
                  Finalizar pedido
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* BARRA DERECHA */}
        <div className="w-full p-2">
          {/* Producto */}
          {cartState?.map((items) => {
            return (
              <div key={items?._id} className="w-full flex justify-between">
                <div className="flex gap-2">
                  <div className="relative">
                    <img
                      src={items?.productId?.images[0].url}
                      alt="Producto audicular"
                      className="w-[100px]"
                    />

                    <p className="bg-rojo w-6 text-center font-semibold text-blanco rounded-full absolute top-[-15px] right-[-5px]">
                      {items?.quantity}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-lg">
                      {items?.productId?.title}{" "}
                    </h2>
                    <p>{items?.color?.title}</p>
                  </div>
                </div>
                <h2 className="font-bold text-lg">
                  $ {items?.price * items?.quantity}
                </h2>
              </div>
            );
          })}
          {/* Total, subtotal */}
          <div className="w-full mt-16">
            <div className="flex justify-between items-center">
              <h2 className="text-lg">Subtotal</h2>
              <p className="text-lg">$ {total ? total : "0"}</p>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <h2 className="text-lg">Envio</h2>
              <p className="text-lg">1000</p>
            </div>
            <div className="mt-16 flex justify-between items-center">
              <h2 className="font-semibold">Total</h2>
              <p>${total ? total + 1000 : "0"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
