import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./styles/Navbar.css";
import logo from "./images/pro.png";
import { toast } from "react-hot-toast";
import { FaMoon, FaSun, FaUserAlt } from "react-icons/fa";

const Navbar = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const contact = () => {
    navigate("/contact");
    window.scrollTo(0, 0);
  };
  const services = () => {
    navigate("/contact");
    window.scrollTo(0, 0);
  };

  return (
    <>
      <nav
        id="main-navbar"
        className={`shadow-${
          props.mode === "Light" ? "lg" : "nav"
        } navbar navbar-expand-lg bg-${
          props.mode === "Dark" ? "dark-emphasis" : "light"
        } navbar-${props.mode}`}
        style={{ fontFamily: "sans-serif" }}
      >
        <div className="container-fluid">
          <Link
            to="/"
            className="text-decoration-none mx-1 d-flex align-items-center"
          >
            <img src={logo} style={{ width: "65px", height: "40px" }} alt="" />
            <span
              className={`head-text mx-3 text-${
                props.mode === "Light" ? "dark" : "light"
              }`}
            >
              Nitin kumar
            </span>
          </Link>
          <button
            className={`navbar-toggler border border-${
              props.mode === "Light" ? "dark" : "light"
            } bg-light`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className={`navbar-toggler-icon`}></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav d-flex flex-end ms-auto me-5 mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`mx-1 nav-link ${
                    location.pathname === "/"
                      ? "text-decoration-underline"
                      : "text-decoration-none"
                  } link-underline-success link-offset-3 text-${
                    props.mode === "Dark" ? "light" : "dark"
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`mx-1 nav-link ${
                    location.pathname === "/projects"
                      ? "text-decoration-underline"
                      : "text-decoration-none"
                  } link-underline-success link-offset-3 text-${
                    props.mode === "Dark" ? "light" : "dark"
                  }`}
                  to="/projects"
                >
                  Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  onClick={services}
                  className={`mx-1 nav-link ${
                    location.pathname === "/services"
                      ? "text-decoration-underline"
                      : "text-decoration-none"
                  } link-underline-success link-offset-3 text-${
                    props.mode === "Dark" ? "light" : "dark"
                  }`}
                  to="/services"
                >
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  onClick={contact}
                  className={`mx-1 nav-link ${
                    location.pathname === "/contact"
                      ? "text-decoration-underline"
                      : "text-decoration-none"
                  } link-underline-success link-offset-3 text-${
                    props.mode === "Dark" ? "light" : "dark"
                  }`}
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <div
              className="mx-4"
              onClick={props.toggleMode}
              style={{ cursor: "pointer" }}
            >
              {props.mode === "Dark" ? (
                <FaSun size={25} color="orange" />
              ) : (
                <FaMoon size={25} color="skyBlue" />
              )}
            </div>
            {token && (
              <Link className="mx-2" to="/adminProfile">
                <FaUserAlt className="" color="gray" size={25} />
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
