import {
  Autocomplete,
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
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../../Contexts/AdminContext";

export default function AddExam({ handleAddExam }) {
  const { getDepts, getSubjects } = useContext(AdminContext);

  const [depts, setDepts] = useState([]);
  const [dept, setDept] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [examDate, setExamDate] = useState(new Date());
  const [semester, setSemester] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await handleAddExam(dept, selectedSubjects, examDate, semester);

    if (res) {
      setDept("");
      setSelectedSubjects([]);
      setExamDate("");
      setSemester(1);
    }
  };

  useEffect(() => {
    getDepts().then((res) => {
      if (res.success) setDepts(res.depts);
    });

    getSubjects().then((res) => {
      if (res.success) setSubjects(res.subjects);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ gap: 2, display: "flex", flexDirection: "column" }}
    >
      <Typography variant="h5" gutterBottom>
        Add Exam
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="dept">Department</InputLabel>
        <Select
          labelId="dept"
          fullWidth
          label="Department"
          required
          value={dept}
          onChange={(e) => {
            setDept(e.target.value);
          }}
        >
          {depts.map((dept) => (
            <MenuItem key={dept?._id} value={dept?._id}>
              {`${dept?.code} ${dept?.name}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Autocomplete
        fullWidth
        multiple
        id="tags-standard"
        options={subjects}
        value={selectedSubjects}
        getOptionLabel={(option) => option?.name}
        isOptionEqualToValue={(option, value) => option._id === value._id}
        filterSelectedOptions
        onChange={(e, value) => setSelectedSubjects(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Subjects"
            placeholder="Subjects"
          />
        )}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date of Exam"
          value={examDate}
          fullWidth
          onChange={(newValue) => {
            setExamDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <TextField
        label="Semester"
        name="semester"
        fullWidth
        value={semester}
        type="number"
        onChange={(e) => setSemester(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        size="large"
      >
        Add Exam
      </Button>
    </Box>
  );
}
