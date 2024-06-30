import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/UserProfile.css";
import loadingbar from "../images/loadingt.gif";
import AuthContext from "../../Context/authentication_/AuthContext";
import { FaUser } from "react-icons/fa";

const UserProfile = (props) => {
  const navigate = useNavigate();
  const { userDetails, user, token, isLoading } =
    useContext(AuthContext);

  useEffect(() => {
    userDetails();
  }, []);

  return (
    <>
      <div
        className="d-flex justify-content-start mt-4 mx-auto"
        style={{ width: "90%" }}
      >
        <div
          id="main-item-profile"
          className={` rounded-2 justify-content-center d-flex`}
          style={{
            marginBottom: "20px",
            backgroundColor: `${
              props.mode === "Dark" ? "rgb(11, 17, 31)" : "white"
            }`,
          }}
        >
          <div
            className="mt-4 rounded px-4 d-flex flex-column align-items-start"
            style={{ width: "100%" }}
          >
            <div className="">
              <img
                style={{ height: "2.5rem", cursor: "pointer" }}
                src={
                  props.mode === "Dark" ? (
                    <FaUser color="white" />
                  ) : (
                    <FaUser color="black" />
                  )
                }
                alt=""
              />
            </div>
            <hr
              className={`bg-${props.mode === "Dark" ? "white" : "black"}`}
              style={{ width: "100%" }}
            />
            <div>
              <h5
                className={`text-${
                  props.mode === "Dark" ? "dark-emphasis" : "dark"
                }`}
              >
                User Details
              </h5>
              {isLoading ? (
                <div className="my-3">
                  <h6
                    style={{ fontSize: "1rem" }}
                    className={`text-${
                      props.mode === "Dark" ? "light" : "dark"
                    }`}
                  >
                    Name : {user.name}
                  </h6>
                  <h6
                    style={{ fontSize: "1rem" }}
                    className={`text-${
                      props.mode === "Dark" ? "light" : "dark"
                    }`}
                  >
                    Email : {user.email}
                  </h6>
                  <h6
                    style={{ fontSize: "1rem" }}
                    className={`text-${
                      props.mode === "Dark" ? "light" : "dark"
                    }`}
                  >
                    User Id : {user.userId}
                  </h6>
                </div>
              ) : (
                // <span>loading user data</span>
                <div className="text-center">
                  <img
                    style={{ width: "20px", height: "20px" }}
                    src={loadingbar}
                    alt=""
                  />
                </div>
              )}
            </div>
            <hr className="bg-black" style={{ width: "100%" }} />
            <Link to="/addProject" className="text-success">
              Add Project
            </Link>
            <hr className="bg-black" style={{ width: "100%" }} />
            <div className="d-flex flex-column">
              <button
                onClick={() => {
                  if (token) {
                    localStorage.removeItem("token");
                    navigate("/");
                  }
                }}
                className={`mt-2 btn btn-success text-light link-offset-2`}
              >
                LogOut
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
