import React from "react";

const CustomInput = ({
  type,
  name,
  placeholder,
  className,
  value,
  onCh,
  OnBl,
  disabled,
}) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className={className}
        value={value}
        onChange={onCh}
        onBlur={OnBl}
        disabled={disabled}
      />
    </div>
  );
};

export default CustomInput;
