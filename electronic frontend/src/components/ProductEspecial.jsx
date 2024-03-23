import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const ProductEspecial = ({ data }) => {
  return (
    <div className="w-[400px] h-auto flex justify-center items-start bg-blanco p-5 shadow-lg">
      <img className="w-48" src={data?.images[0]?.url} alt="telefono samsung" />

      <div>
        <p className="text-xs text-rojo font-medium mb-3">{data?.brand}</p>

        <h2 className="font-semibold mb-3">{data?.title}</h2>

        <ReactStars
          count={5}
          size={24}
          activeColor="#ffd700"
          value={3}
          edit={false}
        />

        <div className="flex justify-around mb-3">
          <p className="text-rojo">$150.999</p>
          <strike>$ {data?.price}</strike>
        </div>

        <div className="flex items-center mb-3">
          <p className="me-2 flex gap-3">
            <span className="font-semibold">70</span>
            <span className="text-[#5C5D5E]">dias</span>
          </p>
          <div className="flex">
            <p className=" bg-rojo rounded-full text-blanco p-1 me-2">02</p>
            <p className=" bg-rojo rounded-full text-blanco p-1 me-2">48</p>
            <p className=" bg-rojo rounded-full text-blanco p-1">50</p>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-[#5C5D5E]">Productos: {data?.quantity}</p>

          <div className="w-full bg-gray-200 rounded-lg overflow-hidden mb-3">
            <div
              className="bg-green-500 text-xs leading-none text-center text-white"
              style={{
                width: data?.quantity / data?.quantity + data?.sold * 100 + "%",
              }}
            >
              {data?.quantity / data?.quantity + data?.sold * 100}
            </div>
          </div>
        </div>

        <Link
          to={"/product/" + data?._id}
          className="bg-negro text-blanco rounded-full p-2 w-28"
        >
          Ver
        </Link>
      </div>
    </div>
  );
};

export default ProductEspecial;
