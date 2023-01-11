import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useSnackbar } from "notistack";
import { Fragment, useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../../Contexts/AdminContext";
import InfoRow from "../../Dept/InfoRow";
import AddSubject from "./AddSubject";
import EditRow from "./EditRow";

const subjectColumns = [
  {
    id: "code",
    label: "Subject Code",
    minWidth: 170,
  },
  {
    id: "name",
    label: "Subject Name",
    minWidth: 170,
  },
  {
    id: "credits",
    label: "Credits",
    minWidth: 170,
  },
];

export default function Subjects() {
  const { enqueueSnackbar } = useSnackbar();

  const { getSubjects, addSubject, updateSubject, deleteSubject } =
    useContext(AdminContext);

  const [rows, setRows] = useState([]);

  const handleAddSubject = async (name, code, deptId) => {
    const res = await addSubject(name, code, deptId);
    if (res) {
      setRows(
        res.subjects.map((sub) => ({
          ...sub,
          edit: false,
          newName: sub.name,
          newCode: sub.code,
          newCredits: sub.credits,
        }))
      );
      return true;
    }

    enqueueSnackbar("Subject already exists", { variant: "error" });
    return false;
  };

  const handleEdit = async (id, name, code, credits) => {
    if (name === "" || code === "") {
      enqueueSnackbar("Please fill all the fields", { variant: "error" });
      return;
    }

    const res = await updateSubject(id, name, code, credits);
    if (res.success) {
      setRows(
        res.subjects?.map((sub) => ({
          ...sub,
          edit: false,
          newName: sub.name,
          newCode: sub.code,
          newCredits: sub.credits,
        }))
      );
      enqueueSnackbar("Subject updated successfully", {
        variant: "success",
      });
      return;
    }
    enqueueSnackbar(res?.message, { variant: "error" });
  };

  const handleDelete = async (id) => {
    const res = await deleteSubject(id);
    if (res) {
      setRows(
        res.subjects.map((sub) => ({
          ...sub,
          edit: false,
          newName: sub.name,
          newCode: sub.code,
          newCredits: sub.credits,
        }))
      );
    }
  };

  useEffect(() => {
    getSubjects().then((res) => {
      if (res)
        setRows(
          res.subjects.map((sub) => ({
            ...sub,
            edit: false,
            newName: sub.name,
            newCode: sub.code,
            newCredits: sub.credits,
          }))
        );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Paper sx={{ p: 2, borderRadius: 5 }} elevation={5}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">Manage Subjects</Typography>
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
                      {subjectColumns.map((column) => (
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
                      {rows.map((row, index) => {
                        return row.edit ? (
                          <Fragment key={index}>
                            <InfoRow
                              setRows={setRows}
                              columns={subjectColumns}
                              row={row}
                              index={index}
                              key={row._id + "info"}
                              handleDelete={handleDelete}
                            />
                            <EditRow
                              setRows={setRows}
                              row={row}
                              index={index}
                              key={row._id + "edit"}
                              handleEdit={handleEdit}
                            />
                          </Fragment>
                        ) : (
                          <InfoRow
                            setRows={setRows}
                            columns={subjectColumns}
                            row={row}
                            index={index}
                            key={row._id}
                            handleDelete={handleDelete}
                          />
                        );
                      })}
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
          <AddSubject handleAddSubject={handleAddSubject} />
        </Grid>
      </Grid>
    </Paper>
  );
}
