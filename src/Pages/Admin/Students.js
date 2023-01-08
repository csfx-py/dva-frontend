import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import AddStudentForm from "../../Components/Admin/Students/AddStudentForm";
import TableComp from "../../Components/Admin/Students/TableComp";
import { AdminContext } from "../../Contexts/AdminContext";

export default function Students() {
  const {
    getDepts,
    getStudentsGroupedDept,
    addStudent,
    updateStudent,
    deleteStudent,
  } = useContext(AdminContext);

  const { enqueueSnackbar } = useSnackbar();

  const [groups, setGroups] = useState([]);
  const [depts, setDepts] = useState([]);

  useEffect(() => {
    getStudentsGroupedDept().then((res) => {
      if (res.success) {
        setGroups(res.groups);
      }
    });
    getDepts().then((res) => {
      if (res.success) {
        setDepts(res.depts);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = async (data) => {
    if (
      data.srn === "" ||
      data.name === "" ||
      data.email === "" ||
      data.phone === "" ||
      data.department === "" ||
      data.joiningDate === ""
    ) {
      enqueueSnackbar("Please fill all the fields", { variant: "error" });
      return;
    }

    const res = await addStudent(data);
    console.log(res);

    if (res.success) {
      setGroups(res.groups);
      enqueueSnackbar("Student added successfully", { variant: "success" });
      return true;
    }

    enqueueSnackbar(res.error?.message, { variant: "error" });
    return false;
  };

  const handleEdit = async (id, row) => {
    if (
      row.srn === "" ||
      row.newName === "" ||
      row.newEmail === "" ||
      row.newPhone === "" ||
      row.newDept === "" ||
      row.newJoiningDate === ""
    ) {
      enqueueSnackbar("Please fill all the fields", { variant: "error" });
      return;
    }

    const res = await updateStudent(id, {
      srn: row.srn,
      name: row.newName,
      email: row.newEmail,
      phone: row.newPhone,
      department: row.newDept,
      joiningDate: row.newJoiningDate,
    });

    if (res.success) {
      setGroups(res.groups);
      enqueueSnackbar("Student updated successfully", { variant: "success" });
      return;
    }
    enqueueSnackbar(res.error?.message, { variant: "error" });
  };

  const handleDelete = async (id) => {
    if (!id) {
      enqueueSnackbar("Student not found", { variant: "error" });
      return;
    }

    if (
      window.confirm("Are you sure you want to delete this student record?")
    ) {
      const res = await deleteStudent(id);
      if (res.success) {
        setGroups(res.groups);
        enqueueSnackbar("Student deleted successfully", { variant: "success" });
        return;
      }
      enqueueSnackbar(res.error?.message, { variant: "error" });
    }
  };

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
            <Typography variant="h4">Manage Students</Typography>
          </Grid>

          <Grid item xs={12}>
            <AddStudentForm handleAdd={handleAdd} depts={depts} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mt: 2 }} gutterBottom>
              Students
            </Typography>
            {groups?.length > 0 ? (
              groups.map((group, index) => {
                return (
                  <Accordion key={index}>
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel1a-content"
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mr: 2 }}
                      >
                        {group.deptName}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TableComp
                        students={group.students}
                        depts={depts}
                        handleAdd={handleAdd}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                      />
                    </AccordionDetails>
                  </Accordion>
                );
              })
            ) : (
              <Typography variant="h6">No groups found</Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
