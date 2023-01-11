import {
  Autocomplete,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import AddDoc from "../../Components/Admin/Docs/AddDoc";
import Report from "../../Components/Admin/Docs/Report";
import { AdminContext } from "../../Contexts/AdminContext";

export default function Docs() {
  const { enqueueSnackbar } = useSnackbar();

  const {
    getStudents,
    getStudentReports,
    addReport,
    deleteReport,
    uploadReportDoc,
  } = useContext(AdminContext);

  const [student, setStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [reportCardsData, setReportCardsData] = useState([]);

  const handleUpload = async (reportId, file) => {
    const formData = new FormData();
    formData.append("reportId", reportId);
    formData.append("file", file);

    const res = await uploadReportDoc(formData, student._id);

    if (!res.success) {
      console.log(res);
      enqueueSnackbar(res?.message, { variant: "error" });
      return;
    }
    setReportCardsData(res.reports);
    enqueueSnackbar("Report uploaded successfully", { variant: "success" });
  };

  const handleAddReport = async (reportCard, subjectsData, file) => {
    if (subjectsData.some((s) => s.grade === "")) {
      enqueueSnackbar("Please fill all subject marks", { variant: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("studentId", student._id);
    formData.append("departmentId", student?.department?._id);
    formData.append("examId", reportCard._id);
    const subsString = subjectsData.map((s) =>
      JSON.stringify({ subject: s._id, grade: s.grade })
    );
    subsString.forEach((s) => formData.append("grades", s));
    formData.append("sgpa", reportCard.sgpa);
    formData.append("file", file);

    const res = await addReport(formData);

    if (!res.success) {
      enqueueSnackbar(res?.message, { variant: "error" });
      return;
    }
    setReportCardsData(res.reports);
    enqueueSnackbar("Report added successfully", { variant: "success" });
  };

  const handleDelete = async (reportId) => {
    const res = await deleteReport(reportId, student._id);

    if (!res.success) {
      enqueueSnackbar(res?.message, { variant: "error" });
      return;
    }
    setReportCardsData(res.reports);
    enqueueSnackbar("Report deleted successfully", { variant: "success" });
    return true;
  };

  useEffect(() => {
    getStudents().then((res) => {
      if (!res.success) {
        enqueueSnackbar(res?.message, { variant: "error" });
        return;
      }
      setStudents(res.students);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (student) {
      getStudentReports(student._id).then((res) => {
        if (!res.success) {
          enqueueSnackbar(res?.message, { variant: "error" });
          return;
        }
        setReportCardsData(res.reports);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student]);

  return (
    <Container
      maxWidth="xl"
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper sx={{ p: 2, borderRadius: 5 }} elevation={5}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">Manage Student Documents</Typography>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              id="student"
              options={students}
              label="Student"
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              onChange={(event, newValue) => {
                setStudent(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Student"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <AnimatePresence initial={false} mode="wait">
            {student &&
              reportCardsData.length > 0 &&
              reportCardsData.map((r) => (
                <Report
                  report={r}
                  key={r._id}
                  student={student}
                  handleDelete={handleDelete}
                  handleUpload={handleUpload}
                />
              ))}
          </AnimatePresence>
          {student && (
            <Grid item xs={12}>
              <AddDoc student={student} handleAddReport={handleAddReport} />
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
}
