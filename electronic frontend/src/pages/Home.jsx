import React, { useEffect, useState } from "react";
import {
  imagenOne,
  imagenTwo,
  miniImagenOne,
  miniImagenTwo,
  miniImagenThee,
  miniImagenFor,
  camion,
  regalo,
  audiculares,
  precios,
  seguridad,
  notebook,
  camara,
  tv,
  reloj,
  joystick,
  telefonos,
  audicular,
  accesorios,
  aireAcondicionado,
  electrodomesticos,
  logoAsus,
  logoBgh,
  logoDrean,
  logoEscorial,
  logoFlorencia,
  logoHisense,
  logoLenovo,
  logoLg,
  logoNoblex,
  logoPhilips,
  logoSamsung,
  logoWhirlpool,
  logoXiaomi,
} from "../utils/images.js";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ProductEspecial from "../components/ProductEspecial.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../features/product/productSlice.jsx";
import { getAllBlogs } from "../features/blogs/blogSlice.jsx";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [imagenOne, imagenTwo];
  const dispatch = useDispatch();

  const productState = useSelector((state) => state.product.product);
  const blogState = useSelector((state) => state.blog.blog);
  const blogRecorted = blogState.slice(0, 5);

  useEffect(() => {
    getProducts();
    getBlogs();
  }, []);

  const getProducts = () => {
    dispatch(getAllProducts());
  };

  const getBlogs = () => {
    dispatch(getAllBlogs());
  };

  return (
    <div className="font-principal">
      {/* SLIDER */}
      <section className="flex container my-8">
        <div className="w-2/4 p-4">
          <div className="overflow-hidden rounded-md relative">
            <img
              src={images[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              className="w-full h-auto"
            />

            {currentSlide === 0 ? (
              <div className="absolute top-20 left-10">
                <h2 className="text-3xl font-semibold mb-3">Audífonos Sony</h2>
                <p className="text-lg mb-3">
                  Ahora no pararás de escuchar música
                </p>
                <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
                  Comprar ahora
                </button>
              </div>
            ) : (
              <div className="absolute top-20 left-10 text-white">
                <h2 className="text-3xl font-semibold mb-3">Iphone 14</h2>
                <p className="text-lg mb-3 w-96">
                  Con mas funcionalidades! fotos de calidad, bateria extra,
                  memoria extensa y mucho mas
                </p>
                <button className="bg-rojo hover:bg-[#FF6F7F] text-white font-bold py-2 px-4 rounded">
                  Comprar ahora
                </button>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 flex justify-center mt-2">
              {images.map((_, index) => (
                <span
                  key={index + 1}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 w-2 bg-gray-500 p-2 mx-1 mb-[30px] rounded-full cursor-pointer ${
                    currentSlide === index ? "bg-gray-800" : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-2/4 flex flex-wrap gap-3 mt-4">
          <div className="relative">
            <img src={miniImagenOne} className="w-[290px] h-[178px]" alt="" />
            <div className="absolute top-10 left-5 text-blanco">
              <p className="mb-1 text-orange-500 font-bold">Mejor venta</p>
              <h2 className="font-semibold mb-1">Asus VivoBook</h2>
              <p className="text-sm w-24">De 749.999$ a 800.000$</p>
            </div>
          </div>
          <div className="relative">
            <img src={miniImagenTwo} className="w-[290px] h-[178px]" alt="" />
            <div className="absolute top-10 left-5 text-blanco">
              <p className="mb-1 text-negro font-bold">Mejor venta</p>
              <h2 className="font-semibold mb-1">Apple iPad </h2>
              <p className="text-sm w-24">De 444.226$ a 650.000$</p>
            </div>
          </div>
          <div className="relative">
            <img src={miniImagenThee} className="w-[290px] h-[178px]" alt="" />
            <div className="absolute top-10 left-5 text-blanco">
              <p className="mb-1 text-negro font-bold">Nueva llegada</p>
              <h2 className="font-semibold mb-1">Sony PlayStation 5 </h2>
              <p className="text-sm w-24">
                De 1.082.999$
                <span className="font-semibold text-lime-700"> 5% OFF</span>
              </p>
            </div>
          </div>
          <div className="relative">
            <img src={miniImagenFor} className="w-[290px] h-[178px]" alt="" />
            <div className="absolute top-3 left-5 text-blanco">
              <p className="mb-1 text-negro font-bold">Nueva llegada</p>
              <h2 className="font-semibold mb-1">
                Kit Gaming Teclado Membrana Rainbow + Mouse Gamer
              </h2>
              <p className="text-sm w-24">Apoya celular a $36.499</p>
            </div>
          </div>
        </div>
      </section>
      {/* CARACTERISTICAS */}
      <section className="container my-8 flex justify-between">
        <div className="flex items-center gap-3">
          <img src={camion} className="w-12" alt="camion" />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">Envio gratis</h2>
            <p className="w-36 text-sm">
              de todos los pedidos superiores a $1000
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <img src={regalo} className="w-12" alt="regalo" />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">ofertas divertidas</h2>
            <p className="w-36 text-sm">ahorra hasta un 25% de descuento</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <img src={audiculares} className="w-12" alt="audicular" />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">soporte 24/7</h2>
            <p className="w-36 text-sm">comprar con un experto</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <img src={precios} className="w-12" alt="Precios" />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">Precios asequibles</h2>
            <p className="w-36 text-sm">obtener precio directo de fábrica</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <img src={seguridad} className="w-12" alt="Seguridad" />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">Pagos seguros</h2>
            <p className="w-36 text-sm">Pagos 100% protegidos</p>
          </div>
        </div>
      </section>
      {/* CATEGORIAS */}
      <section className="container my-8 bg-blanco shadow-lg flex justify-center gap-3 flex-wrap">
        <div className="w-[250px] flex justify-evenly items-center gap-2 p-4">
          <div>
            <h2 className="text-sm font-semibold">Computadoras y notebooks</h2>
            <p className="text-xs text-[#AAAAA8] mt-2">8 items</p>
          </div>
          <img src={notebook} className="w-20" alt="notebooks" />
        </div>

        <div className="w-[230px] flex justify-evenly items-center gap-2 p-4">
          <div>
            <h2 className="text-sm font-semibold">Camara y videos</h2>
            <p className="text-xs text-[#AAAAA8] mt-2">10 items</p>
          </div>
          <img src={camara} className="w-24" alt="notebooks" />
        </div>

        <div className="w-[230px] flex justify-evenly items-center gap-2 p-4">
          <div>
            <h2 className="text-sm font-semibold">Television</h2>
            <p className="text-xs text-[#AAAAA8] mt-2">12 items</p>
          </div>
          <img src={tv} className="w-36" alt="notebooks" />
        </div>

        <div className="w-[230px] flex justify-evenly items-center gap-2 p-4">
          <div>
            <h2 className="text-sm font-semibold">Relojes</h2>
            <p className="text-xs text-[#AAAAA8] mt-2">13 items</p>
          </div>
          <img src={reloj} className="w-24" alt="notebooks" />
        </div>

        <div className="w-[230px] flex justify-evenly items-center gap-2 p-4">
          <div>
            <h2 className="text-sm font-semibold">Musica y Juegos</h2>
            <p className="text-xs text-[#AAAAA8] mt-2">4 items</p>
          </div>
          <img src={joystick} className="w-24" alt="notebooks" />
        </div>

        <div className="w-[230px] flex justify-evenly items-center gap-2 p-4">
          <div>
            <h2 className="text-sm font-semibold">Telefonos y Tablets</h2>
            <p className="text-xs text-[#AAAAA8] mt-2">5 items</p>
          </div>
          <img src={telefonos} className="w-24" alt="notebooks" />
        </div>

        <div className="w-[230px] flex justify-evenly items-center gap-2 p-4">
          <div>
            <h2 className="text-sm font-semibold">Audiculares</h2>
            <p className="text-xs text-[#AAAAA8] mt-2">6 items</p>
          </div>
          <img src={audicular} className="w-24" alt="notebooks" />
        </div>

        <div className="w-[230px] flex justify-evenly items-center gap-2 p-4">
          <div>
            <h2 className="text-sm font-semibold">Accesorios</h2>
            <p className="text-xs text-[#AAAAA8] mt-2">10 items</p>
          </div>
          <img src={accesorios} className="w-24" alt="notebooks" />
        </div>

        <div className="w-[230px] flex justify-evenly items-center gap-2 p-4">
          <div>
            <h2 className="text-sm font-semibold">air conditioning</h2>
            <p className="text-xs text-[#AAAAA8] mt-2">8 items</p>
          </div>
          <img src={aireAcondicionado} className="w-24" alt="notebooks" />
        </div>

        <div className="w-[230px] flex justify-evenly items-center gap-2 p-4">
          <div>
            <h2 className="text-sm font-semibold">Home appliances</h2>
            <p className="text-xs text-[#AAAAA8] mt-2">6 items</p>
          </div>
          <img src={electrodomesticos} className="w-24" alt="notebooks" />
        </div>
      </section>
      {/* PRODUCTOS POPULARES */}
      <section className="container my-20">
        <h2 className="text-2xl my-6 font-extrabold">Colección destacada</h2>

        <div className="flex gap-3">
          {productState &&
            productState
              .filter((items) => items.tags === "presentado")
              .slice(0, 5)
              .map((items) => {
                return <ProductCard data={items} key={items._id} />;
              })}
        </div>
      </section>
      {/* OTRA SECCION ESPECIAL */}
      <section className="container my-20 flex justify-start gap-4">
        <div className="w-[320px] h-[430px] rounded shadow-lg bg-bordo flex flex-wrap justify-center items-center">
          <div className="p-4 w-full">
            <p className="font-medium text-sm mb-2 text-[#AAAAA8]">Sony</p>
            <h2 className="text-2xl font-semibold mb-2 text-blanco">
              Play Station 5
            </h2>
            <p className="text-sm text-[#AAAAA8]">
              Aprovecha su precio ahora $1.082.999$
            </p>
          </div>
          <img
            className="w-52"
            src="https://i.ibb.co/9tC6t0b/play-5.png"
            alt="play station 5"
          />
        </div>

        <div className="w-[320px] h-[430px] rounded shadow-lg bg-blanco flex flex-wrap justify-center items-center">
          <div className="p-4 w-full">
            <p className="font-medium text-sm mb-2 text-[#5C5D5E]">Asus</p>
            <h2 className="text-2xl font-semibold mb-2 text-negro">
              Notebook Asus E410 Celeron
            </h2>
            <p className="text-sm text-[#5C5D5E]">
              14" 4GB 128SSD blanca a tan solo a $ 545.999
            </p>
          </div>
          <img
            className="w-52"
            src="https://i.ibb.co/fF37kpr/asus-e410ma-bv1181w-2.webp"
            alt="play station 5"
          />
        </div>

        <div className="w-[320px] h-[430px] rounded shadow-lg bg-blanco flex flex-wrap justify-center items-center">
          <div className="p-4 w-full">
            <p className="font-medium text-sm mb-2 text-[#5C5D5E]">Samsung </p>
            <h2 className="text-2xl font-semibold mb-2 text-negro">
              Lavarropas Samsung WW95AA046BXUBG
            </h2>
            <p className="text-sm text-[#5C5D5E]">
              9.5 kg 1400RPM Inverter solo a $ 899.999
            </p>
          </div>
          <img
            className="w-36"
            src="https://i.ibb.co/rpYD8jg/lavarropas.webp"
            alt="play station 5"
          />
        </div>

        <div className="w-[320px] h-[430px] rounded shadow-lg bg-blanco flex flex-wrap justify-center items-center">
          <div className="p-4 w-full">
            <p className="font-medium text-sm mb-2 text-[#5C5D5E]">Samsung </p>
            <h2 className="text-2xl font-semibold mb-2 text-negro">
              Cocina Florencia 5516 F Blanca
            </h2>
            <p className="text-sm text-[#5C5D5E]"></p>
          </div>
          <img
            className="w-56"
            src="https://i.ibb.co/N9x1ntS/lb2776-1-1.webp"
            alt="play station 5"
          />
        </div>
      </section>
      {/* ESPECIAL PRODUCTOS */}
      <section className="container my-20">
        <h2 className="text-2xl my-6 font-extrabold">
          Nuestros productos populares
        </h2>

        <div className="flex gap-4 justify-start flex-wrap">
          {productState &&
            productState?.map((items) => {
              if (items.tags === "especial") {
                return <ProductEspecial data={items} key={items._id} />;
              }
            })}
        </div>
      </section>
      {/* PRODUCTOS POPULARES */}
      <section className="container my-20">
        <h2 className="text-2xl my-6 font-extrabold">Productos populares</h2>

        <div className="flex gap-3">
          {productState &&
            productState
              .filter((items) => items.tags === "popular")
              .slice(0, 5)
              .map((items) => {
                return <ProductCard data={items} key={items._id} />;
              })}
        </div>
      </section>

      {/* MARCAS */}
      <section className="container my-8">
        <Marquee>
          <img src={logoAsus} className="w-56" alt="logo de asus" />
          <img src={logoBgh} className="w-32 ml-12" alt="logo de bgh" />
          <img src={logoDrean} className="w-56 ml-12" alt="logo de bgh" />
          <img src={logoEscorial} className="w-52 ml-12" alt="logo de bgh" />
          <img src={logoFlorencia} className="w-52 ml-12" alt="logo de bgh" />
          <img src={logoHisense} className="w-52 ml-12" alt="logo de bgh" />
          <img src={logoLenovo} className="w-52 ml-12" alt="logo de bgh" />
          <img src={logoLg} className="w-32 ml-12" alt="logo de bgh" />
          <img src={logoNoblex} className="w-52 ml-12" alt="logo de bgh" />
          <img src={logoPhilips} className="w-52 ml-12" alt="logo de bgh" />
          <img src={logoSamsung} className="w-52 ml-12" alt="logo de bgh" />
          <img src={logoWhirlpool} className="w-52 ml-12" alt="logo de bgh" />
          <img
            src={logoXiaomi}
            className="w-52 ml-12 me-12"
            alt="logo de bgh"
          />
        </Marquee>
      </section>
      {/* BLOGS */}
      <section className="container my-8">
        <h2 className="text-2xl my-6 font-extrabold">
          Nuestras ultimas noticias
        </h2>

        <div className="flex gap-4">
          {blogRecorted.map((items) => {
            return <BlogCard data={items} key={items._id} />;
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
