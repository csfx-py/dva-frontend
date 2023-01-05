import { Grid, Paper, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import AuthBg from "../Assets/authDVA.svg";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";

export default function Auth() {
  const [inRegister, setInRegister] = useState(false);
  return (
    <Grid
      container
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0 }}
      sx={{
        height: "100%",
        p: 10,
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Paper
        elevation={3}
        sx={{
          height: "100%",
          width: "100%",
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <Grid
          container
          sx={{
            height: "100%",
            // width: "100%",
          }}
        >
          <Grid
            item
            xs={6}
            sx={{
              display: { xs: "none", md: "flex" },
              backgroundColor: "blue",
              backgroundImage: `url(${AuthBg})`,
              backgroundSize: "80%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              p: 4,
              flexDirection: "column",
            }}
          >
            <Typography variant="h3" sx={{ color: "white" }} align="center">
              Welcome to PES University
            </Typography>
            <Typography variant="h5" sx={{ color: "white" }} align="center">
              Document Verification Portal
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ height: "100%", p: 4 }}>
            <AnimatePresence initial={false} mode="wait">
              {inRegister ? (
                <Register setInRegister={setInRegister} key="register" />
              ) : (
                <Login setInRegister={setInRegister} key="login" />
              )}
            </AnimatePresence>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
