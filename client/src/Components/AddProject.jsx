import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProject = (props) => {
  const [addProject, setAddProject] = useState({
    title: "",
    description: "",
    githubLink: "",
    deployedLink: "",
    tags: [], // Change tag to tags and make it plural to represent an array
  });
  const navigate = useNavigate();
  const [tagInput, setTagInput] = useState("");
  const host = "http://localhost:8000";
  const token = localStorage.getItem("token");

  const onChange = (e) => {
    setAddProject({ ...addProject, [e.target.name]: e.target.value });
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !addProject.tags.includes(tagInput.trim())) {
      setAddProject((prevProject) => ({
        ...prevProject,
        tags: [...prevProject.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (index) => {
    setAddProject((prevProject) => ({
      ...prevProject,
      tags: prevProject.tags.filter((_, i) => i !== index),
    }));
  };

  const handleAddProject = async () => {
    try {
      const response = await fetch(`${host}/api/projects/addProject`, {
        method: "POST",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addProject), // Pass addProject directly, not wrapped in another object
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      navigate("/");
      setAddProject({
        title: "",
        description: "",
        githubLink: "",
        deployedLink: "",
        tags: [],
      });
    } catch (error) {
      console.error("Failed to add project:", error);
      console.log(addProject);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "83vh",
      }}
    >
      <div
        style={{
          padding: "20px 0px",
          height: "90%",
        }}
      >
        <h3
          className={`text-${
            props.mode === "Dark" ? "light" : "dark-emphasis"
          }`}
          style={{ width: "fit-content", margin: "10px auto" }}
        >
          Add Project
        </h3>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "fit-content",
            // width:"100%"
          }}
        >
          <input
            className={`text-${
              props.mode === "Dark" ? "light" : "dark-emphasis"
            }`}
            type="text"
            style={{
              borderBottom: `1px solid ${
                props.mode === "Dark" ? "gray" : "black"
              }`,
              minWidth: "200px",
              width: "300px",
              padding: "4px",
              margin: "8px",
              background: "transparent",
            }}
            required
            onChange={onChange}
            value={addProject.title}
            name="title"
            placeholder="Project Title"
          />
          <input
            className={`text-${
              props.mode === "Dark" ? "light" : "dark-emphasis"
            }`}
            type="text"
            style={{
              borderBottom: `1px solid ${
                props.mode === "Dark" ? "gray" : "black"
              }`,
              minWidth: "200px",
              width: "300px",
              padding: "4px",
              margin: "8px",
              background: "transparent",
            }}
            required
            onChange={onChange}
            value={addProject.description}
            name="description"
            placeholder="Project Description"
          />
          <input
            className={`text-${
              props.mode === "Dark" ? "light" : "dark-emphasis"
            }`}
            type="text"
            style={{
              borderBottom: `1px solid ${
                props.mode === "Dark" ? "gray" : "black"
              }`,
              minWidth: "200px",
              width: "300px",
              padding: "4px",
              margin: "8px",
              background: "transparent",
            }}
            required
            onChange={onChange}
            value={addProject.githubLink}
            name="githubLink"
            placeholder="Project Github link"
          />
          <input
            className={`text-${
              props.mode === "Dark" ? "light" : "dark-emphasis"
            }`}
            type="text"
            style={{
              borderBottom: `1px solid ${
                props.mode === "Dark" ? "gray" : "black"
              }`,
              minWidth: "200px",
              width: "300px",
              padding: "4px",
              margin: "8px",
              background: "transparent",
            }}
            onChange={onChange}
            value={addProject.deployedLink}
            name="deployedLink"
            placeholder="Project Deployed Link"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignContent: "start",
              alignItems: "start",
              margin: "8px",
            }}
          >
            <input
              className={`text-${
                props.mode === "Dark" ? "light" : "dark-emphasis"
              }`}
              type="text"
              style={{
                borderBottom: `1px solid ${
                  props.mode === "Dark" ? "gray" : "black"
                }`,
                minWidth: "200px",
                width: "300px",
                padding: "4px",
                background: "transparent",
              }}
              onChange={handleTagInputChange}
              onKeyDown={handleTagKeyDown}
              value={tagInput}
              name="tagInput"
              placeholder="Tag"
            />
            <button
              type="button"
              style={{
                border: `1px solid ${props.mode === "Dark" ? "gray" : "black"}`,
                padding: "3px 8px",
                margin: "6px 0px",
                borderRadius: "4px",
                fontSize: "14px",
                color: `${props.mode === "Dark" ? "white" : "black"}`,
              }}
              onClick={handleAddTag}
            >
              Add
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "200px",
              gap: "8px",
              margin: "8px",
            }}
          >
            {addProject.tags.map((tag, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "4px 8px",
                  backgroundColor: "#e5e7eb",
                  borderRadius: "9999px",
                }}
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(index)}
                  style={{
                    background: "none",
                    cursor: "pointer",
                    fontSize: "1.25rem",
                    lineHeight: "1",
                    color: "#9ca3af",
                  }}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <button
            className={`text-${
              props.mode === "Dark" ? "light" : "dark-emphasis"
            }`}
            style={{
              margin: "8px",
              padding: "8px 16px",
              border: `1px solid ${props.mode === "Dark" ? "gray" : "black"}`,
              borderRadius: "6px",
            }}
            type="button"
            onClick={handleAddProject}
          >
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
