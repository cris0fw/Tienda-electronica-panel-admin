import React from "react";
import BreadCrum from "../components/BreadCrum";
import Meta from "../components/Meta";
import { IoMdClose } from "react-icons/io";

const CompareProduct = () => {
  return (
    <div>
      <BreadCrum title="Comparar producto" />
      <Meta title="Comparar producto" />

      <div className="container my-16">
        {/* TARJETA CARD */}
        <div className="w-[250px] relative">
          <div className="w-full bg-blanco">
            <img
              className="w-[190px] m-auto"
              src="https://i.ibb.co/hgK6sZ1/tablet.webp"
              alt="Tablet"
            />

            <div className="absolute top-0 right-0">
              <IoMdClose size={22} />
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <p className="font-semibold">Tablet Samsung Galaxy Tab A9 11</p>

            <p className="font-semibold">$ 252.999</p>

            <div className="flex justify-between p-2 border-b-2 border-[#A7ABB1]">
              <p className="font-semibold">Marca: </p>
              <p className="text-sm text-[#7C828A]">Samsung</p>
            </div>
            <div className="flex justify-between p-2 border-b-2 border-[#A7ABB1] ">
              <p className="font-semibold">Tipo: </p>
              <p className="text-sm text-[#7C828A]">Tablet</p>
            </div>
            <div className="flex justify-between p-2 border-b-2 border-[#A7ABB1] ">
              <p className="font-semibold">SKU: </p>
              <p className="text-sm text-[#7C828A]">C-29847</p>
            </div>
            <div className="flex justify-between p-2 border-b-2 border-[#A7ABB1] ">
              <p className="font-semibold">Disponible: </p>
              <p className="text-sm text-[#7C828A]">Hay Stock</p>
            </div>
            <div className="flex justify-between p-2 border-b-2 border-[#A7ABB1] ">
              <p className="font-semibold">Color: </p>
              <li className="w-5 h-5 rounded-full bg-[#8A8E96]"></li>
            </div>
            <div className="flex justify-between p-2 border-b-2 border-[#A7ABB1] ">
              <p className="font-semibold">Tamaño: </p>
              <p className="text-sm text-[#7C828A]">5 M L</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareProduct;
