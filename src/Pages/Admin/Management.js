import { Container } from "@mui/material";
import { motion } from "framer-motion";
import Exam from "../../Components/Admin/Management/Exam/Exams";
import Subjects from "../../Components/Admin/Management/Subject/Subjects";

export default function Management() {
  return (
    <Container
      maxWidth="xl"
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      sx={{ display: "flex", gap: 2, flexDirection: "column" }}
    >
      <Subjects />
      <Exam />
    </Container>
  );
}
