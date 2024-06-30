import React from "react";

const Notfound = (props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "83vh",
      }}
    >
      <h1
        className={`text-${props.mode === "Dark" ? "light" : "dark-emphasis"}`}
      >
        404 - Page Not Found
      </h1>
    </div>
  );
};

export default Notfound;
