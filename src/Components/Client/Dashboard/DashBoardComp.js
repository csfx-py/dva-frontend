import {
  Autocomplete,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { ClientContext } from "../../../Contexts/ClientContext";
import Report from "./Report";

export default function DashBoardComp() {
  const { enqueueSnackbar } = useSnackbar();
  const { getStudents, getStudentReports } = useContext(ClientContext);

  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState(null);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getStudents().then((res) => {
      if (res.success) {
        setStudents(res.students);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!student) return;
    getStudentReports(student._id).then((res) => {
      if (res.success) {
        setReports(res.reports);
      } else {
        enqueueSnackbar(res.error.message, { variant: "error" });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student]);

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Dashboard</Typography>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              options={students}
              getOptionLabel={(option) => option.name}
              onChange={(e, value) => setStudent(value)}
              renderInput={(params) => (
                <TextField {...params} label="Student" variant="outlined" />
              )}
            />
          </Grid>
          <AnimatePresence initial={false} mode="wait">
            {reports.length > 0 ? (
              reports.map((report) => <Report report={report} />)
            ) : (
              <Typography variant="h5" align="center">
                No Reports
              </Typography>
            )}
          </AnimatePresence>
        </Grid>
      </Paper>
    </Container>
  );
}
