import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/auth/authSlice";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Orders = () => {
  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Order Status",
      dataIndex: "order",
    },
    {
      title: "Productos",
      dataIndex: "producto",
    },
    {
      title: "Monto total",
      dataIndex: "monto",
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
  const orderState = useSelector((state) => state.auth.order);

  const data1 = [];

  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      order: orderState[i].orderBy.nombre,
      producto: (
        <Link to={`/admin/orders/${orderState[i].orderBy._id}`}>Ver orden</Link>
      ),
      monto: orderState[i].paymentIntent.amount,
      fecha: new Date(orderState[i].createdAt).toLocaleDateString(),
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
  }

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <div>
      <h3 className="mb-4 title">Ver orden</h3>

      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Orders;
