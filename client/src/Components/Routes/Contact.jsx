import React from "react";
import "../styles/Contact.css";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";

const Contact = (props) => {
  return (
    <>
      <div
        className={`mt-5 d-flex flex-column`}
        style={{ height: "100%", fontFamily: "sans-serif" }}
      >
        <div>
          <h1
            className={`head-contact text-center text-${
              props.mode === "Dark" ? "light" : "dark"
            }`}
          >
            Contact
          </h1>
          <div className={`main-content`}>
            <div className="form-content">
              <h3
                className={`text-decoration-underline  link-offset-2 text-${
                  props.mode === "Dark" ? "light" : "dark"
                }`}
              >
                Get in Touch
              </h3>
              <p
                className={`mt-4 sm:fs-5 text-${
                  props.mode === "Dark" ? "light" : "dark"
                }`}
              >
                Dropping a line to say g'day, ask for my resume or see if we can
                build something amazing together? I'd love to hear from you!
              </p>

              <div className={`my-5 d-flex flex-column`}>
                <span
                  className={`text-${props.mode === "Dark" ? "light" : "dark"}`}
                >
                  Fill in your info in the form below and I look forward to
                  hearing from you!
                </span>
                <form action="https://formspree.io/f/mrgwgznd" method="POST">
                  <div className="d-flex flex-column mx-1 my-3">
                    <label
                      className={`text-${
                        props.mode === "Dark" ? "light" : "dark"
                      }`}
                      htmlFor="name"
                    >
                      Name:
                    </label>
                    <input
                      className={`rounded my-1 text-${
                        props.mode === "Dark" ? "light" : "dark"
                      } p-2`}
                      style={{
                        backgroundColor: "inherit",
                        border: `${
                          props.mode === "Dark"
                            ? "1px solid white"
                            : "1px solid black"
                        }`,
                      }}
                      required
                      name="name"
                      minLength={4}
                      type="text"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="d-flex flex-column mx-1 my-3">
                    <label
                      className={`text-${
                        props.mode === "Dark" ? "light" : "dark"
                      }`}
                      htmlFor="name"
                    >
                      Email:
                    </label>
                    <input
                      className={`rounded my-1 text-${
                        props.mode === "Dark" ? "light" : "dark"
                      } p-2`}
                      style={{
                        backgroundColor: "inherit",
                        border: `${
                          props.mode === "Dark"
                            ? "1px solid white"
                            : "1px solid black"
                        }`,
                      }}
                      name="email"
                      required
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="d-flex flex-column mx-1 my-3">
                    <label
                      className={`text-${
                        props.mode === "Dark" ? "light" : "dark"
                      }`}
                      htmlFor="name"
                    >
                      Subject:
                    </label>
                    <input
                      className={`rounded my-1 text-${
                        props.mode === "Dark" ? "light" : "dark"
                      } p-2`}
                      style={{
                        backgroundColor: "inherit",
                        border: `${
                          props.mode === "Dark"
                            ? "1px solid white"
                            : "1px solid black"
                        }`,
                      }}
                      name="subject"
                      required
                      minLength={5}
                      type="text"
                      placeholder="What is subject ?"
                    />
                  </div>
                  <div className="d-flex flex-column mx-1 my-3">
                    <label
                      className={`text-${
                        props.mode === "Dark" ? "light" : "dark"
                      }`}
                      htmlFor="name"
                    >
                      Message:
                    </label>
                    <textarea
                      className={`rounded p-2 my-1 text-${
                        props.mode === "Dark" ? "light" : "dark"
                      }`}
                      style={{
                        backgroundColor: "inherit",
                        border: `${
                          props.mode === "Dark"
                            ? "1px solid white"
                            : "1px solid black"
                        }`,
                      }}
                      required
                      name="message"
                      minLength={20}
                      rows={5}
                      type="text"
                      placeholder="Message regarding the subject"
                    />
                  </div>
                  <button
                    className={`submit-button fs-5 btn btn-outline-${
                      props.mode === "Dark" ? "light" : "dark"
                    }`}
                    type="submit"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
            <div
              className={`social-content mx-2 text-${
                props.mode === "Dark" ? "light" : "dark"
              }`}
            >
              <div className={`mt-5 `}>
                <h5>Feeling social? Find me on these online spaces too!</h5>
              </div>

              <div className="d-flex my-5">
                <Link to="https://github.com/Nitinkumar-29">
                  <FaGithub className="mx-2 cursor-pointer" size={25} role="button" />
                </Link>
                <Link to="https://twitter.com/Nitinkumar_29">
                  <FaXTwitter className="mx-2 cursor-pointer" size={25} role="button" />
                </Link>
                <Link to="https://www.linkedin.com/in/nitin-kumar2905/">
                  <FaLinkedin className="mx-2 cursor-pointer" size={25} role="button" />
                </Link>
                <Link to="https://instagram.com/nitin__nimble">
                  <FaInstagram className="mx-2 cursor-pointer" size={25} role="button" />
                </Link>
              </div>
              <div
                className="align-items-center d-flex"
                style={{ width: "fit-content" }}
              >
                <span className="ms-2 fs-2 ">Hire me on : &nbsp;</span>
                <button className={`fs-5 btn btn-outline-success`}>
                  <a
                    style={{ textDecoration: "none", color: "inherit" }}
                    rel="noreferrer"
                    href="https://www.upwork.com/freelancers/~012f602cb7e758622c"
                    target="_blank"
                  >
                    Upwork
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
