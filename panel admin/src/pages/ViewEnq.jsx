import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getOneEnquiry,
  resetState,
  updatedEnquiry,
} from "../features/enquiries/enquirySlice";
import { IoArrowBack } from "react-icons/io5";

const ViewEnq = () => {
  const location = useLocation();
  const getEnqId = location.pathname.split("/")[3];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (getEnqId !== undefined) {
      dispatch(getOneEnquiry(getEnqId));
    } else {
      dispatch(resetState());
    }
  }, [getEnqId]);

  const enquiryState = useSelector((state) => state.enquiry);
  const {
    enquiryName,
    enquiryEmail,
    enquiryMobile,
    enquiryComment,
    enquiryStatus,
  } = enquiryState;

  const goBack = () => {
    navigate(-1);
  };

  const setChangeStatus = (enq, id) => {
    const data = { id: id, enqData: enq };
    dispatch(updatedEnquiry(data));
    dispatch(resetState());

    setTimeout(() => {
      dispatch(getOneEnquiry(getEnqId));
    }, 3000);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">Ver encuesta</h3>
        <button
          className="bg-transparent border-0 fs-5 mb-0 d-flex align-items-center gap-3"
          onClick={goBack}
        >
          <IoArrowBack className="fs-5" /> Regresa
        </button>
      </div>

      <div className="mt-5 bg-white p-4 rounded-3">
        <div className="d-flex align-items-center gap-3 flex-column">
          <h5 className="mb-0">Nombre</h5>
          <p className="mb-0">{enquiryName}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h5 className="mb-0">Numero de telefono</h5>
          <p className="mb-0">
            <a href={`tel:+54${enquiryMobile}`}>{enquiryMobile}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h5 className="mb-0">Email</h5>
          <p className="mb-0">
            <a href={`mailto${enquiryEmail}`}>{enquiryEmail}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h5 className="mb-0">Comentario</h5>
          <p className="mb-0">{enquiryComment}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h5 className="mb-0">Estado</h5>
          <p className="mb-0">{enquiryStatus}</p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <h5 className="mb-0">Cambio de estado:</h5>
          <div>
            <select
              name=""
              defaultValue={enquiryStatus ? enquiryStatus : "submitted"}
              className="form-control form-select"
              id=""
              onClick={(e) => setChangeStatus(e.target.value, getEnqId)}
            >
              <option value="contacted">contactado</option>
              <option value="submitted">Enviado</option>
              <option value="in progress">En progreso</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEnq;
