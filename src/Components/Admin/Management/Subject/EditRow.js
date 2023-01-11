import { Check, Close } from "@mui/icons-material";
import { Button, TableCell, TableRow, TextField } from "@mui/material";
import { motion } from "framer-motion";

export default function EditRow({ setRows, row, index, handleEdit }) {
  return (
    <TableRow
      hover
      component={motion.tr}
      initial={{ y: -200 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ x: 200 }}
    >
      <TableCell>
        <TextField
          label="Subject Code"
          value={row.newCode}
          onChange={(e) =>
            setRows((prev) => {
              const _ = [...prev];
              _[index].newCode = e.target.value;
              return _;
            })
          }
        />
      </TableCell>
      <TableCell>
        <TextField
          label="Subject Name"
          value={row.newName}
          onChange={(e) =>
            setRows((prev) => {
              const _ = [...prev];
              _[index].newName = e.target.value;
              return _;
            })
          }
        />
      </TableCell>
      <TableCell>
        <TextField
          label="Credits"
          value={row.newCredits}
          onChange={(e) =>
            setRows((prev) => {
              const _ = [...prev];
              _[index].newCode = e.target.value;
              return _;
            })
          }
        />
      </TableCell>
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
          color="success"
          fullWidth
          onClick={() =>
            handleEdit(row._id, row.newName, row.newCode, row.newCredits)
          }
        >
          <Check /> Save
        </Button>
        <Button
          variant="contained"
          color="warning"
          fullWidth
          onClick={() =>
            setRows((prev) => {
              const _ = [...prev];
              _[index].edit = false;
              return _;
            })
          }
        >
          <Close /> Cancel
        </Button>
      </TableCell>
    </TableRow>
  );
}
