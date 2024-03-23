import React, { useEffect, useState } from "react";
import BreadCrum from "../components/BreadCrum";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import ImageZoom from "react-image-zooom";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaCodeCompare } from "react-icons/fa6";
import ProductCard from "../components/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import {
  addRating,
  getAllProducts,
  getSingleProduct,
} from "../features/product/productSlice";
import { toast } from "react-toastify";
import { addToCart, getCart } from "../features/user/userSlice";

const SingleProduct = () => {
  const [resena, setResena] = useState(true);
  const [popularProduct, setPopularProduct] = useState([]);
  const [alreadyAdded, setAlreadyAded] = useState(false);
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const productState = useSelector((state) => state.product.product);
  const singleState = useSelector((state) => state.product.singleProduct);
  const cartState = useSelector((state) => state.auth.getCartProduct) || [];
  // const productRecorted = productState.slice(0, 5);

  const getProducts = () => {
    dispatch(getAllProducts());
    dispatch(getCart());
  };

  const addCart = () => {
    if (color === null) {
      toast.error("por favor elige el color");
      return false;
    } else {
      dispatch(
        addToCart({
          productId: singleState?._id,
          quantity,
          price: singleState?.price,
          color,
        })
      );
      navigate("/cart");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, []);

  useEffect(() => {
    for (let index = 0; index < cartState.length; index++) {
      if (id === cartState[index]?.productId?._id) {
        setAlreadyAded(true);
      }
    }
  }, []);

  useEffect(() => {
    let data = [];

    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      if (element.tags === "popular") {
        data.push(element);
      }
      setPopularProduct(data);
    }
  }, [productState]);

  const copyToClipBoard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const [star, setStart] = useState(null);
  const [comment, setComment] = useState(null);

  const addRatingToProduct = () => {
    if (star === null) {
      toast.error("por favor agregue calificación de estrellas");
    } else if (comment === null) {
      toast.error("por favor escriba una reseña sobre el producto");
    } else {
      dispatch(addRating({ star: star, comment: comment, prodId: id }));
    }
  };

  return (
    <div>
      <BreadCrum title="Producto unico" />
      <Meta title="Producto unico" />

      <div className="container my-16 flex justify-between ">
        {/* BARRA IZQUIERDA */}
        <div className="w-[450px]">
          <ImageZoom
            src={singleState?.images[0].url}
            alt="Imagen de producto de audocular"
            zoom="200"
          />

          <div className="flex gap-2 flex-wrap">
            <div className="w-[220px]">
              <ImageZoom
                src="https://i.ibb.co/LYW1WPH/audicular-verde.jpg"
                alt="Imagen de producto de audocular"
                zoom="200"
              />
            </div>
            <div className="w-[220px]">
              <ImageZoom
                src="https://i.ibb.co/8rLH7p4/Audicular-rojo.jpg"
                alt="Imagen de producto de audocular"
                zoom="200"
              />
            </div>
            <div className="w-[220px]">
              <ImageZoom
                src="https://i.ibb.co/VT8P0MV/Audicular-naranja.jpg"
                alt="Imagen de producto de audocular"
                zoom="200"
              />
            </div>
            <div className="w-[220px]">
              <ImageZoom
                src="https://i.ibb.co/QP8W6Y7/Audicular-gris.jpg"
                alt="Imagen de producto de audocular"
                zoom="200"
              />
            </div>
          </div>
        </div>
        {/* BARRA DERECHA */}
        <div className="w-[700px] flex flex-col gap-3 bg-blanco p-4">
          <h2 className="font-bold text-lg">{singleState?.title}</h2>
          <p className="font-semibold text-lg">$ {singleState?.price}</p>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#5C5D5E]">
              <ReactStars
                count={5}
                size={24}
                activeColor="#ffd700"
                value={
                  !isNaN(parseFloat(singleState?.totalrating))
                    ? parseFloat(singleState?.totalrating)
                    : 0
                }
                edit={false}
              />

              <p>(2 opiniones)</p>
            </div>
            <p className="text-[#5C5D5E]">Escribe una reseña</p>
          </div>
          {/* TIPO */}
          <div className="flex items-center gap-2">
            <p className="font-semibold">Tipo:</p>
            <p className="text-[#5C5D5E] font-medium">
              {singleState?.category}
            </p>
          </div>
          {/* MARCA */}
          <div className="flex items-center gap-2">
            <p className="font-semibold">Marca:</p>
            <p className="text-[#5C5D5E] font-medium">{singleState?.brand}</p>
          </div>
          {/* CATEGORIA */}
          <div className="flex items-center gap-2">
            <p className="font-semibold">Categoria:</p>
            <p className="text-[#5C5D5E] font-medium">
              {singleState?.category}
            </p>
          </div>
          {/* TAGS */}
          <div className="flex items-center gap-2">
            <p className="font-semibold">Tags:</p>
            <p className="text-[#5C5D5E] font-medium">{singleState?.tags}</p>
          </div>
          {/* NUMERO DE CODIGO */}
          <div className="flex items-center gap-2">
            <p className="font-semibold">SKu:</p>
            <p className="text-[#5C5D5E] font-medium">{singleState?.slug}</p>
          </div>
          {/* DISPONIBILIDAD */}
          <div className="flex items-center gap-2">
            <p className="font-semibold">Disponibilidad:</p>
            <p className="text-[#5C5D5E] font-medium">
              {singleState?.quantity} En Stock
            </p>
          </div>
          {/* TAMAÑO */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Tamaño:</p>

            <div className="flex gap-3">
              <p className="w-10 text-center border border-black font-bold">
                S
              </p>
              <p className="w-10 text-center border border-black font-bold">
                M
              </p>
              <p className="w-10 text-center border border-black font-bold">
                XL
              </p>
              <p className="w-10 text-center border border-black font-bold">
                XML
              </p>
            </div>
          </div>
          {/* COLORES */}
          {alreadyAdded === false && (
            <>
              <div className="flex flex-col gap-2">
                <p className="font-semibold">Color:</p>
                <div className="flex gap-2">
                  {singleState?.color?.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="w-8 h-8 rounded-full cursor-pointer"
                        style={{ backgroundColor: `${item.title}` }}
                        onClick={() => setColor(item?._id)}
                      ></li>
                    );
                  })}
                </div>
              </div>
            </>
          )}
          {/* CANTIDAD */}
          <div className="flex items-center gap-8">
            <div className="flex gap-5 items-center">
              {alreadyAdded === false && (
                <>
                  <p className="font-semibold">Cantidad:</p>
                  <input
                    className="px-5 w-28 h-8 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                    type="number"
                    placeholder="0"
                    name="hasta"
                    onChange={(e) => setQuantity(e.target.value)}
                    value={quantity}
                  />
                </>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  alreadyAdded ? navigate("/cart") : addCart();
                }}
                className="text-center rounded-full text-blanco p-3 bg-negro"
              >
                {alreadyAdded ? "IR AL CARRITO" : "AÑADIR AL CARRITO"}
              </button>
              <Link className="text-center rounded-full text-blanco p-3 bg-rojo">
                Comprar ahora
              </Link>
            </div>
          </div>
          {/* AÑADIR A FAVORITOS Y A COMPARAR */}
          <div className="flex gap-4 mt-5">
            <p className="flex items-center gap-1">
              <FaRegHeart /> Añadir a favoritos
            </p>
            <p className="flex items-center gap-1">
              <FaCodeCompare /> Añadir a comparar
            </p>
          </div>
          {/* ENVIOS Y DEVOLUCIONES, LINK */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="font-semibold">Envíos y devoluciones:</p>
              <p>
                ¡Envío y devoluciones gratis disponibles en todos los pedidos!
                ¡Enviamos todos los pedidos nacionales de EE. UU. dentro de 5 a
                10 días hábiles!
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="font-semibold">Copiar enlaces de productos::</p>
              <p
                onClick={() => {
                  copyToClipBoard(window.location.href);
                }}
                className="cursor-pointer text-color-[#AAAAA8]"
              >
                copiar enlace de producto
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* SEGUNDA PARTE */}
      <div className="container my-10 flex flex-col gap-3">
        <h2 className="font-bold text-2xl">Descripcion</h2>

        <div className="p-8 bg-blanco shadow-lg">
          {singleState?.description}
        </div>

        <h2 className="font-bold text-2xl">Opiniones</h2>

        {/* OPINIONES */}
        <div className="w-full bg-blanco p-5 flex justify-between">
          <div>
            <h2 className="font-semibold text-lg">Opiniones de los usuarios</h2>

            <div className="flex items-center gap-2">
              <ReactStars
                count={5}
                size={24}
                activeColor="#ffd700"
                value={3}
                edit={false}
              />
              <p className="text-[#5C5D5E]">Basado en 2 reseñas</p>
            </div>
          </div>

          {resena && (
            <a href="" className="underline">
              Escribe una reseña
            </a>
          )}
        </div>

        {/* COMENTARIOS */}
        {singleState?.ratings?.length === 0 ? (
          <h3>No hay comentarios pendientes</h3>
        ) : (
          singleState?.ratings?.map((item, index) => {
            return (
              <section
                key={index}
                className="w-full p-5 bg-blanco my-10 flex flex-col gap-3"
              >
                <div>
                  <ReactStars
                    count={5}
                    size={24}
                    activeColor="#ffd700"
                    value={item?.star}
                    edit={false}
                  />

                  <p className="font-semibold text-lg">{item?.comment}</p>
                </div>
              </section>
            );
          })
        )}

        {/* FORMULARIO */}
        <h2 className="font-bold text-2xl">Agrega un comentario</h2>

        <div className="flex flex-col">
          <ReactStars
            count={5}
            size={24}
            activeColor="#ffd700"
            value={3}
            edit={true}
            onChange={(newRating) => {
              setStart(newRating);
            }}
          />
        </div>

        {/* <div className="flex flex-col">
            <p>Título de Revisión</p>
            <input
              className="px-5 w-full h-11 rounded-md border shadow-md border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              type="text"
              placeholder="Dale un título a tu reseña"
              name="title"
            />
          </div> */}

        <div className="flex flex-col">
          <p>Cuerpo tus comentarios aquí</p>
          <textarea
            placeholder="Escribe tus comentarios aquí"
            name="body"
            cols="10"
            rows="30"
            className="px-5 w-full h-11 rounded-md border shadow-md border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>

        <button
          type="button"
          onClick={addRatingToProduct}
          className="bg-negro self-end w-32 text-blanco self-start p-3 rounded-full hover:bg-[#DDDDDB] hover:text-negro"
        >
          Enviar opinión
        </button>
      </div>

      <div className="container my-10 flex flex-col gap-3">
        <h2 className="font-bold text-2xl">Productos relacionados</h2>

        <div className="flex gap-5">
          {popularProduct.map((items) => {
            return <ProductCard key={items?._id} data={items} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
