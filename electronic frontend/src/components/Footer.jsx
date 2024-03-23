import React from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaRegCopyright,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-rojo p-6"></footer>
      <footer className="w-full bg-negro p-10 border-y-2 border-gray-400">
        <section className="container flex justify-between items-start">
          <div className="text-blanco">
            <h2 className="text-2xl mb-3 font-semibold">Contactame</h2>

            <address className="w-44 mb-3">
              tienda de demostración AV. La Roioja 1944, Valle Maria Argentina,
              San Francisco (Cordoba)
            </address>

            <a href="" className="block mb-3">
              +54 9 3564 80-0583
            </a>

            <a href="">tutiendaelectronica@gmail.com</a>

            <div className="flex mt-3 gap-3">
              <a href="/" className="bg-[#5C5D5E] p-2 rounded-full">
                <FaTwitter size={20} color="white" />
              </a>
              <a href="/" className="p-2 rounded-full bg-[#5C5D5E]">
                <FaFacebookF size={20} color="white" />
              </a>
              <a href="/" className="bg-[#5C5D5E] p-2 rounded-full">
                <FaInstagram color="white" size={20} />
              </a>
              <a href="/" className="bg-[#5C5D5E] p-2 rounded-full">
                <FaYoutube color="white" size={20} />
              </a>
            </div>
          </div>
          <div className="text-blanco flex flex-col gap-3">
            <h2 className="text-2xl mb-3 font-semibold">Informacion</h2>

            <Link to="/privacy-policy">política de privacidad</Link>
            <Link to="/refund-policy">politica de reembolso</Link>
            <Link to="/shipping-policy">politica de compras</Link>
            <Link to="/term-condition">términos de servicio</Link>
            <Link to="/">Blogs</Link>
          </div>

          <div className="text-blanco flex flex-col gap-3">
            <h2 className="text-2xl mb-3 font-semibold">Cuenta</h2>
            <Link to="/">Buscar</Link>
            <Link to="/">Sobre mi</Link>
            <Link to="/">Preguntas mas frecuentes</Link>
            <Link to="/">Contacto</Link>
            <Link to="/">Carta de tamaño</Link>
          </div>

          <div className="text-blanco flex flex-col gap-3">
            <h2 className="text-2xl mb-3 font-semibold">Enlaces rapidos</h2>
            <Link to="/">Accesorios</Link>
            <Link to="/">portátiles</Link>
            <Link to="/">auriculares</Link>
            <Link to="/">relojes inteligentes</Link>
            <Link to="/">Tabletas</Link>
          </div>
        </section>
      </footer>
      <footer className="w-full flex justify-center items-center gap-3 bg-negro p-5 text-blanco border-y-gray-400">
        <FaRegCopyright />
        <p>2024, Creado por Cristian Ludueña</p>
      </footer>
    </>
  );
};

export default Footer;
