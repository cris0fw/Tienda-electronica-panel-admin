import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoupons,
  resetState,
  deleteCoupon,
} from "../features/cuopon/couponSlice";
import CustomModal from "../components/CustomModal";

const CuoponList = () => {
  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Nombre",
      dataIndex: "nombres",
    },
    {
      title: "Fecha de expiracion",
      dataIndex: "expiracion",
    },
    {
      title: "Descuento",
      dataIndex: "descuento",
    },
    {
      title: "Acciones",
      dataIndex: "accion",
    },
  ];

  const [open, setOpen] = useState(false);
  const [couponId, setcouponId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setcouponId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const couponState = useSelector((state) => state.coupon.coupons);
  const { isSuccess, isError, isLoading, couponDeleted } = couponState;

  let data1 = [];

  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      key: i + 1,
      nombres: couponState[i].name,
      expiracion: couponState[i].expiry,
      descuento: couponState[i].discount,
      accion: (
        <>
          <Link
            to={`/admin/coupon/${couponState[i]._id}`}
            color="#00438A"
            className="fs-2"
          >
            <CiEdit />
          </Link>
          <button
            onClick={() => showModal(`${couponState[i]._id}`)}
            className="ms-3 fs-2 text-danger"
          >
            <MdDelete />
          </button>
        </>
      ),
    });
  }

  const deletedCoupon = async (id) => {
    try {
      await dispatch(deleteCoupon(id));
      await dispatch(getCoupons());

      setOpen(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCoupons());
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
        perfomAction={() => deletedCoupon(couponId)}
        title="¿Estás seguro de que quieres eliminar esta marca?"
      />
    </div>
  );
};

export default CuoponList;
