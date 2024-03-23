import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategory,
  resetState,
  deleteCategory,
} from "../features/category/categorySlice";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import CustomModal from "../components/CustomModal";

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setCategoryId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "categoria de producto",
      dataIndex: "nombres",
      sorter: (a, b) => a.nombres.length - b.nombres.length,
    },
    {
      title: "fecha de creacion",
      dataIndex: "creacion",
    },
    {
      title: "fecha de actualizacion",
      dataIndex: "actualizacion",
    },
    {
      title: "acciones",
      dataIndex: "accion",
    },
  ];

  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.category.category);

  const data1 = [];

  for (let i = 0; i < categoryState.length; i++) {
    data1.push({
      key: i + 1,
      nombres: categoryState[i].title,
      creacion: categoryState[i].createdAt,
      actualizacion: categoryState[i].updatedAt,
      accion: (
        <>
          <Link
            to={`/admin/category/${categoryState[i]._id}`}
            color="#00438A"
            className="fs-2"
          >
            <CiEdit />
          </Link>
          <button
            onClick={() => showModal(`${categoryState[i]._id}`)}
            className="ms-3 fs-2 text-danger"
          >
            <MdDelete />
          </button>
        </>
      ),
    });
  }

  const categoryDeleted = async (id) => {
    try {
      await dispatch(deleteCategory(id));
      await dispatch(getCategory());

      setOpen(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategory());
  }, []);

  return (
    <div>
      <h3 className="mb-4 title">Lista de categorias de productos</h3>

      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        open={open}
        hideModal={hideModal}
        perfomAction={() => categoryDeleted(categoryId)}
        title="¿Estás seguro de que quieres eliminar esta categoria?"
      />
    </div>
  );
};

export default CategoryList;
