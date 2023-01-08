import { AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import DashboardAdmin from "./Components/Admin/Dashboard/Dashboard";
import BoxContainer from "./Components/BoxContainer";
import OnBoard from "./Components/Client/Dashboard/OnBoardForm";
import Loading from "./Components/Loading";
import Nav from "./Components/Nav/Nav";
import { AdminProvider } from "./Contexts/AdminContext";
import { LoadingContext } from "./Contexts/LoadingContext";
import { UserContext } from "./Contexts/UserContext";
import Dept from "./Pages/Admin/Dept";
import Students from "./Pages/Admin/Students";
import Auth from "./Pages/Auth";

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
                path="/client/dashboard"
                element={
                  userData ? (
                    <OnBoard />
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
