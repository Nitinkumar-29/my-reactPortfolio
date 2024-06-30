import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import loadingIcon from "../images/loadingt.gif";
import { FaEye } from "react-icons/fa";
import AuthContext from "../../Context/authentication_/AuthContext";

const Login = (props) => {
  const {
    setCredentials,
    credentials,
    isLoading,
    login,
    togglePasswordType,
    passwordType,
    toggleRef,
  } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    login();
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      {!isLoading ? (
        <div
          className={`login-box text-${
            props.mode === "Dark" ? "light" : "dark"
          } text-center`}
        >
          <h3>SignIn to Continue</h3>
          <div
            className={`login-form border border-${
              props.mode === "Dark" ? "light" : "dark"
            } rounded p-3`}
          >
            <form onSubmit={handleLogin}>
              <div className={`login-item`}>
                <label htmlFor="email">Email address:</label>
                <input
                  className={`text-${
                    props.mode === "Dark" ? "light" : "dark"
                  } border rounded border-${
                    props.mode === "Dark" ? "light" : "dark"
                  }  p-2`}
                  required
                  value={credentials.email}
                  onChange={onChange}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="E mail"
                />
              </div>
              <div className={`login-item`}>
                <label htmlFor="password">Password:</label>
                <div
                  className={`position-relative d-flex justify-items-between text-${
                    props.mode === "Dark" ? "light" : "dark"
                  } border rounded border-${
                    props.mode === "Dark" ? "light" : "dark"
                  }`}
                >
                  <input
                    required
                    value={credentials.password}
                    onChange={onChange}
                    ref={toggleRef}
                    minLength={8}
                    type={passwordType}
                    name="password"
                    id="password"
                    className="p-2"
                    placeholder="Password (atleast 8 characters)"
                  />
                  <FaEye
                    style={{
                      position: "absolute",
                      right: "1rem",
                      cursor: "pointer",
                    }}
                    onClick={togglePasswordType}
                  ></FaEye>
                </div>
                <small className="text-start mt-2 ps-2">
                  We will never share your credentials with anyone else
                </small>
              </div>
              <div className={`login-item`}>
                <label htmlFor="password">Secret key:</label>
                <div
                  className={`position-relative d-flex justify-items-between text-${
                    props.mode === "Dark" ? "light" : "dark"
                  } border rounded border-${
                    props.mode === "Dark" ? "light" : "dark"
                  }`}
                >
                  <input
                    required
                    value={credentials.secretKey}
                    onChange={onChange}
                    minLength={8}
                    type="password"
                    name="secretKey"
                    id="secretKey"
                    className="p-2"
                    placeholder="................."
                  />
                </div>
              </div>
              <div className="">
                <button
                  className={`mt-4 px-4 py-2 btn btn-outline-${
                    props.mode === "Dark" ? "light" : "dark"
                  }`}
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
            <div className="mt-5">
              <span className="">
                New User ?{" "}
                <Link
                  className={`text-${
                    props.mode === "Dark" ? "light" : "dark"
                  } text-decoration-underline underline-link-${
                    props.mode === "Dark" ? "light" : "dark"
                  }
                link-offset-2`}
                  to="/signUp"
                >
                  SignUp Now
                </Link>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="login-box">
          <img
            className="mx-auto"
            style={{ height: "3rem", width: "3rem" }}
            src={loadingIcon}
            alt=""
          />
        </div>
      )}
    </>
  );
};

export default Login;
