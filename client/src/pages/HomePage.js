import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { useNavigate } from 'react-router-dom';
// import firebase from '../firebase';

function App() {
  const navigate = useNavigate();

  const handleSignOut = () => {
      navigate('/login'); // This is where you define the path to your login page
  };

  return (
    <div>
      <AppBar position="relative" color="default" elevation={0}>
        <Toolbar>
          <nav>
            <Link
              variant="button"
              color="textPrimary"
              href="#"
              sx={{ margin: 1 }}
            >
              Profile
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              href="#"
              sx={{ margin: 1 }}
            >
              Peer Matching
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              href="#"
              sx={{ margin: 1 }}
            >
              Schedule
            </Link>
          </nav>
          <Button
            color="primary"
            variant="outlined"
            sx={{ my: 1, mx: 1.5, marginLeft: "auto" }}
            onClick={handleSignOut} // Attach the handler here
          >
            Sign Out
          </Button >
        </Toolbar>
      </AppBar>
      <main>
        <div>
          <Container maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
            <Typography
              component="h2"
              variant="h3"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              A Better Way to Recruit
            </Typography>
            <div>
              <Grid container spacing={6} alignItems="flex-end">
                <Grid item xs={12} md={4}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <Typography variant="h5" align="center">
                      1:1 Coaching
                    </Typography>
                    <Typography>
                      The ideal choice if you want a personalized plan that is
                      tailored to your goals and lifestyle.
                    </Typography>
                    <Button variant="contained" color="primary">
                      Learn more
                    </Button>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <Typography variant="h5" align="center">
                      Mock Interviews
                    </Typography>
                    <Typography>
                      Explore wellness principles on your own schedule through a
                      variety of online lessons.
                    </Typography>
                    <Button variant="contained" color="primary">
                      Learn more
                    </Button>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <Typography variant="h5" align="center">
                      Instant Feedback
                    </Typography>
                    <Typography>
                      Begin your wellness journey with full access to our
                      beginner-friendly live webinars and events.
                    </Typography>
                    <Button variant="contained" color="primary">
                      Learn more
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </main>
    </div>
  );
}

export default App;
