import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState } from "react";

export default function AccessForm({ students, uid, handleAdd }) {
  const [toAdd, setToAdd] = useState([]);
  const acRef = useRef(null);

  return (
    <Box
      component="form"
      onSubmit={async (e) => {
        e.preventDefault();
        if (await handleAdd(uid, toAdd)) {
          setToAdd([]);
          acRef.current.clear();
        }
      }}
    >
      <Typography variant="h6" gutterBottom>
        Add Access
      </Typography>
      <Autocomplete
        multiple
        options={students}
        getOptionLabel={(option) => option.name}
        filterSelectedOptions
        onChange={(e, value) => {
          setToAdd((prev) => {
            return [...prev, value[value.length - 1]._id];
          });
        }}
        ref={acRef}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Add Students"
            placeholder="Add Students"
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        size="large"
      >
        Add Access
      </Button>
    </Box>
  );
}
