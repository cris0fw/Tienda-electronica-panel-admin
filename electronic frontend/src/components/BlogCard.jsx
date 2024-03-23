import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { giveAdislike, giveAlike } from "../features/blogs/blogSlice";

const BlogCard = ({ data }) => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const dispatch = useDispatch();
  const likeState = useSelector((state) => state.blog.like);

  useEffect(() => {
    const getLike = localStorage.getItem(`like-${data._id}`);
    const getDislike = localStorage.getItem(`dislike-${data._id}`);

    // Verificar y actualizar el estado de "me gusta" y "no me gusta" al cargar
    if (getLike === "true") {
      setLike(true);
      setDislike(false); // Si le gusta, no debe haber no me gusta
    } else if (getDislike === "true") {
      setLike(false); // Si no le gusta, no debe haber me gusta
      setDislike(true);
    }
  }, [data._id, like, dislike]);

  const darMegusta = (id) => {
    dispatch(giveAlike({ blogId: id }));
    // Si ya le gustaba y le da me gusta nuevamente, se quita el me gusta
    if (like) {
      setLike(false);
      localStorage.setItem(`like-${id}`, "false");
    } else {
      // Si no le gustaba, se agrega el me gusta y se quita el no me gusta
      setLike(true);
      setDislike(false);
      localStorage.setItem(`like-${id}`, "true");
      localStorage.setItem(`dislike-${id}`, "false");
    }
  };

  const darNoMeGusta = (id) => {
    dispatch(giveAdislike({ blogId: id }));
    // Si ya le disgustaba y le da no me gusta nuevamente, se quita el no me gusta
    if (dislike) {
      setDislike(false);
      localStorage.setItem(`dislike-${id}`, "false");
    } else {
      const getDislike = localStorage.getItem(`dislike-${data._id}`);
      // Si no le disgustaba, se agrega el no me gusta y se quita el me gusta
      setDislike(false);
      setLike(false);
      localStorage.setItem(`dislike-${id}`, "true");
      localStorage.setItem(`like-${id}`, "false");

      if (getDislike === "true") {
        setDislike(true);
        setLike(false);
        localStorage.setItem(`dislike-${id}`, "true");
        localStorage.setItem(`like-${id}`, "false");
      }
    }
  };

  return (
    <div className="bg-blanco shadow-lg w-[300px] flex flex-wrap justify-center gap-3">
      <img
        className="w-full"
        src={data.images[0]?.url}
        alt="Producto nuevo de blog"
      />

      <div className="flex flex-col justify-start items-start p-4">
        <p className="text-[#AAAAA8] text-sm mb-2">
          {moment(data.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
        </p>

        <h2 className="font-semibold text-lg mb-2">{data.title}</h2>

        <p className="text-sm text-[#AAAAA8] mb-2">{data.description}</p>

        <div className="flex my-5">
          {like === false ? (
            <AiOutlineLike
              className="cursor-pointer"
              onClick={() => darMegusta(data._id)}
              size={25}
            />
          ) : (
            <AiFillLike
              className="cursor-pointer"
              onClick={() => darMegusta(data._id)}
              size={25}
            />
          )}
          {dislike === false ? (
            <AiOutlineDislike
              onClick={() => darNoMeGusta(data._id)}
              size={25}
              className="cursor-pointer"
            />
          ) : (
            <AiFillDislike
              onClick={() => darNoMeGusta(data._id)}
              size={25}
              className="cursor-pointer"
            />
          )}
        </div>

        <Link
          to={`/blogs/${data._id}`}
          className=" bg-negro rounded-full text-center text-blanco p-2 my-3 w-28 hover:bg-[#5C5D5E] hover:duration-200 hover:ease-in-out"
        >
          LEER MAS
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
