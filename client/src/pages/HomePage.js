import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

function HomePage() {
  return (
    <div>
      <main>
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
          <Grid container spacing={5} alignItems="flex-end">
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
                <Typography align="center" style={{ padding: '10px' }}>
                  The ideal choice if you want a personalized plan that is
                  tailored to your goals and lifestyle.
                </Typography>
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
                <Typography align="center" style={{ padding: '10px' }}>
                  Explore wellness principles on your own schedule through a
                  variety of online lessons.
                </Typography>
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
                <Typography align="center" style={{ padding: '10px' }}>
                  Begin your wellness journey with full access to our
                  beginner-friendly live webinars and events.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default HomePage;