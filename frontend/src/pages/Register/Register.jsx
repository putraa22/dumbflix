import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FormRegister } from "../../components";
import { Link } from "react-router-dom";
import "./Register.scss";

const Register = (props) => {
  const [values, setValues] = useState({
    Email: "",
    Password: "",
    FullName: "",
    Gender: "",
    Phone: "",
    Address: "",
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
    },
    {
      id: 3,
      name: "fullName",
      type: "text",
      placeholder: "Full Name",
    },
    {
      id: 4,
      name: "gender",
      type: "text",
      placeholder: "Gender",
    },
    {
      id: 5,
      name: "phone",
      type: "number",
      placeholder: "Phone",
    },
    {
      id: 6,
      name: "address",
      type: "text",
      placeholder: "Address",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  console.log(values);

  return (
    <Modal {...props} className="app__register" centered>
      <div className="app__register-container">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          {inputs.map((input) => (
            <FormRegister key={input.id} {...input} value={values[input.name]} onChange={onChange} />
          ))}
          <button>Register</button>
          <p>
            Already have an account ? Klik <Link to="/login">Here</Link>{" "}
          </p>
        </form>
      </div>
    </Modal>
  );
};

export default Register;
