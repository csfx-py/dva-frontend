import { LockRounded } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { motion } from "framer-motion";
import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";

export default function Register({ setInRegister }) {
  const { register } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [firstEdit, setFirstEdit] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    setFirstEdit({ ...firstEdit, [e.target.name]: true });
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (
      userData.name === "" ||
      userData.email === "" ||
      userData.password === ""
    ) {
      enqueueSnackbar("Please fill all the fields");
      return false;
    }
    if (userData.password !== userData.confirmPassword) {
      enqueueSnackbar("Passwords do not match");
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
    if (!validate()) return;

    const registered = await register(userData);

    if (registered.success) {
      enqueueSnackbar("Registered Successfully", { variant: "success" });
      if (registered?.accessLevel === "admin") {
        navigate("/admin/dashboard");
        return;
      }
      navigate("/client/dashboard");
    } else {
      enqueueSnackbar(`Registration Failed ${registered.error?.message}`, {
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
        Register
      </Typography>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          name="name"
          label="Company Name"
          onChange={handleChange}
          value={userData.name}
          variant="outlined"
          sx={{ mt: 2 }}
          error={firstEdit.name && userData?.name?.length < 3}
          helperText={
            firstEdit.name && userData?.name?.length < 3
              ? "Company Name is required and must be atleast 3 characters long"
              : ""
          }
          autoFocus
        />
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
              ? "Password must contain atleast 1 uppercase, 1 lowercase, 1 special character and 1 number and must be atleast 6 characters long"
              : ""
          }
        />
        <TextField
          type="password"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          onChange={handleChange}
          value={userData.confirmPassword}
          variant="outlined"
          sx={{ mt: 2 }}
          error={
            firstEdit.confirmPassword &&
            userData.password !== userData.confirmPassword
          }
          helperText={
            firstEdit.confirmPassword &&
            userData.password !== userData.confirmPassword
              ? "Passwords do not match"
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
          Register
        </Button>
      </Box>
      <Typography variant="body2" align="center">
        Already have an account?{" "}
        <Typography
          onClick={(e) => {
            setInRegister(false);
          }}
          component="span"
          color="error"
          sx={{ cursor: "pointer" }}
        >
          Login
        </Typography>
      </Typography>
    </Grid>
  );
}
