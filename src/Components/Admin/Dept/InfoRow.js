import { DeleteForever, Edit } from "@mui/icons-material";
import { Button, TableCell, TableRow } from "@mui/material";
import { motion } from "framer-motion";

export default function InfoRow({
  setRows,
  columns,
  row,
  index,
  handleDelete,
}) {
  return (
    <TableRow
      hover
      component={motion.tr}
      initial={{ y: -200 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ x: 200 }}
    >
      {columns.map((column) => {
        const value = row[column.id];
        return (
          <TableCell key={column.id} align={column.align}>
            {column?.format ? column.format(value) : value}
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
          fullWidth
          onClick={() =>
            setRows((prev) => {
              const _ = [...prev];
              _[index].edit = true;
              return _;
            })
          }
        >
          <Edit /> Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={() => handleDelete(row._id)}
        >
          <DeleteForever />
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
