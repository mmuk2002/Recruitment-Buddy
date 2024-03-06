import { useNavigate } from "react-router-dom";
import { auth, signIn } from "../firebase";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Recruitment Buddy
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

function SignInSide() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   axios.get('/api/users')
  //     .then(response => {
  //       setUsers(response.data);
  //     })
  //     .catch(error => {
  //       console.error('There was an error!', error);
  //     });
  // }, []);
  

  const loginUser = (event) => {
    event.preventDefault();
   
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    // Sign in with Firebase
    signIn(auth, email, password)
      .then((userCredential) => {
        navigate(`/dashboard/${userCredential.user.uid}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing in: ", errorCode, errorMessage);
      });
  };

  const handleSignUp = () => {
    navigate("/"); // fix
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={loginUser}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={SignInSide}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Button
                    color="primary"
                    variant="outlined"
                    sx={{ my: 1, mx: 1.5, marginLeft: "auto" }}
                    onClick={handleSignUp}
                  >
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignInSide;
