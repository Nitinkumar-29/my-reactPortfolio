import React, { useRef, useState } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children, props }) => {
  const toggleRef = useRef();
  const [passwordType, setPasswordType] = useState("password");

  const [secretKeyErrorMessage, setSecretkeyErrorMessage] = useState("");
  const hiddenKey = "nitinkumar2905@2405";
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", userId: "" });
  const host = "https://nitinkumar-backend.vercel.app";
  // const host = "http://localhost:8000";
  const token = localStorage.getItem("token");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    secretKey: "",
  });
  const [createAccountCredentials, setCreateAccountCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    secretKey: "",
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordType = () => {
    toggleRef.current.click();
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const signUp = async () => {
    setIsLoading(true);
    const { name, email, password, cpassword } = createAccountCredentials;

    if (hiddenKey === createAccountCredentials.secretKey) {
      if (password === cpassword) {
        try {
          const response = await fetch(`${host}/api/auth/createUser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              password,
              cpassword,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to create user.");
          }

          const json = await response.json();
          setIsLoading(false);
          if (json.success) {
            localStorage.setItem("token", json.authToken);
            navigate("/");
            toast.success("Account created successfully!", {
              style: {
                borderRadius: "10px",
                background: `${props.mode === "Dark" ? "#fff" : "#333"}`,
                color: `${props.mode === "Dark" ? "#333" : "#fff"}`,
              },
            });
          } else {
            toast.error("Cannot process right now, Sorry!", {
              style: {
                borderRadius: "10px",
                background: `${props.mode === "Dark" ? "#fff" : "#333"}`,
                color: `${props.mode === "Dark" ? "#333" : "#fff"}`,
              },
            });
          }
        } catch (error) {
          setIsLoading(false);
          toast.error("User already exists with this email", {
            style: {
              borderRadius: "10px",
              background: `${props.mode === "Dark" ? "#fff" : "#333"}`,
              color: `${props.mode === "Dark" ? "#333" : "#fff"}`,
            },
          });
        }
      } else {
        setIsLoading(false);
        toast.error("Password conflict!", {
          style: {
            borderRadius: "10px",
            background: `${props.mode === "Dark" ? "#fff" : "#333"}`,
            color: `${props.mode === "Dark" ? "#333" : "#fff"}`,
          },
        });
      }
    } else {
      console.log("wrong secret key");
      setIsLoading(false);
      setSecretkeyErrorMessage("wrong secret key");
    }
  };

  const login = async () => {
    setIsLoading(true);
    if (hiddenKey === credentials.secretKey) {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        navigate("/");

        setIsLoading(false);
        toast.success("Successfully logged In!", {
          style: {
            borderRadius: "10px",
            background: `${props.mode === "Dark" ? "#fff" : "#333"}`,
            color: `${props.mode === "Dark" ? "#333" : "#fff"}`,
          },
        });
      } else {
        setIsLoading(false);
        toast.error("Invalid credentials !", {
          style: {
            borderRadius: "10px",
            background: `${props.mode === "Dark" ? "#fff" : "#333"}`,
            color: `${props.mode === "Dark" ? "#333" : "#fff"}`,
          },
        });
      }
    } else {
      setSecretkeyErrorMessage("Invalid secret key");
    }
  };

  const userDetails = async () => {
    if (token) {
      const response = await fetch(`${host}/api/auth/getUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      if (response.ok) {
        const json = await response.json();
        setUser({
          name: json.user.name,
          email: json.user.email,
          userId: json.user._id,
        });
        setLoading(true);
      } else {
        throw new Error("Failed to fetch user details");
      }
    }
  };
  return (
    <>
      <AuthContext.Provider
        value={{
          props,
          isLoading,
          secretKeyErrorMessage,
          credentials,
          setCredentials,
          login,
          passwordType,
          togglePasswordType,
          toggleRef,
          createAccountCredentials,
          setCreateAccountCredentials,
          signUp,
          userDetails,
          user,
          loading,
          token,
        }}
      >
        {children}
      </AuthContext.Provider>
      ;
    </>
  );
};

export default AuthContext;
