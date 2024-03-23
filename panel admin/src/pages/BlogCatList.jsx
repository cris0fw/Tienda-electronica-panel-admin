import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlogCategory,
  getCategoryBlogs,
  resetState,
} from "../features/blogCategory/blogCategorySlice";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const BlogCatList = () => {
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
      title: "fecha de creacion",
      dataIndex: "creacion",
    },
    {
      title: "Fecha de actualizacion",
      dataIndex: "actualizacion",
    },
    {
      title: "Acciones",
      dataIndex: "accion",
    },
  ];

  const [open, setOpen] = useState(false);
  const [categoryBlogId, setCategoryBlogId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setCategoryBlogId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const categoryBlogState = useSelector(
    (state) => state.categoryBlog.categoryBlog
  );

  const data1 = [];

  for (let i = 0; i < categoryBlogState.length; i++) {
    data1.push({
      key: i + 1,
      nombres: categoryBlogState[i].title,
      creacion: categoryBlogState[i].createdAt,
      actualizacion: categoryBlogState[i].updatedAt,
      accion: (
        <>
          <Link
            to={`/admin/blog-category/${categoryBlogState[i]._id}`}
            color="#00438A"
            className="fs-2"
          >
            <CiEdit />
          </Link>
          <button
            onClick={() => showModal(`${categoryBlogState[i]._id}`)}
            className="ms-3 fs-2 text-danger"
          >
            <MdDelete />
          </button>
        </>
      ),
    });
  }

  const deletedCategoryBlog = async (id) => {
    try {
      await dispatch(deleteBlogCategory(id));
      await dispatch(getCategoryBlogs());

      setOpen(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategoryBlogs());
  }, []);

  return (
    <div>
      <h3 className="mb-4 title">Lista de categorias de blog</h3>

      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        open={open}
        hideModal={hideModal}
        perfomAction={() => deletedCategoryBlog(categoryBlogId)}
        title="¿Estás seguro de que quieres eliminar esta marca?"
      />
    </div>
  );
};

export default BlogCatList;
