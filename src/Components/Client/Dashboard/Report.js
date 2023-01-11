import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

export default function Report({ report }) {
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
      <Typography variant="h5">Sem: {report?.exam?.semester}</Typography>
      <Typography variant="h6">
        Date:
        {new Date(report?.exam?.examDate)
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
              {report?.grades?.map((g) => (
                <TableRow key={g?._id}>
                  <TableCell>{g?.subject?.code}</TableCell>
                  <TableCell>{g?.subject?.name}</TableCell>
                  <TableCell>{g?.grade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Typography variant="body1" align="right" sx={{ mt: 2, mr: 1 }}>
            SGPA: {report?.sgpa}
          </Typography>
        </Grid>
        {report?.file ? (
          <Grid item xs={6}>
            <img
              src={report?.file?.url}
              style={{ maxWidth: "100%" }}
              alt="Report"
            />
          </Grid>
        ) : (
          <Typography variant="h6" align="center">
            No Report Uploaded
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
