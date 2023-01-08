import { Check, Close } from "@mui/icons-material";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { motion } from "framer-motion";

export default function EditRow({ setRows, row, index, handleEdit, depts }) {
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setRows((prev) => {
      const _ = [...prev];
      _[index][name] = value;
      return _;
    });
  };
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
          label="SRN"
          name="newSrn"
          value={row.newSrn}
          onChange={(e) => handleChange(e, index)}
        />
      </TableCell>
      <TableCell>
        <TextField
          label="Name"
          name="newName"
          value={row.newName}
          onChange={(e) => handleChange(e, index)}
        />
      </TableCell>
      <TableCell>
        <TextField
          label="Email"
          name="newEmail"
          value={row.newEmail}
          onChange={(e) => handleChange(e, index)}
        />
      </TableCell>
      <TableCell>
        <TextField
          label="Phone"
          name="newPhone"
          value={row.newPhone}
          onChange={(e) => handleChange(e, index)}
        />
      </TableCell>
      <TableCell>
        <FormControl>
          <InputLabel id="dept-label">Department</InputLabel>
          <Select
            labelId="dept-label"
            label="Department"
            name="newDept"
            fullWidth
            required
            value={row.newDept}
            onChange={(e) => handleChange(e, index)}
          >
            {depts.map((dept) => (
              <MenuItem key={dept._id} value={dept._id}>
                {dept.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date of Joining"
            value={row.newJoiningaDate}
            onChange={(newValue) => {
              setRows((prev) => {
                const _ = [...prev];
                _[index].newJoiningDate = newValue;
                return _;
              });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </TableCell>
      <TableCell
        align="center"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() => handleEdit(row._id, row)}
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
