import React from "react";

const CustomInput = ({ type, label, id, i_class, name, val, onCh, onBl }) => {
  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        className={`form-control ${i_class}`}
        id={id}
        placeholder={label}
        name={name}
        value={val}
        onChange={onCh}
        onBlur={onBl}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default CustomInput;
