import React from "react";
import "./FormInput.scss";

const FormInput = (loginF) => {
  const { onChange, ...loginProps } = loginF;
  return (
    <div className="formInput">
      {/* <label>Username</label> */}
      <input {...loginProps} onChange={onChange} />
    </div>
  );
};

export default FormInput;
