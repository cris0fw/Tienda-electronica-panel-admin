import React from "react";
import { GoArrowDownRight } from "react-icons/go";
import { Column } from "@ant-design/plots";
import { Table } from "antd";

const Dashboard = () => {
  const data = [
    {
      type: "Jan",
      sales: 38,
    },
    {
      type: "Feb",
      sales: 52,
    },
    {
      type: "Mar",
      sales: 61,
    },
    {
      type: "Apr",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "Jun",
      sales: 38,
    },
    {
      type: "July",
      sales: 38,
    },
    {
      type: "Aug",
      sales: 38,
    },
    {
      type: "Sept",
      sales: 38,
    },
    {
      type: "Oct",
      sales: 38,
    },
    {
      type: "Nov",
      sales: 38,
    },
    {
      type: "Dec",
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "top",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Nombres",
      dataIndex: "nombres",
    },
    {
      title: "Productos",
      dataIndex: "productos",
    },
    {
      title: "Estado",
      dataIndex: "estado",
    },
  ];

  const data1 = [];

  for (let i = 0; i < 46; i++) {
    data1.push({
      key: i,
      nombres: `Edward kink ${i}`,
      productos: 32,
      estado: `London, Park Lane no. ${i}`,
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>

      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">total</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-content-end">
            <h6>
              <GoArrowDownRight /> 32%
            </h6>
            <p className="mb-0 desc">comparar con abril</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">total</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-content-end">
            <h6 className="red">
              <GoArrowDownRight /> 32%
            </h6>
            <p className="mb-0 desc">comparar con abril</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">total</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-content-end">
            <h6 className="green">
              <GoArrowDownRight /> 32%
            </h6>
            <p className="mb-0 desc">comparar con abril</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-4 sub-title">estadística de ingresos</h3>

        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4 sub-title">Ordenes recientes</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
