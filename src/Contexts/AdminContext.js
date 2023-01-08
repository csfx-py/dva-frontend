import { createContext, useContext } from "react";
import API from "../Utils/API";
import { LoadingContext } from "./LoadingContext";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const { setLoading } = useContext(LoadingContext);

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/all-users");

      if (!res.data?.success) throw new Error(res.data.message);

      return { success: true, users: res.data.users };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const getDepts = async () => {
    try {
      setLoading(true);

      const res = await API.get("/admin/depts");

      if (!res.data?.success) throw new Error(res.data.message);

      return { success: true, depts: res.data.depts };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const userApproval = async (userId, accessLevel) => {
    try {
      setLoading(true);
      const res = await API.put("/admin/edit-access-level", {
        userId,
        accessLevel,
      });

      if (!res.data?.success) throw new Error(res.data.message);

      const { users } = await getAllUsers();

      return { success: true, users };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const addDept = async (name, code) => {
    try {
      setLoading(true);
      const res = await API.post("/admin/create-dept", {
        name,
        code,
      });

      if (!res.data?.success) throw new Error(res.data.message);

      const { depts } = await getDepts();

      return { success: true, depts };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const updateDept = async (deptId, name, code) => {
    try {
      setLoading(true);
      const res = await API.put("/admin/edit-dept", {
        deptId,
        name,
        code,
      });

      if (!res.data?.success) throw new Error(res.data.message);

      const { depts } = await getDepts();

      return { success: true, depts };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const deleteDept = async (deptId) => {
    try {
      setLoading(true);
      const res = await API.delete("/admin/delete-dept", {
        data: { deptId },
      });

      if (!res.data?.success) throw new Error(res.data.message);

      const { depts } = await getDepts();

      return { success: true, depts };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        userApproval,
        getAllUsers,
        getDepts,
        addDept,
        updateDept,
        deleteDept,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
