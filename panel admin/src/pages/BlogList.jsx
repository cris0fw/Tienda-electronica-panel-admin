import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, resetState } from "../features/blog/blogSlice";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const BlogList = () => {
  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Nombres",
      dataIndex: "nombres",
      sorter: (a, b) => a.nombres.length - b.nombres.length,
    },
    {
      title: "Descripcion",
      dataIndex: "descripcion",
      sorter: (a, b) => a.descripcion.length - b.descripcion.length,
    },
    {
      title: "Autor",
      dataIndex: "autor",
      sorter: (a, b) => a.autor.length - b.autor.length,
    },
    {
      title: "Categoria",
      dataIndex: "categoria",
      sorter: (a, b) => a.categoria.length - b.categoria.length,
    },
    {
      title: "Numero de vistas",
      dataIndex: "vistas",
    },
    {
      title: "Acciones",
      dataIndex: "accion",
    },
  ];

  const dispatch = useDispatch();
  const blogState = useSelector((state) => state.blog.blogs);

  const data1 = [];

  for (let i = 0; i < blogState.length; i++) {
    data1.push({
      key: i,
      nombres: blogState[i].title,
      descripcion: blogState[i].description,
      autor: blogState[i].author,
      categoria: blogState[i].category,
      vistas: blogState[i].numViews,
      accion: (
        <>
          <Link
            to={`/admin/add-blog/${blogState[i]._id}`}
            color="#00438A"
            className="fs-2"
          >
            <CiEdit />
          </Link>
          <Link to="/" className="ms-3 fs-2 text-danger">
            <MdDelete />
          </Link>
        </>
      ),
    });
  }

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, []);

  return (
    <div>
      <h3 className="mb-4 title">Lista de blogs</h3>

      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default BlogList;
