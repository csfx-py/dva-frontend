import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function AddDeptForm({ handleAdd }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleAdd(name, code);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5">Add Department</Typography>
      <TextField
        id="deptName"
        label="Department Name"
        variant="outlined"
        fullWidth
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        id="deptCode"
        label="Department Code"
        variant="outlined"
        fullWidth
        required
        value={code}
        onChange={(e) => setCode(e.target.value)}
        sx={{ mt: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        size="large"
      >
        Add Department
      </Button>
    </Box>
  );
}
