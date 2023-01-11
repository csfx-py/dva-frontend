import { Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Onboard from "../../../Assets/onboard.svg";

export default function OnBoard() {
  return (
    <Grid
      container
      component={motion.form}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // onSubmit={handleSubmit}
      sx={{
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h4">OnBoarding</Typography>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h6">
          We are glad to have you onboard. Please wait for the admin to approve
          your account
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <img
          src={Onboard}
          alt="onboard"
          style={{
            maxHeight: "400px",
          }}
        />
      </Grid>
    </Grid>
  );
}
