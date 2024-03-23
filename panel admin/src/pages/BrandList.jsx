import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBrand,
  getBrands,
  resetState,
} from "../features/brand/brandSlice";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const BrandList = () => {
  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Nombre de la marca",
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
      title: "Acciones",
      dataIndex: "accion",
    },
  ];

  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setBrandId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const brandsState = useSelector((state) => state.brand.brands);

  const data1 = [];

  for (let i = 0; i < brandsState.length; i++) {
    data1.push({
      key: i + 1,
      nombres: brandsState[i].title,
      creacion: brandsState[i].createdAt,
      actualizacion: brandsState[i].updatedAt,
      accion: (
        <>
          <Link
            to={`/admin/brand/${brandsState[i]._id}`}
            color="#00438A"
            className="fs-2"
          >
            <CiEdit />
          </Link>
          <button
            onClick={() => showModal(`${brandsState[i]._id}`)}
            className="ms-3 fs-2 text-danger bg-transparent border-0"
          >
            <MdDelete />
          </button>
        </>
      ),
    });
  }

  const deletedBrand = async (id) => {
    try {
      await dispatch(deleteBrand(id));
      await dispatch(getBrands());

      setOpen(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    // Le colocamos un reseteo de estado para que no de error para la actualizacion
    dispatch(resetState());
    dispatch(getBrands());
  }, []);

  return (
    <div>
      <h3 className="mb-4 title">Lista de marcas de productos</h3>

      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        open={open}
        hideModal={hideModal}
        perfomAction={() => deletedBrand(brandId)}
        title="¿Estás seguro de que quieres eliminar esta marca?"
      />
    </div>
  );
};

export default BrandList;
