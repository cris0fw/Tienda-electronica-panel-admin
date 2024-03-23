import React from "react";
import { Link } from "react-router-dom";

const BreadCrum = ({ title }) => {
  return (
    <div className="w-full bg-blanco p-3">
      <div className="flex justify-center">
        <Link to="/" className="text-sky-800 me-2">
          Home
        </Link>
        / <p className="ml-3">{title}</p>
      </div>
    </div>
  );
};

export default BreadCrum;
