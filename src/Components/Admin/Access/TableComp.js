import { DeleteForever } from "@mui/icons-material";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const columns = [
  { id: "srn", label: "Srn", minWidth: 100 },
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "department",
    label: "Department",
    minWidth: 170,
    format: (value) => value?.name,
  },
];

export default function TableComp({ uid, students, handleDelete }) {
  const [rows, setRows] = useState(students);

  useEffect(() => {
    setRows(students);
  }, [students]);

  return (
    <Box>
      <Table sx={{ minWidth: 650, maxWidth: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns?.map((column) => (
              <TableCell
                key={column?.id}
                align={column?.align}
                style={{ minWidth: column?.minWidth }}
              >
                {column?.label}
              </TableCell>
            ))}
            <TableCell align="center" sx={{ width: 100 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <AnimatePresence initial={false} mode="ease-in-out">
            {rows?.map((row, index) => (
              <TableRow
                hover
                key={row?._id}
                component={motion.tr}
                initial={{ y: -200 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                exit={{ x: 200 }}
              >
                {columns?.map((column) => {
                  const value = row[column?.id];
                  return (
                    <TableCell
                      key={row?._id + column?.id}
                      align={column?.align}
                    >
                      {column?.format ? column?.format(value) : value}
                    </TableCell>
                  );
                })}

                <TableCell
                  align="center"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={() => handleDelete(uid, row?._id)}
                  >
                    <DeleteForever />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </Box>
  );
}
