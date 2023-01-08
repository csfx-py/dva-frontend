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
import { Container } from "@mui/system";
import { AnimatePresence, motion } from "framer-motion";
import { useSnackbar } from "notistack";
import { Fragment, useContext, useEffect, useState } from "react";
import AddDeptForm from "../../Components/Admin/Dept/AddDeptForm";
import EditRow from "../../Components/Admin/Dept/EditRow";
import InfoRow from "../../Components/Admin/Dept/InfoRow";
import { AdminContext } from "../../Contexts/AdminContext";

const columns = [
  { id: "name", label: "Department Name", minWidth: 170 },
  { id: "code", label: "Department Code", minWidth: 170 },
];

export default function Dept() {
  const { getDepts, addDept, updateDept, deleteDept } =
    useContext(AdminContext);

  const { enqueueSnackbar } = useSnackbar();

  const [rows, setRows] = useState([]);

  useEffect(() => {
    getDepts().then((res) => {
      if (res.success) {
        setRows(
          res.depts?.map((dept) => ({
            ...dept,
            edit: false,
            newName: dept.name,
            newCode: dept.code,
          }))
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = async (name, code) => {
    if (name === "" || code === "") {
      enqueueSnackbar("Please fill all the fields", { variant: "error" });
      return;
    }

    const res = await addDept(name, code);
    if (res.success) {
      setRows(
        res.depts?.map((dept) => ({
          ...dept,

          edit: false,
          newName: dept.name,
          newCode: dept.code,
        }))
      );
      enqueueSnackbar("Department added successfully", { variant: "success" });
      return true;
    }
    enqueueSnackbar("Department already exists", { variant: "error" });
    return false;
  };

  const handleEdit = async (id, name, code) => {
    if (name === "" || code === "") {
      enqueueSnackbar("Please fill all the fields", { variant: "error" });
      return;
    }

    const res = await updateDept(id, name, code);
    if (res.success) {
      setRows(
        res.depts?.map((dept) => ({
          ...dept,
          edit: false,
          newName: dept.name,
          newCode: dept.code,
        }))
      );
      enqueueSnackbar("Department updated successfully", {
        variant: "success",
      });
      return;
    }
    enqueueSnackbar("Department already exists", { variant: "error" });
  };

  const handleDelete = async (id) => {
    if (!id) {
      enqueueSnackbar("Department not found", { variant: "error" });
      return;
    }

    if (window.confirm("Are you sure you want to delete this department?")) {
      const res = await deleteDept(id);
      if (res.success) {
        setRows(
          res.depts?.map((dept) => ({
            ...dept,
            edit: false,
            newName: dept.name,
            newCode: dept.code,
          }))
        );
        enqueueSnackbar("Department deleted successfully", {
          variant: "success",
        });
      }
    }
  };

  return (
    <Container
      maxWidth="lg"
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper sx={{ p: 2, borderRadius: 5 }} elevation={5}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">Manage Departments</Typography>
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
                        {columns.map((column) => (
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
                                columns={columns}
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
                              columns={columns}
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
                  No Departments Found
                </Typography>
              )}
            </AnimatePresence>
          </Grid>
          <Grid item xs={12}>
            <AddDeptForm handleAdd={handleAdd} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
