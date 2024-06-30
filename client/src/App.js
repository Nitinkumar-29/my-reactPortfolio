import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { useState, useEffect } from "react";
import Footer from "./Components/Footer";
import ProjectsRoute from "./Components/Routes/ProjectsRoute";
import ServicesRoute from "./Components/Routes/ServicesRoute";
import Contact from "./Components/Routes/Contact";
import Login from "./Components/Authentication/Login";
import SignUp from "./Components/Authentication/SignUp";
import { Toaster } from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";
import UserProfile from "./Components/Routes/UserProfile";
import { Analytics } from "@vercel/analytics/react";
import { ProjectProvider } from "./Context/projects/ProjectContext";
import { AuthProvider } from "./Context/authentication_/AuthContext";
import Notfound from "./Components/Notfound";
import AddProject from "./Components/AddProject";

function App() {
  const [mode, setMode] = useState("Light");
  const token = localStorage.getItem("token");
  useEffect(() => {
    const savedMode = localStorage.getItem("mode");
    if (savedMode) {
      setMode(savedMode);
    }
    // eslint-disable-next-line
  }, []);

  const toggleMode = () => {
    const newMode = mode === "Light" ? "Dark" : "Light";
    localStorage.setItem("mode", newMode);
    setMode(newMode);
  };

  const [progress, setProgress] = useState(0);
  document.body.style.backgroundColor =
    mode === "Dark" ? "rgb(17 24 39)" : "#D6D5DB";

  const AuthRequire = ({ children }) => {
    return token ? children : <Navigate to="/" />;
  };
  return (
    <Router>
      <ProjectProvider>
        <AuthProvider>
          <div>
            <Toaster
              position="top-center"
              toastOptions={{ duration: 1000 }}
              reverseOrder={false}
            />
          </div>
          <LoadingBar
            height={3}
            color={mode === "Dark" ? "white" : "rgb(17, 24, 39)"}
            backgroundColor={mode === "Dark" ? "white" : "black"}
            progress={progress}
          />
          <Navbar
            mode={mode}
            toggleMode={toggleMode}
            setProgress={setProgress}
          />
          <Analytics />
          <Routes>
            <Route
              exact
              index
              element={<Home mode={mode} setProgress={setProgress} />}
            />
            <Route
              exact
              path="/"
              element={
                <Home
                  setProgress={setProgress}
                  mode={mode}
                  toggleMode={toggleMode}
                />
              }
            />
            <Route
              exact
              path="/projects"
              element={
                <ProjectsRoute
                  setProgress={setProgress}
                  mode={mode}
                  toggleMode={toggleMode}
                />
              }
            />
            <Route
              exact
              path="/services"
              element={
                <ServicesRoute
                  setProgress={setProgress}
                  mode={mode}
                  toggleMode={toggleMode}
                />
              }
            />
            <Route
              exact
              path="/contact"
              element={
                <Contact
                  setProgress={setProgress}
                  mode={mode}
                  toggleMode={toggleMode}
                />
              }
            />
            <Route
              exact
              path="/adminLogin"
              element={
                <Login
                  setProgress={setProgress}
                  mode={mode}
                  toggleMode={toggleMode}
                />
              }
            />
            <Route
              exact
              path="/adminSignUp"
              element={
                <SignUp
                  setProgress={setProgress}
                  mode={mode}
                  toggleMode={toggleMode}
                />
              }
            />
            <Route
              exact
              path="/adminProfile"
              element={
                <AuthRequire>
                  <UserProfile
                    setProgress={setProgress}
                    mode={mode}
                    toggleMode={toggleMode}
                  />
                </AuthRequire>
              }
            />
            <Route
              exact
              path="/addProject"
              element={
                <AuthRequire>
                  <AddProject
                    setProgress={setProgress}
                    mode={mode}
                    toggleMode={toggleMode}
                  />
                </AuthRequire>
              }
            />
            <Route path="*" element={<Notfound />} />
          </Routes>
          <Footer mode={mode} />
        </AuthProvider>
      </ProjectProvider>
    </Router>
  );
}

export default App;
