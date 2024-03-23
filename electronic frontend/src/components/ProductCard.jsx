import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import corazon from "../img/corazon negro.png";
import compartir from "../img/compartir.svg";
import ver from "../img/ver.svg";
import shop from "../img/shop.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProductList } from "../features/product/productSlice";

const ProductCard = ({ grid, data }) => {
  const [mover, setMover] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addWishListProduct = (id) => {
    dispatch(addProductList(id));
  };

  const rating = !isNaN(parseFloat(data?.totalrating))
    ? parseFloat(data?.totalrating)
    : 0;

  return (
    <>
      <div
        onMouseEnter={() => setMover(true)}
        onMouseLeave={() => setMover(false)}
        className={`bg-blanco shadow-lg ${
          location.pathname == "/product"
            ? grid == 500
              ? `w-[${grid}px] flex`
              : `w-[${grid}px]`
            : "w-[250px]"
        }`}
      >
        <div className="relative">
          <div
            className={`w-[200px] h-[190px] m-auto bg-cover bg-center transition duration-300 ease-in-out transform hover:scale-110`}
            style={{
              backgroundImage: `url(${data.images[0].url})`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundImage = `url('https://i.ibb.co/pzQx8Cy/audicular2.png')`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundImage = `url(${data.images[0].url})`;
            }}
          ></div>

          <div className="absolute top-2 right-2">
            <img
              src={corazon}
              className="w-7 cursor-pointer"
              alt="like de corazon"
              onClick={(e) => addWishListProduct(data._id)}
            />
          </div>

          <div
            className={`absolute flex flex-col mt-1 gap-2 top-10 ${
              mover ? "right-3 block cursor-pointer" : "right-[-30px] hidden"
            }`}
          >
            <img src={compartir} alt="icono de compartir" />

            <img
              onClick={() => navigate("/product/" + data?._id)}
              src={ver}
              alt="icono de ver"
            />

            <img src={shop} alt="icono de tienda" />
          </div>
        </div>
        <div className="p-3">
          <p className="text-sm text-rojo font-medium mb-3">{data?.brand}</p>
          <h2 className="font-semibold mb-2">{data?.title}</h2>
          <ReactStars
            count={5}
            size={24}
            activeColor="#ffd700"
            value={rating}
            edit={false}
          />

          <p className="mt-3">$ {data?.price}</p>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
