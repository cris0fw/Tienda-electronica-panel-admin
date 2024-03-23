import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  deleteProduct,
  resetState,
} from "../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const ProductList = () => {
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
    },
    {
      title: "Marca",
      dataIndex: "marca",
      sorter: (a, b) => a.marca.length - b.marca.length,
    },
    {
      title: "Categoria",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: "Precio",
      dataIndex: "precio",
      sorter: (a, b) => a.precio.length - b.precio.length,
    },
    {
      title: "Acciones",
      dataIndex: "accion",
    },
  ];

  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");

  const dispatch = useDispatch();

  const showModal = (e) => {
    setOpen(true);
    setProductId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const productState = useSelector((state) => state.product.products);

  const data1 = [];

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const productoDeleted = async (id) => {
    try {
      await dispatch(deleteProduct(id));
      await dispatch(getProducts());

      setOpen(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      nombres: productState[i].title,
      descripcion: productState[i].description,
      marca: productState[i].brand,
      category: productState[i].category,
      precio: productState[i].price,
      accion: (
        <>
          <Link to="/" color="#00438A" className="fs-2">
            <CiEdit />
          </Link>
          <button
            onClick={() => showModal(`${productState[i]._id}`)}
            className="ms-3 fs-2 text-danger bg-transparent border-0"
          >
            <MdDelete />
          </button>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Lista de productos</h3>

      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        open={open}
        hideModal={hideModal}
        perfomAction={() => productoDeleted(productId)}
        title="¿Estás seguro de que quieres eliminar esta marca?"
      />
    </div>
  );
};

export default ProductList;
