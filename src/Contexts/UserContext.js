import { createContext, useContext, useEffect, useState } from "react";
import { LoadingContext } from "./LoadingContext";
import API from "../Utils/API";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { setLoading } = useContext(LoadingContext);

  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("withCreds"))
      API.get("/auth/refresh")
        .then((res) => {
          if (res.data?.success) {
            setUser(res.data?.token);
          } else {
            setUser(null);
            localStorage.removeItem("withCreds");
            throw new Error("Failed to refresh token");
          }
        })
        .catch((err) => {
          setUser(null);
        });
  }, []);

  useEffect(() => {
    if (user) {
      API.get("/user/user").then((res) => {
        if (res.data?.success) {
          setUserData(res?.data?.user);
        } else {
          throw new Error(res.data.message);
        }
      });
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await API.post("/auth/register", { ...userData });

      if (res.data?.success) {
        setUser(res.data?.token);
        localStorage.setItem("withCreds", true);
      } else {
        throw new Error(res.data.message);
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userData,
        register,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
