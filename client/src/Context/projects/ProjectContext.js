import { createContext } from "react";
import { useState } from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const host = "https://nitinkumar-backend.vercel.app";
  // const host = "http://localhost:8000";

  const updateProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${host}/api/projects/fetchAllProjects`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setProjects(data.allProjects);
        // console.log(data.projects);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <ProjectContext.Provider
      value={{
        updateProjects,
        setLoading,
        loading,
        projects,
        host,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
