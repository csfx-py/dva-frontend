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

  const getVerifiers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/verifiers");

      if (!res.data?.success) throw new Error(res.data.message);

      return { success: true, users: res.data.users };
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

  const addAccessToVerifier = async (uid, sids) => {
    try {
      setLoading(true);
      const res = await API.put("/admin/add-access-to-verifier", {
        uid,
        sids,
      });

      if (!res.data?.success) throw new Error(res.data.message);

      const { users } = await getVerifiers();

      return { success: true, users };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const removeAccessFromVerifier = async (uid, sid) => {
    try {
      setLoading(true);
      const res = await API.put("/admin/remove-access-from-verifier", {
        uid,
        sid,
      });

      if (!res.data?.success) throw new Error(res.data.message);

      const { users } = await getVerifiers();

      return { success: true, users };
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

  const getSubjects = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/subjects");

      if (!res.data?.success) throw new Error(res.data.message);

      return { success: true, subjects: res.data.subjects };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const addSubject = async (name, code, credits) => {
    try {
      setLoading(true);
      const res = await API.post("/admin/create-subject", {
        name,
        code,
        credits,
      });

      if (!res.data?.success) throw new Error(res.data.message);

      const { subjects } = await getSubjects();

      return { success: true, subjects };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const updateSubject = async (subjectId, name, code, credits) => {
    try {
      setLoading(true);
      const res = await API.put("/admin/edit-subject", {
        subjectId,
        name,
        code,
        credits,
      });

      if (!res.data?.success) throw new Error(res.data.message);

      const { subjects } = await getSubjects();

      return { success: true, subjects };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const deleteSubject = async (subjectId) => {
    try {
      setLoading(true);
      const res = await API.delete("/admin/delete-subject", {
        data: { subjectId },
      });

      if (!res.data?.success) throw new Error(res.data.message);

      const { subjects } = await getSubjects();

      return { success: true, subjects };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const getStudents = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/students");

      if (!res.data?.success) throw new Error(res.data.message);

      return { success: true, students: res.data.students };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const getStudentsGroupedDept = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/students-group-dept");

      if (!res.data?.success) throw new Error(res.data.message);

      return { success: true, groups: res.data.groups };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const addStudent = async (data) => {
    try {
      setLoading(true);
      const res = await API.post("/admin/create-student", {
        ...data,
      });

      if (!res.data?.success) throw new Error(res.data.message);

      const { groups } = await getStudentsGroupedDept();

      return { success: true, groups };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const updateStudent = async (sid, data) => {
    try {
      setLoading(true);
      const res = await API.put("/admin/update-student", {
        sid,
        data,
      });

      if (!res.data?.success) throw new Error(res.data.message);

      const { groups } = await getStudentsGroupedDept();

      return { success: true, groups };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const getStudentReports = async (sid) => {
    try {
      setLoading(true);
      const res = await API.get("/admin/student-reports", {
        params: { sid },
      });

      if (!res.data?.success) throw new Error(res.data.message);

      return { success: true, reports: res.data.reports };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const addReport = async (formData) => {
    try {
      setLoading(true);
      const res = await API.post("/admin/add-report", formData);

      if (!res.data?.success) throw new Error(res.data.message);

      const { reports } = await getStudentReports(formData.get("studentId"));

      return { success: true, reports };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const uploadReportDoc = async (formData, studentId) => {
    try {
      setLoading(true);
      const res = await API.post("/admin/upload-report-doc", formData);

      if (!res.data?.success) throw new Error(res.data.message);

      const { reports } = await getStudentReports(studentId);

      return { success: true, reports };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const deleteReport = async (reportId, studentId) => {
    try {
      setLoading(true);
      const res = await API.delete("/admin/delete-report", {
        data: { reportId, studentId },
      });

      if (!res.data?.success) throw new Error(res.data.message);

      const { reports } = await getStudentReports(studentId);

      return { success: true, reports };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (studentId) => {
    try {
      setLoading(true);
      const res = await API.delete("/admin/delete-student", {
        data: { studentId },
      });

      if (!res.data?.success) throw new Error(res.data.message);

      const { groups } = await getStudentsGroupedDept();

      return { success: true, groups };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const getExams = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/exams");

      if (!res.data?.success) throw new Error(res.data.message);

      return { success: true, exams: res.data.exams };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const addExam = async (dept, subjects, examDate, semester) => {
    try {
      setLoading(true);
      const res = await API.post("/admin/create-exam", {
        dept,
        subjects,
        examDate,
        semester,
      });

      if (!res.data?.success) throw new Error(res.data.message);

      const { exams } = await getExams();

      return { success: true, exams };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const updateExam = async (examId, data) => {
    try {
      setLoading(true);
      const res = await API.put("/admin/update-exam", {
        examId,
        data,
      });

      if (!res.data?.success) throw new Error(res.data.message);

      const { exams } = await getExams();

      return { success: true, exams };
    } catch (error) {
      return { success: false, error: error.response?.data || error };
    } finally {
      setLoading(false);
    }
  };

  const deleteExam = async (examId) => {
    try {
      setLoading(true);
      const res = await API.delete("/admin/delete-exam", {
        data: { examId },
      });

      if (!res.data?.success) throw new Error(res.data.message);

      const { exams } = await getExams();

      return { success: true, exams };
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
        getVerifiers,
        addAccessToVerifier,
        removeAccessFromVerifier,
        getDepts,
        addDept,
        updateDept,
        deleteDept,
        getSubjects,
        addSubject,
        updateSubject,
        deleteSubject,
        getExams,
        addExam,
        updateExam,
        deleteExam,
        getStudents,
        getStudentsGroupedDept,
        addStudent,
        updateStudent,
        getStudentReports,
        addReport,
        uploadReportDoc,
        deleteReport,
        deleteStudent,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
