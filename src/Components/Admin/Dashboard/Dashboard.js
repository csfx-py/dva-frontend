import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../Contexts/AdminContext";

const columns = [
  { id: "name", label: "Company Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "phone", label: "Phone", minWidth: 170 },
  { id: "accessLevel", label: "Access Level", minWidth: 170 },
];

const accessLevels = [
  { id: 0, name: "Pending" },
  { id: 1, name: "Client" },
  { id: 2, name: "Admin" },
];

export default function DashboardAdmin() {
  const { getAllUsers, userApproval } = useContext(AdminContext);

  const [rows, setRows] = useState([]);

  const handleUpdate = async (id, accessLevel) => {
    const res = await userApproval(id, accessLevel);
    if (res.success) {
      setRows(res.users);
    }
  };

  useEffect(() => {
    getAllUsers().then((res) => {
      setRows(res.users);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 2, borderRadius: 5 }} elevation={5}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">Dashboard</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              New users can be onboard pending approval from the admin
            </Typography>
            {rows?.length > 0 ? (
              <Box sx={{ mt: 2 }}>
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
                      <TableCell align="center">New Access Level</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <AnimatePresence initial={false} mode="ease-in-out">
                      {rows.map((row) => {
                        return (
                          <TableRow
                            hover
                            key={row._id}
                            component={motion.tr}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                            <TableCell align="center">
                              <Select
                                name="accessLevel"
                                id="accessLevel"
                                label="Access Level"
                                value={row.newAccessLevel || row.accessLevel}
                                sx={{ width: 200 }}
                                onChange={(e) => {
                                  setRows((prev) => {
                                    const newState = [...prev];
                                    const index = newState.findIndex(
                                      (item) => item._id === row._id
                                    );
                                    newState[index].newAccessLevel =
                                      e.target.value;
                                    return newState;
                                  });
                                }}
                              >
                                {accessLevels.map((level) => (
                                  <MenuItem
                                    key={level.id}
                                    value={level.id}
                                    selected={
                                      level.id ===
                                      (row.newAccessLevel || row.accessLevel)
                                    }
                                  >
                                    {console.log(
                                      level.name,
                                      level.id ===
                                        (row.newAccessLevel || row.accessLevel)
                                    )}
                                    {level.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                variant="contained"
                                color="success"
                                sx={{ mr: 1 }}
                                onClick={() =>
                                  handleUpdate(row._id, row.newAccessLevel)
                                }
                              >
                                Update
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </Box>
            ) : (
              <Typography variant="h6">No new users for approval</Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
      <div style={{
        height: "200vh"
      }}></div>
    </Container>
  );
}
