import { createContext, useContext } from "react";
import { LoadingContext } from "./LoadingContext";
import API from "../Utils/API";

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const { setLoading } = useContext(LoadingContext);

  const getStudents = async () => {
    try {
      setLoading(true);
      const res = await API.get("/client/students");

      if (!res.data?.success) throw new Error(res.data.message);

      return { success: true, students: res.data.students };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const getStudentReports = async (student) => {
    try {
      setLoading(true);
      const res = await API.get("/client/student-reports", {
        params: { student },
      });

      if (!res.data?.success) throw new Error(res.data.message);

      return { success: true, reports: res.data.reports };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientContext.Provider
      value={{
        getStudents,
        getStudentReports,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
