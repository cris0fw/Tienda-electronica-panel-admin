import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEnquiry,
  getEnquiry,
  resetState,
  updatedEnquiry,
} from "../features/enquiries/enquirySlice";
import { IoEyeSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const Enquiries = () => {
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
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Telefono",
      dataIndex: "telefono",
    },
    {
      title: "Estado",
      dataIndex: "estado",
    },
    {
      title: "Accion",
      dataIndex: "accion",
    },
  ];

  const [open, setOpen] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setEnquiryId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const setChangeStatus = (enq, id) => {
    const data = { id: id, enqData: enq };
    dispatch(updatedEnquiry(data));
  };

  const data1 = [];
  const dispatch = useDispatch();
  const enquiryState = useSelector((state) => state.enquiry.enquiry);

  for (let i = 0; i < enquiryState.length; i++) {
    data1.push({
      key: i + 1,
      nombres: enquiryState[i].name,
      email: enquiryState[i].email,
      telefono: enquiryState[i].mobile,
      estado: (
        <>
          <select
            name=""
            defaultValue={
              enquiryState[i].status ? enquiryState[i].status : "submitted"
            }
            className="form-control form-select"
            id=""
            onClick={(e) =>
              setChangeStatus(e.target.value, enquiryState[i]._id)
            }
          >
            <option value="contacted">contactado</option>
            <option value="submitted">Enviado</option>
            <option value="in progress">En progreso</option>
            <option value="resolved">Resolved</option>
          </select>
        </>
      ),
      accion: (
        <>
          <Link
            to={`/admin/enquiries/${enquiryState[i]._id}`}
            color="#00438A"
            className="fs-2"
          >
            <IoEyeSharp />
          </Link>
          <button
            onClick={() => showModal(`${enquiryState[i]._id}`)}
            className="ms-3 fs-2 text-danger bg-transparent border-0"
          >
            <MdDelete />
          </button>
        </>
      ),
    });
  }

  const deletedEnquiry = async (id) => {
    try {
      await dispatch(deleteEnquiry(id));
      await dispatch(getEnquiry());

      setOpen(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiry());
  }, []);

  return (
    <div>
      <h3 className="mb-4 title">Encuestas</h3>

      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        open={open}
        hideModal={hideModal}
        perfomAction={() => deletedEnquiry(enquiryId)}
        title="¿Estás seguro de que quieres eliminar esta encuesta?"
      />
    </div>
  );
};

export default Enquiries;
