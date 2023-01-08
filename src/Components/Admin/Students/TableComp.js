import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import InfoRow from "../Dept/InfoRow";
import EditRow from "./EditRow";

const columns = [
  { id: "srn", label: "SRN" },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "phone", label: "Phone", minWidth: 170 },
  { id: "deptName", label: "Department" },
  {
    id: "joiningDate",
    label: "Joining Date",
    format: (value) =>
      value?.toISOString()?.split("T")[0].split("-").reverse().join("-"),
  },
];

export default function TableComp({
  depts,
  students,
  handleAdd,
  handleEdit,
  handleDelete,
}) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      students?.map((row) => ({
        ...row,
        joiningDate: new Date(row.joiningDate),
        deptName: row.department.name,
        edit: false,
        newSrn: row.srn,
        newName: row.name,
        newEmail: row.email,
        newPhone: row.phone,
        newDept: row.department._id,
        newJoiningDate: new Date(row.joiningDate),
      }))
    );
  }, [students]);

  return (
    <Box>
      <Table sx={{ minWidth: 650, maxWidth: "100%" }} aria-label="simple table">
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
                    depts={depts}
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
  );
}
