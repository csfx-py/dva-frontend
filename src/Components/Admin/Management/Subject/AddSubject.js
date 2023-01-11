import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function AddSubject({ handleAddSubject }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [credits, setCredits] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await handleAddSubject(name, code, credits);

    if (res) {
      setName("");
      setCode("");
      setCredits(0);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5">Add Subject</Typography>
      <TextField
        label="Subject Code"
        variant="outlined"
        fullWidth
        required
        value={code}
        onChange={(e) => setCode(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Subject Name"
        variant="outlined"
        fullWidth
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Credits"
        variant="outlined"
        fullWidth
        type="number"
        required
        value={credits}
        onChange={(e) => setCredits(e.target.value)}
        sx={{ mt: 2 }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        size="large"
      >
        Add Subject
      </Button>
    </Box>
  );
}
