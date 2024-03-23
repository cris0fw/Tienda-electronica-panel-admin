import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteColor,
  getColors,
  resetState,
} from "../features/color/colorSlice";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const ColorList = () => {
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
      title: "acciones",
      dataIndex: "accion",
    },
  ];

  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setColorId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const colorState = useSelector((state) => state.color.colors);

  const data1 = [];

  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i + 1,
      nombres: colorState[i].title,
      accion: (
        <>
          <Link
            to={`/admin/color/${colorState[i]._id}`}
            color="#00438A"
            className="fs-2"
          >
            <CiEdit />
          </Link>
          <button
            onClick={() => showModal(`${colorState[i]._id}`)}
            className="ms-3 fs-2 text-danger bg-transparent border-0"
          >
            <MdDelete />
          </button>
        </>
      ),
    });
  }

  const deletedColor = async (id) => {
    try {
      await dispatch(deleteColor(id));
      await dispatch(getColors());

      setOpen(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors());
  }, []);

  return (
    <div>
      <h3 className="mb-4 title">Lista de colores</h3>

      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        open={open}
        hideModal={hideModal}
        perfomAction={() => deletedColor(colorId)}
        title="¿Estás seguro de que quieres eliminar esta marca?"
      />
    </div>
  );
};

export default ColorList;
