import { AttachFile } from "@mui/icons-material";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";

const draggedStyle = {
  border: "2px dashed #000",
  backgroundColor: "rgba(0,0,0,.05)",
};

export default function Report({ report, handleDelete, handleUpload }) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);

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

  return (
    <Grid
      item
      xs={12}
      component={motion.div}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h5">Sem: {report.exam.semester}</Typography>
      <Typography variant="h6">
        Date:
        {new Date(report.exam.examDate)
          .toISOString()
          ?.split("T")[0]
          .split("-")
          .reverse()
          .join("-")}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Table
            sx={{ minWidth: 300, maxWidth: "100%" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Subject Code</TableCell>
                <TableCell>Subject Name</TableCell>
                <TableCell>Grade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {report.grades.map((g) => (
                <TableRow key={g._id}>
                  <TableCell>{g.subject.code}</TableCell>
                  <TableCell>{g.subject.name}</TableCell>
                  <TableCell>{g.grade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Typography variant="body1" align="right" sx={{ mt: 2, mr: 1 }}>
            SGPA: {report.sgpa}
          </Typography>
        </Grid>
        {report.file ? (
          <Grid item xs={6}>
            <img
              src={report.file.url}
              style={{ maxWidth: "100%" }}
              alt="Report"
            />
          </Grid>
        ) : (
          <Grid
            item
            xs={6}
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
            {file && (
              <>
                <img
                  src={URL.createObjectURL(file)}
                  style={{ maxWidth: "100%" }}
                  alt="Report"
                />
                <Button
                  variant="contained"
                  fullWidth
                  color="error"
                  sx={{ mt: 2 }}
                  onClick={(e) => {
                    setFile(null);
                  }}
                >
                  Remove
                </Button>
              </>
            )}
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              onClick={async (e) => {
                const res = await handleUpload(report._id, file);
                if (res) setFile(null);
              }}
            >
              Upload
            </Button>
          </Grid>
        )}
      </Grid>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        color="error"
        onClick={(e) => {
          handleDelete(report._id);
        }}
      >
        Delete
      </Button>
    </Grid>
  );
}
