// import React, { useState, useContext } from "react";
// import "./Navbar.scss";
// import { images } from "../../contstans";
// import { ArrowDropDown, Person, Payment, Logout } from "@mui/icons-material";
// import { Button } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import { UserContext } from "../../context/userContext";
// import { Login, Register } from "../../pages";

// const Navbar = (props) => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isLogin, setIsLogin] = useState(false)

//   let navigate = useNavigate()

//   const [state, dispatch] = useContext(UserContext)

//   const logout = () => {
//     console.log(state);
//     dispatch({
//       type: "LOGOUT"
//     })
//     navigate("/")
//   }

//   const checkAuth = () => {
//       if (state.isLogin === true) {
//           navigate("/")
//       }
//   }
//   checkAuth();

//   const [isRegister, setIsRegister] = useState(false)

//   // const switchLogin = () => {
//   //     setIsRegister(false)
//   // }
//   // const switchRegister = () => {
//   //     setIsRegister(true)
//   // }

//   window.onscroll = () => {
//     setIsScrolled(window.pageYOffset === 0 ? false : true);
//     return () => (window.onscroll = null);
//   };

//   const [loginShow, setLoginShow] = React.useState(false);
//   const [registerShow, setRegisterShow] = React.useState(false);
//   const handleLoginShow = () => setLoginShow(true)
//   const handleRegisterShow = () => setRegisterShow(true)

//   const handleLogin = () => {
//     handleLoginShow()
//   }
//   const handleCloseLogin = () => setLoginShow(false)

//   const handleRegister = () => {
//     handleRegisterShow()
//   }
//   const handleCloseRegister = () => setRegisterShow(false)

//   return (
//     <>
//       <nav className={isScrolled ? "app__navbar scrolled" : "app__navbar"}>
//         <div className="nav__container">
//           <ul className="navbar__links head-text">
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/tv-show">TV Show</Link>
//             </li>
//             <li>
//               <Link to="/movies">Movies</Link>
//             </li>
//           </ul>
//           <div className="nav__logo">
//             <a href="#home">
//               <img src={images.logo} alt="navbar-logo" />
//             </a>
//           </div>
//           {state.isLogin ? (
//             <div className="nav__right">
//               <img src={images.avartar} alt="avatar" />
//               <div className="profile">
//                 <ArrowDropDown className="icon" />
//                 <div className="options">
//                   <Link to="/profile">
//                     <Person className="icon__links" />
//                     Profile
//                   </Link>
//                   <Link to="/pay">
//                     <Payment className="icon__links" />
//                     Pay
//                   </Link>
//                   <div />
//                   <button className="nav-border" onClick={logout}>
//                     <Logout className="icon__links" onClick={logout} />
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="nav__button">
//               <Button className="login head-text"  onClick={handleLogin} >
//                 Login
//               </Button>
//               <Login show={loginShow} handleClose={handleCloseLogin} />
//               <Button className="register head-text" onClick={handleRegister}>
//                 Register
//               </Button>
//               <Register show={registerShow} handleClose={handleCloseRegister} />
//             </div>
//           )}
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;

/* eslint-disable */
import { useState, useContext } from "react";
import { Button, Dropdown, Form, Image, InputGroup, Nav, Navbar } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineTransaction } from "react-icons/ai";
import { API } from "../../config/api";
import { images } from "../../contstans";
import { UserContext } from "../../context/userContext";
import { generateFromString } from "generate-avatar";
import { Person, Payment, Logout, Movie } from "@mui/icons-material";

function NavbarComponent() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });

  function handleLogout() {
    return dispatch({
      type: "LOGOUT",
    });
  }

  const [dataRegister, setDataRegister] = useState({
    fullName: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    address: "",
  });

  function handleChangeLogin(e) {
    setDataLogin({
      ...dataLogin,
      [e.target.name]: e.target.value,
    });
  }

  function handleLogout() {
    dispatch({
      type: "LOGOUT_SUCCESS",
    });
    Success({ message: "Logout berhasil!" });
  }

  async function handleSubmitLogin() {
    try {
      const body = {
        email: dataLogin.email,
        password: dataLogin.password,
      };

      await API.post("/login", body, { validateStatus: () => true })
        .then((response) => {
          if (response.data.code === 400) {
            return Error({ message: "Email / Password yang anda masukkan salah!" });
          }
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: response.data.data,
          });
          console.log(state);
        })
        .catch((err) => {
          Error({ message: `${err.response.data.message}` });
        });
    } catch (err) {
      console.log(err);
    }
  }

  function handleChangeRegister(e) {
    setDataRegister({
      ...dataRegister,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmitRegister() {
    try {
      const body = {
        fullName: dataRegister.fullName,
        email: dataRegister.email,
        password: dataRegister.password,
        gender: dataRegister.gender,
        phone: dataRegister.phone,
        address: dataRegister.address,
      };

      await API.post("/register", body, { validateStatus: () => true })
        .then((response) => {
          console.log(response);
          if (response.data.code >= 400) {
            return Error({ message: `Mohon isikan form registrasi yang valid!` });
          }
          handleCloseRegister();
          handleShowLogin();
          Success({ message: `Register berhasil! Silahkan Login` });
        })
        .catch((err) => {
          Error({ message: `${err.response.data.message}` });
        });
    } catch (err) {
      Error({ message: `${err}` });
    }
  }

  return (
    <>
      <Navbar style={{ backgroundColor: "#1F1F1F" }} expand="lg" className="fixed-top">
        <div className="mx-5 w-100">
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: "white", backgroundColor: "white" }} />

          <div className="position-absolute" style={!state.isAdmin ? { top: "15px", left: "45%" } : { top: "15px", left: "5%" }}>
            <img src={images.logo} alt />
          </div>

          {/* <div className="position-absolute" style={state.isAdmin ? { top: "15px", left: "45%" } : { top: "15px", left: "45%" }}>
              <img src={images.logo} />
            </div> */}

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="w-100">
              {!state.isAdmin && (
                <>
                  <Link className="text-white fw-bold d-flex justify-content-start text-decoration-none d-flex align-items-center pt-2 pb-2" style={{ width: "100px" }} to={"/"} id="RouterNavLink">
                    Home
                  </Link>
                  <Link className="text-white fw-bold d-flex justify-content-start text-decoration-none d-flex align-items-center pt-2 pb-2" style={{ width: "130px" }} to={"/tv-show"} id="RouterNavLink">
                    TV Shows
                  </Link>
                  <Link className="text-white fw-bold d-flex justify-content-start text-decoration-none d-flex align-items-center pt-2 pb-2" style={{ width: "130px" }} to={"/movies"} id="RouterNavLink">
                    Movies
                  </Link>
                </>
              )}
              <div className="d-flex w-100 justify-content-end">
                {!state.isLogin ? (
                  <>
                    <Button
                      style={{
                        backgroundColor: "white",
                        color: "#E50914",
                        fontWeight: "bold",
                        width: "100px",
                        marginRight: "20px",
                        border: "none",
                      }}
                      onClick={handleShowRegister}
                    >
                      Register
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "#E50914",
                        color: "white",
                        fontWeight: "bold",
                        width: "100px",
                        border: "none",
                      }}
                      onClick={handleShowLogin}
                    >
                      Login
                    </Button>
                  </>
                ) : (
                  <>
                    <Dropdown>
                      <Dropdown.Toggle variant="black" style={{ backgroundColor: "" }} id="dropdown-basic">
                        <Image src={`data:image/svg+xml;utf8,${generateFromString(`${state.user.email}`)}`} style={{ objectFit: "cover", width: "30px", height: "30px", border: "1px solid white" }} className="rounded-circle" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu style={{ backgroundColor: "#1F1F1F", marginTop: "35px" }} className="dropdown-menu-end">
                        <div style={{ width: "0", height: "0", borderLeft: "15px solid transparent", borderRight: "15px solid transparent", borderBottom: "15px solid #1F1F1F", position: "absolute", right: "10px", top: "-15px" }}></div>
                        {state.isAdmin ? (
                          <>
                            <Dropdown.Item style={{ color: "white" }} className="d-flex align-items-center" onClick={() => navigate("/list-film")}>
                              <Movie style={{ objectFit: "cover", width: "20px", height: "20px", color: "red" }} />
                              <b className="ms-2">Film</b>
                            </Dropdown.Item>
                            <Dropdown.Item style={{ color: "white" }} className="d-flex align-items-center mt-2" onClick={() => navigate("/list-transaction")}>
                              <AiOutlineTransaction style={{ objectFit: "cover", width: "20px", height: "20px", color: "#E50914" }} />
                              <b className="ms-2">Transaction</b>
                            </Dropdown.Item>
                          </>
                        ) : (
                          <>
                            <Dropdown.Item style={{ color: "white" }} className="d-flex align-items-center" onClick={() => navigate("/profile")}>
                              <Person style={{ objectFit: "cover", width: "20px", height: "20px", color: "red" }} />
                              <b className="ms-2">Profile</b>
                            </Dropdown.Item>
                            <Dropdown.Item style={{ color: "white" }} className="d-flex align-items-center mt-2" onClick={() => navigate("/pay")}>
                              <Payment style={{ objectFit: "cover", width: "20px", height: "20px", color: "red" }} />
                              <b className="ms-2">Pay</b>
                            </Dropdown.Item>
                          </>
                        )}
                        <hr style={{ color: "white" }} />
                        <Dropdown.Item style={{ color: "white" }} className="d-flex align-items-center" onClick={handleLogout}>
                          <Logout style={{ objectFit: "cover", width: "20px", height: "20px", color: "red" }} />
                          <b className="ms-2">Logout</b>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      {/* // Login Modal */}
      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Body
          style={{
            backgroundColor: "#1F1F1F",
            color: "white",
            padding: "30px",
            border: "2px solid black",
          }}
          className="rounded"
        >
          <h2>
            <b>Login</b>
          </h2>
          <Form className="mt-4">
            <InputGroup className="mb-3 mt-3">
              <Form.Control
                placeholder="Email"
                style={{
                  backgroundColor: "#4C4C4C",
                  borderColor: "white",
                  color: "white",
                }}
                onChange={handleChangeLogin}
                name="email"
                onKeyDown={(e) => {
                  if (e.key == "Enter") handleSubmitLogin();
                }}
              />
            </InputGroup>
            <InputGroup className="mb-3 mt-3">
              <Form.Control
                placeholder="Password"
                style={{
                  backgroundColor: "#4C4C4C",
                  borderColor: "white",
                  color: "white",
                }}
                onChange={handleChangeLogin}
                name="password"
                type="password"
                onKeyDown={(e) => {
                  if (e.key == "Enter") handleSubmitLogin();
                }}
              />
            </InputGroup>
            <Button
              style={{
                backgroundColor: "#E50914",
                color: "white",
                borderRadius: "5px",
              }}
              className="w-100 pt-2 pb-2 mt-3"
              onClick={handleSubmitLogin}
            >
              <b>Login</b>
            </Button>
            <div className="mt-3 w-100 d-flex justify-content-center">
              <p>
                Don't have an account ?
                <b
                  style={{ cursor: "pointer" }}
                  className="ms-1"
                  onClick={() => {
                    console.log("oke");
                    handleCloseLogin();
                    handleShowRegister();
                  }}
                >
                  Register Here
                </b>
              </p>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* // Register Modal */}
      <Modal show={showRegister} onHide={handleCloseRegister}>
        <Modal.Body
          style={{
            backgroundColor: "#1F1F1F",
            color: "white",
            padding: "30px",
            border: "2px solid black",
          }}
          className="rounded"
        >
          <h2>
            <b>Register</b>
          </h2>
          <Form className="mt-4">
            <InputGroup className="mb-3 mt-3">
              <Form.Control
                placeholder="Email"
                value={dataRegister.email}
                style={{
                  backgroundColor: "#4C4C4C",
                  borderColor: "white",
                  color: "white",
                }}
                onChange={handleChangeRegister}
                name="email"
                onKeyDown={(e) => {
                  if (e.key == "Enter") handleSubmitRegister();
                }}
              />
            </InputGroup>
            <InputGroup className="mb-3 mt-3">
              <Form.Control
                placeholder="Password"
                value={dataRegister.password}
                style={{
                  backgroundColor: "#4C4C4C",
                  borderColor: "white",
                  color: "white",
                }}
                type="password"
                onChange={handleChangeRegister}
                onKeyDown={(e) => {
                  if (e.key == "Enter") handleSubmitRegister();
                }}
                name="password"
              />
            </InputGroup>
            <InputGroup className="mb-3 mt-3">
              <Form.Control
                placeholder="Full Name"
                value={dataRegister.fullName}
                style={{
                  backgroundColor: "#4C4C4C",
                  borderColor: "white",
                  color: "white",
                }}
                onChange={handleChangeRegister}
                onKeyDown={(e) => {
                  if (e.key == "Enter") handleSubmitRegister();
                }}
                name="fullName"
              />
            </InputGroup>
            <InputGroup className="mb-3 mt-3">
              <Form.Control
                placeholder="Gender"
                value={dataRegister.gender}
                style={{
                  backgroundColor: "#4C4C4C",
                  borderColor: "white",
                  color: "white",
                }}
                onChange={handleChangeRegister}
                onKeyDown={(e) => {
                  if (e.key == "Enter") handleSubmitRegister();
                }}
                name="gender"
              />
            </InputGroup>
            <InputGroup className="mb-3 mt-3">
              <Form.Control
                placeholder="Phone"
                value={dataRegister.phone}
                style={{
                  backgroundColor: "#4C4C4C",
                  borderColor: "white",
                  color: "white",
                }}
                onChange={handleChangeRegister}
                onKeyDown={(e) => {
                  if (e.key == "Enter") handleSubmitRegister();
                }}
                name="phone"
              />
            </InputGroup>
            <InputGroup className="mb-3 mt-3">
              <Form.Control
                placeholder="Address"
                value={dataRegister.address}
                style={{
                  backgroundColor: "#4C4C4C",
                  borderColor: "white",
                  color: "white",
                }}
                onChange={handleChangeRegister}
                onKeyDown={(e) => {
                  if (e.key == "Enter") handleSubmitRegister();
                }}
                name="address"
              />
            </InputGroup>
            <Button
              style={{
                backgroundColor: "white",
                color: "#E50914",
                borderRadius: "5px",
              }}
              className="w-100 pt-2 pb-2 mt-3"
              onClick={handleSubmitRegister}
            >
              <b>Register</b>
            </Button>
            <div className="mt-3 w-100 d-flex justify-content-center">
              <p>
                Already have an account ?
                <b
                  style={{ cursor: "pointer" }}
                  className="ms-1"
                  onClick={() => {
                    console.log("oke");
                    handleCloseRegister();
                    handleShowLogin();
                  }}
                >
                  Login Here
                </b>
              </p>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <div style={{ marginBottom: "50px" }}></div>
    </>
  );
}

export default NavbarComponent;
