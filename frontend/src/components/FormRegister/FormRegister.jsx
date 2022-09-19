import React from "react";
import "./FormRegister.scss";

const FormInput = (props) => {
  const { onChange, ...inputProps } = props;

  return (
    <div className="formRegister">
      {/* <label>Username</label> */}
      <input {...inputProps} onChange={onChange} />
    </div>
  );
};

export default FormInput;
