import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByUser, getOrders } from "../features/auth/authSlice";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const ViewOrder = () => {
  const location = useLocation();
  const getOrderId = location.pathname.split("/")[3];

  useEffect(() => {
    dispatch(getOrderByUser(getOrderId));
  }, []);

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Nombre del producto",
      dataIndex: "name",
    },
    {
      title: "Marca",
      dataIndex: "marca",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
    },
    {
      title: "Color",
      dataIndex: "color",
    },
    {
      title: "Precio",
      dataIndex: "price",
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
    },
    {
      title: "Acciones",
      dataIndex: "accion",
    },
  ];

  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.auth.orderbyuser?.[0]);

  console.log(orderState);

  const data1 = [];

  if (orderState && orderState.products) {
    orderState.products.forEach((product, index) => {
      data1.push({
        key: index + 1,
        name: product.product.title,
        marca: product.product.brand,
        cantidad: product.count,
        color: product.color,
        price: product.product.price,
        fecha: new Date(product.createdAt).toLocaleDateString(),
        accion: (
          <>
            <Link to="/" color="#00438A" className="fs-2">
              <CiEdit />
            </Link>
            <Link to="/" className="ms-3 fs-2 text-danger">
              <MdDelete />
            </Link>
          </>
        ),
      });
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Ordenes</h3>

      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
