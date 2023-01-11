import { AttachFile, DeleteForever } from "@mui/icons-material";
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
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../Contexts/AdminContext";

const draggedStyle = {
  border: "2px dashed #000",
  backgroundColor: "rgba(0,0,0,.05)",
};

export default function AddDoc({ student, handleAddReport }) {
  const { getExams } = useContext(AdminContext);

  const [exams, setExams] = useState([]);
  const [exam, setExam] = useState("");
  const [examObj, setExamObj] = useState(null);

  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);

  const [subjects, setSubjects] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragover" || e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave" || e.type === "drop") {
      setDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
    return false;
  };

  const handleGradeChange = (e) => {
    setSubjects((prev) => {
      const newSubjects = [...prev];
      const index = newSubjects.findIndex((s) => s._id === e.target.id);
      newSubjects[index].grade = e.target.value;
      return newSubjects;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = handleAddReport(examObj, subjects, file);

    if (res) {
      setExam("");
      setExamObj(null);
      setSubjects([]);
      setFile(null);
    }
  };

  useEffect(() => {
    getExams().then((res) => {
      if (res.success) setExams(res.exams);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (exam) setSubjects(examObj?.subjects?.map((s) => ({ ...s, grade: "" })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exam]);

  useEffect(() => {
    setExamObj(null);
    setExam("");
    setFile(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student]);

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5">Add Report Card</Typography>
      <FormControl fullWidth>
        <InputLabel id="exam">Exam</InputLabel>
        <Select
          labelId="exam"
          fullWidth
          label="Exam"
          required
          value={exam}
          onChange={(e) => {
            setExam(e.target.value);
            setExamObj(exams.find((ex) => ex._id === e.target.value));
          }}
        >
          {exams.map((examOption) => (
            <MenuItem key={examOption?._id} value={examOption._id}>
              {examOption?.dept?.name} - {"semester " + examOption?.semester} -{" "}
              {new Date(examOption?.examDate)
                ?.toISOString()
                ?.split("T")[0]
                .split("-")
                .reverse()
                .join("-")}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {exam && (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          style={
            dragging
              ? draggedStyle
              : {
                  border: "2px solid transparent",
                }
          }
        >
          {examObj?.subjects?.map((sub) => (
            <TextField
              id={sub._id}
              key={sub._id}
              label={`${sub.name} Grade`}
              value={sub.grade}
              onChange={handleGradeChange}
              fullWidth
              required
              sx={{ mt: 1 }}
            />
          ))}
          <TextField
            label="SGPA"
            fullWidth
            required
            sx={{ mt: 1 }}
            type="number"
            onChange={(e) => setExamObj({ ...examObj, sgpa: e.target.value })}
          />
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor="file">
            <Button variant="raised" component="span" fullWidth sx={{ p: 4 }}>
              <AttachFile />
              Upload File by clicking here or drag and drop
            </Button>
          </label>
        </div>
      )}
      {file && (
        <>
          <img
            src={URL.createObjectURL(file)}
            alt="file"
            style={{ maxWidth: "100%" }}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 1 }}
            color="error"
            size="large"
            onClick={() => setFile(null)}
          >
            <DeleteForever /> Delete
          </Button>
        </>
      )}
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 1 }}
        color="primary"
        type="submit"
        size="large"
      >
        Submit
      </Button>
    </Box>
  );
}
