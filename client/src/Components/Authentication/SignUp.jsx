import React, { useContext } from "react";
import "../styles/SignUp.css";
import loadingIcon from "../images/loadingt.gif";
import { FaEye } from "react-icons/fa";
import AuthContext from "../../Context/authentication_/AuthContext";

const SignUp = (props) => {
  const {
    togglePasswordType,
    toggleRef,
    passwordType,
    isLoading,
    createAccountCredentials,
    setCreateAccountCredentials,
    secretKeyErrorMessage,
    signUp,
  } = useContext(AuthContext);

  const onChange = (e) => {
    setCreateAccountCredentials({
      ...createAccountCredentials,
      [e.target.name]: e.target.value,
    });
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    signUp();
  };

  return (
    <>
      {!isLoading ? (
        <div
          className={`SignUp-box text-${
            props.mode === "Dark" ? "light" : "dark"
          } text-center`}
        >
          <h3 className="mt-5">Only for Admin </h3>
          <div
            className={`SignUp-form border border-${
              props.mode === "Dark" ? "light" : "dark"
            } rounded p-3`}
          >
            <form onSubmit={handleSignUp}>
              <div className={`SignUp-item`}>
                <label htmlFor="name">Name:</label>
                <input
                  className={`text-${
                    props.mode === "Dark" ? "light" : "dark"
                  } border rounded border-${
                    props.mode === "Dark" ? "light" : "dark"
                  }  p-2`}
                  required
                  value={createAccountCredentials.name}
                  onChange={onChange}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                />
              </div>
              <div className={`SignUp-item`}>
                <label htmlFor="email">Email address:</label>
                <input
                  className={`text-${
                    props.mode === "Dark" ? "light" : "dark"
                  } border rounded border-${
                    props.mode === "Dark" ? "light" : "dark"
                  }  p-2`}
                  required
                  value={createAccountCredentials.email}
                  onChange={onChange}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="E mail"
                />
              </div>
              <div className={`SignUp-item`}>
                <label htmlFor="password">Set Password:</label>
                <div
                  className={`d-flex justify-items-between text-${
                    props.mode === "Dark" ? "light" : "dark"
                  } border rounded border-${
                    props.mode === "Dark" ? "light" : "dark"
                  }  p-2`}
                >
                  <input
                    required
                    value={createAccountCredentials.password}
                    onChange={onChange}
                    ref={toggleRef}
                    minLength={8}
                    type={passwordType}
                    name="password"
                    id="password"
                    placeholder="Password (atleast 8 characters)"
                  />
                  <FaEye
                    style={{ cursor: "pointer" }}
                    onClick={togglePasswordType}
                  ></FaEye>
                </div>
              </div>
              <div className={`SignUp-item`}>
                <label htmlFor="cpassword">Confirm Password:</label>
                <input
                  className={`text-${
                    props.mode === "Dark" ? "light" : "dark"
                  } border rounded border-${
                    props.mode === "Dark" ? "light" : "dark"
                  }  p-2`}
                  required
                  value={createAccountCredentials.cpassword}
                  onChange={onChange}
                  minLength={8}
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  placeholder="Must be same"
                />
              </div>
              <div className={`SignUp-item`}>
                <label htmlFor="secretKey">Secret Key:</label>
                <div
                  className={`d-flex justify-items-between text-${
                    props.mode === "Dark" ? "light" : "dark"
                  } border rounded border-${
                    props.mode === "Dark" ? "light" : "dark"
                  }  p-2`}
                >
                  <input
                    required
                    value={createAccountCredentials.secretKey}
                    onChange={onChange}
                    minLength={8}
                    type="password"
                    name="secretKey"
                    id="secretkey"
                    placeholder="....................."
                  />
                </div>
                <small className="text-start mt-2 ps-2">
                  We will never share your credentials with anyone else
                </small>
                {!isLoading && (
                  <span className="text-danger">{secretKeyErrorMessage}</span>
                )}
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
          </div>
        </div>
      ) : (
        <div
          className="d-flex justify-content-center"
          style={{ height: "76vh" }}
        >
          <img
            className="m-auto"
            src={loadingIcon}
            style={{ height: "3rem", width: "3rem" }}
            alt=""
          />
        </div>
      )}
    </>
  );
};

export default SignUp;
