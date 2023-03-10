import { AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import DashboardAdmin from "./Components/Admin/Dashboard/Dashboard";
import BoxContainer from "./Components/BoxContainer";
import Loading from "./Components/Loading";
import Nav from "./Components/Nav/Nav";
import { AdminProvider } from "./Contexts/AdminContext";
import { ClientProvider } from "./Contexts/ClientContext";
import { LoadingContext } from "./Contexts/LoadingContext";
import { UserContext } from "./Contexts/UserContext";
import AccessControl from "./Pages/Admin/AccessControl";
import Dept from "./Pages/Admin/Dept";
import Docs from "./Pages/Admin/Docs";
import Management from "./Pages/Admin/Management";
import Students from "./Pages/Admin/Students";
import Auth from "./Pages/Auth";
import Dashboard from "./Pages/Client/Dashboard";

function App() {
  const { loading } = useContext(LoadingContext);
  const { userData } = useContext(UserContext);

  const location = useLocation();

  return (
    <div className="App">
      <AnimatePresence initial={false} mode="wait">
        {loading && <Loading key="loading" />}
      </AnimatePresence>
      <Nav />
      <BoxContainer>
        <AdminProvider>
          <AnimatePresence initial={false} mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  userData ? (
                    <Navigate
                      to={
                        userData.accessLevel === 2
                          ? "/admin/dashboard"
                          : "/client/dashboard"
                      }
                      state={location.pathname}
                    />
                  ) : (
                    <Auth />
                  )
                }
              />
              <Route
                path="/auth"
                element={userData ? <Navigate to={location.state} /> : <Auth />}
              />
              <Route
                path="/admin/dashboard"
                element={
                  userData?.accessLevel === 2 ? (
                    <DashboardAdmin />
                  ) : (
                    <Navigate to="/" state={location.pathname} />
                  )
                }
              />
              <Route
                path="/admin/access-control"
                element={
                  userData?.accessLevel === 2 ? (
                    <AccessControl />
                  ) : (
                    <Navigate to="/" state={location.pathname} />
                  )
                }
              />
              <Route
                path="/admin/dept"
                element={
                  userData?.accessLevel === 2 ? (
                    <Dept />
                  ) : (
                    <Navigate to="/" state={location.pathname} />
                  )
                }
              />
              <Route
                path="/admin/management"
                element={
                  userData?.accessLevel === 2 ? (
                    <Management />
                  ) : (
                    <Navigate to="/" state={location.pathname} />
                  )
                }
              />
              <Route
                path="/admin/students"
                element={
                  userData?.accessLevel === 2 ? (
                    <Students />
                  ) : (
                    <Navigate to="/" state={location.pathname} />
                  )
                }
              />
              <Route
                path="/admin/docs"
                element={
                  userData?.accessLevel === 2 ? (
                    <Docs />
                  ) : (
                    <Navigate to="/" state={location.pathname} />
                  )
                }
              />
              <Route
                path="/client/dashboard"
                element={
                  userData ? (
                    <ClientProvider>
                      <Dashboard />
                    </ClientProvider>
                  ) : (
                    <Navigate to="/" state={location.pathname} />
                  )
                }
              />
              <Route path="*" element={<h1>404</h1>} />
            </Routes>
          </AnimatePresence>
        </AdminProvider>
      </BoxContainer>
    </div>
  );
}

export default App;
