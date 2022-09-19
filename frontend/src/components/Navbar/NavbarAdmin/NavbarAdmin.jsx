import React, { useState } from "react";
import "./NavbarAdmin.scss";
import { images } from "../../../contstans";
import { ArrowDropDown, Logout, Movie } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Login, Register } from "../../../pages";

const NavbarAdmin = (props) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const [loginShow, setLoginShow] = React.useState(false);
  const [registerShow, setRegisterShow] = React.useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <>
      <nav className={isScrolled ? "app__navbar-admin scrolled" : "app__navbar-admin"}>
        <div className="app__navbar-admin_container">
          <div className="app__navbar-admin-left">
            <a href="#home">
              <img src={images.logo} alt="logo-dumbflix" />
            </a>
          </div>
          {props.isLogin ? (
            <div className="app__navbar-admin-right">
              <img src={images.avartar} alt="avatar" />
              <div className="app__navbar-admin-dropdown">
                <ArrowDropDown className="icon" />
                <div className="dropdown__options">
                  <Link to="/">
                    <Movie className="icon_links" />
                    Film
                  </Link>
                  <div />
                  <button className="nav-border">
                    <Logout className="icon_links" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="app__navbar-admin-button">
              <Button className="login head-text" onClick={() => setLoginShow(true)}>
                Login
              </Button>
              <Login show={loginShow} onHide={() => setLoginShow(false)} setIsLogin={props.setIsLogin} isLogin={props.isLogin} />
              <Button className="register head-text" onClick={() => setRegisterShow(true)}>
                Register
              </Button>
              <Register show={registerShow} onHide={() => setRegisterShow(false)} />
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
export default NavbarAdmin;
