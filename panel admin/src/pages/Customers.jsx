import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/CustomerSlice";

const Customers = () => {
  const dispatch = useDispatch();
  const customerState = useSelector((state) => state.customer.customer);

  const data1 = [];

  for (let i = 0; i < customerState.length; i++) {
    if (customerState[i].role !== "admin") {
      data1.push({
        key: i + 1,
        nombres: customerState[i].nombre + " " + customerState[i].apellido,
        email: customerState[i].email,
        mobile: customerState[i].mobile,
      });
    }
  }

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
      title: "email",
      dataIndex: "email",
    },
    {
      title: "mobile",
      dataIndex: "mobile",
    },
  ];

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div>
      <h3 className="mb-4 title">Clientes</h3>

      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Customers;
