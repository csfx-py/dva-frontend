import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { motion } from "framer-motion";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import AccessForm from "../../Components/Admin/Access/AccessForm";
import TableComp from "../../Components/Admin/Access/TableComp";
import { AdminContext } from "../../Contexts/AdminContext";

export default function AccessControl() {
  const {
    getVerifiers,
    getStudents,
    addAccessToVerifier,
    removeAccessFromVerifier,
  } = useContext(AdminContext);

  const { enqueueSnackbar } = useSnackbar();

  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getVerifiers().then((res) => {
      if (res.success) {
        setUsers(res.users);
      }
    });

    getStudents().then((res) => {
      if (res.success) {
        setStudents(res.students);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = async (uid, sid) => {
    const res = await addAccessToVerifier(uid, sid);

    if (res.success) {
      setUsers(res.users);
      return true;
    }
    enqueueSnackbar(res.message, { variant: "error" });
    return false;
  };

  const handleDelete = async (uid, sid) => {
    const res = await removeAccessFromVerifier(uid, sid);

    if (!res.success) {
      setUsers(res.users);
      return true;
    }
    enqueueSnackbar(res.message, { variant: "error" });
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
            <Typography variant="h4">Manage Access</Typography>
          </Grid>
          <Grid item xs={12}>
            {users?.length > 0 ? (
              users.map((user, index) => {
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
                        {user.name}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {user.canAccess.length > 0 ? (
                        <TableComp
                          students={user?.canAccess}
                          uid={user?._id}
                          handleDelete={handleDelete}
                        />
                      ) : (
                        <Typography variant="h6">No Students Access</Typography>
                      )}
                      <AccessForm
                        students={students.filter((student) => {
                          return !user.canAccess.some(
                            (s) => s._id === student._id
                          );
                        })}
                        uid={user._id}
                        handleAdd={handleAdd}
                      />
                    </AccordionDetails>
                  </Accordion>
                );
              })
            ) : (
              <Typography variant="h6">No Verifiers found</Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
