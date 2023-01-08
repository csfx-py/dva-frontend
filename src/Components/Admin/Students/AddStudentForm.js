import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

export default function AddStudentForm({ handleAdd, depts }) {
  const [data, setData] = useState({
    srn: "",
    name: "",
    email: "",
    phone: "",
    department: "",
    joiningDate: new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await handleAdd(data);

    if (res)
      setData({
        srn: "",
        name: "",
        email: "",
        phone: "",
        department: "",
        joiningDate: new Date(),
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5">Add Department</Typography>
      <TextField
        label="Student SRN"
        name="srn"
        variant="outlined"
        fullWidth
        required
        value={data.srn}
        onChange={handleChange}
      />
      <TextField
        label="Student Name"
        name="name"
        variant="outlined"
        fullWidth
        required
        value={data.name}
        onChange={handleChange}
      />
      <TextField
        label="Student Email"
        name="email"
        variant="outlined"
        fullWidth
        required
        value={data.email}
        type="email"
        onChange={handleChange}
      />
      <TextField
        label="Student Phone"
        name="phone"
        variant="outlined"
        fullWidth
        required
        value={data.phone}
        type="number"
        onChange={handleChange}
      />
      <FormControl>
        <InputLabel id="dept-label">Department</InputLabel>
        <Select
          labelId="dept-label"
          label="Department"
          name="department"
          fullWidth
          required
          value={data.department}
          onChange={handleChange}
        >
          {depts.map((dept) => (
            <MenuItem key={dept._id} value={dept._id}>
              {dept.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date of Joining"
          value={data.joiningaDate}
          onChange={(newValue) => {
            setData((prev) => ({ ...prev, joiningDate: newValue }));
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Button type="submit" variant="contained" color="primary" size="large">
        Add Student
      </Button>
    </Box>
  );
}
