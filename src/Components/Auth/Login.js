import { LockRounded } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { motion } from "framer-motion";
import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";

export default function Login({ setInRegister }) {
  const { login } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [firstEdit, setFirstEdit] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    setFirstEdit({ ...firstEdit, [e.target.name]: true });
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (userData.email === "" || userData.password === "") {
      enqueueSnackbar("Please fill all the fields");
      return false;
    }
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!emailRegex.test(userData.email)) {
      enqueueSnackbar("Please enter a valid email");
      return false;
    }
    const passwordRegex =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!#.])[A-Za-z\d$@$!%*?&.]{6,20}/;
    if (!passwordRegex.test(userData.password)) {
      enqueueSnackbar(
        "Password must be at least 6 characters long and must contain at least one uppercase letter, one lowercase letter and one number"
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const loggedIn = await login(userData);

    if (loggedIn.success) {
      enqueueSnackbar("Logged In Successfully", { variant: "success" });
      if (loggedIn?.accessLevel === 2) {
        navigate("/admin/dashboard");
        return;
      }
      navigate("/client/dashboard");
    } else {
      enqueueSnackbar(`Login Failed ${loggedIn.error?.message}`, {
        variant: "error",
      });
    }
  };

  return (
    <Grid
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75 }}
      exit={{ opacity: 0 }}
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <LockRounded fontSize="large" color="error" />
      <Typography variant="h3" align="center">
        Login
      </Typography>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          name="email"
          label="Email Address"
          onChange={handleChange}
          value={userData.email}
          variant="outlined"
          sx={{ mt: 2 }}
          error={
            firstEdit.email &&
            userData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ===
              null
          }
          helperText={
            firstEdit.email &&
            userData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ===
              null
              ? "Enter valid email"
              : ""
          }
          autoFocus
        />
        <TextField
          type="password"
          required
          fullWidth
          name="password"
          label="Password"
          onChange={handleChange}
          value={userData.password}
          variant="outlined"
          sx={{ mt: 2 }}
          error={
            firstEdit.password &&
            userData.password.match(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/
            ) === null
          }
          helperText={
            firstEdit.password &&
            userData.password.match(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/
            ) === null
              ? `Password must contain atleast 1 uppercase, 
              1 lowercase, 1 special character and 
              1 number and must be atleast 6 characters long`
              : ""
          }
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
          size="large"
          color="error"
        >
          Login
        </Button>
      </Box>
      <Typography variant="body2" align="center">
        Don't have an account?{" "}
        <Typography
          onClick={(e) => {
            setInRegister(true);
          }}
          component="span"
          color="error"
          sx={{ cursor: "pointer" }}
        >
          Register
        </Typography>
      </Typography>
    </Grid>
  );
}
