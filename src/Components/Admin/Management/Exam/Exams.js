import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../../Contexts/AdminContext";
import AddExam from "./AddExam";
import InfoRow from "./InfoRow";

const examColumns = [
  {
    id: "dept",
    label: "Dept Name",
    minWidth: 170,
    format: (value) => value.name,
  },
  {
    id: "subjects",
    label: "Subjects",
    minWidth: 170,
    format: (value) => value.map((sub) => sub.name).join(", "),
  },
  {
    id: "examDate",
    label: "Exam Date",
    minWidth: 170,
    format: (value) =>
      new Date(value)
        ?.toISOString()
        ?.split("T")[0]
        .split("-")
        .reverse()
        .join("-"),
  },
  {
    id: "semester",
    label: "Semester",
    minWidth: 170,
  },
];

export default function Exam() {
  const { enqueueSnackbar } = useSnackbar();

  const { getExams, addExam, updateExam, deleteExam } =
    useContext(AdminContext);

  const [rows, setRows] = useState([]);

  const handleAddExam = async (dept, subjects, examDate, semester) => {
    const res = await addExam(dept, subjects, examDate, semester);
    if (res) {
      setRows(
        res.exams.map((exam) => ({
          ...exam,
          edit: false,
          newDept: exam.dept,
          newSubjects: exam.subjects,
          newExamDate: exam.examDate,
          newSemester: exam.semester,
        }))
      );
      return true;
    }

    enqueueSnackbar("Exam already exists", { variant: "error" });
    return false;
  };

  //   const handleEdit = async (id, name, code, credits) => {
  //     if (name === "" || code === "") {
  //       enqueueSnackbar("Please fill all the fields", { variant: "error" });
  //       return;
  //     }

  //     const res = await updateSubject(id, name, code, credits);
  //     if (res.success) {
  //       setRows(
  //         res.subjects?.map((sub) => ({
  //           ...sub,
  //           edit: false,
  //           newName: sub.name,
  //           newCode: sub.code,
  //           newCredits: sub.credits,
  //         }))
  //       );
  //       enqueueSnackbar("Subject updated successfully", {
  //         variant: "success",
  //       });
  //       return;
  //     }
  //     enqueueSnackbar(res?.message, { variant: "error" });
  //   };

  const handleDelete = async (id) => {
    const res = await deleteExam(id);
    if (res) {
      setRows(
        res.exams.map((exam) => ({
          ...exam,
          edit: false,
          newDept: exam.dept,
          newSubjects: exam.subjects,
          newExamDate: exam.examDate,
          newSemester: exam.semester,
        }))
      );
    }
  };

  useEffect(() => {
    getExams().then((res) => {
      if (res.success)
        setRows(
          res.exams.map((exam) => ({
            ...exam,
            edit: false,
            newDept: exam.dept,
            newSubjects: exam.subjects,
            newExamDate: exam.examDate,
            newSemester: exam.semester,
          }))
        );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Paper sx={{ p: 2, borderRadius: 5 }} elevation={5}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">Manage Exams</Typography>
        </Grid>
        <Grid item xs={12}>
          <AnimatePresence initial={false} mode="wait">
            {rows?.length > 0 ? (
              <Box
                key={1}
                sx={{ mt: 2 }}
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {examColumns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                      <TableCell align="center" sx={{ width: 100 }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <AnimatePresence initial={false} mode="ease-in-out">
                      {rows.map((row, index) => (
                        <InfoRow
                          setRows={setRows}
                          columns={examColumns}
                          row={row}
                          index={index}
                          key={row._id}
                          handleDelete={handleDelete}
                        />
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </Box>
            ) : (
              <Typography
                component={motion.p}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                key={2}
                variant="body1"
                sx={{ mt: 2 }}
              >
                No Subjects Found
              </Typography>
            )}
          </AnimatePresence>
        </Grid>
        <Grid item xs={12}>
          <AddExam handleAddExam={handleAddExam} />
        </Grid>
      </Grid>
    </Paper>
  );
}
