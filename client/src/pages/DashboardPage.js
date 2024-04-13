import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HOST } from "../host-config";
import { Container, List, ListItem, ListItemText, Card, CardContent, Button, createTheme, ThemeProvider } from '@mui/material';
import { format } from 'date-fns';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { Grid, TextField, Typography } from '@material-ui/core';
import { app, db, auth, signIn } from '../firebase';
import { useAuth } from '../AuthContext'; // Import the useAuth hook
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {Paper} from "@mui/material";
import CalendlyWidget from '../components/CalendlyWidget'; // Adjust the path based on your file structure

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState('');
  const [skillsFilter, setSkillsFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [message, setMessage] = useState('');
  const [educationFilter, setEducationFilter] = useState('');
  const { currentUser } = useAuth(); // Use the useAuth hook to get the current user
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleClickOpen = (description) => {
    setDialogContent(description);
    setOpen(true);
  };

  function handleSnackbarClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
  
    setSnackbarOpen(false);
  }
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios.get(HOST + 'api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  function handleUserClick(user) {
    setSelectedUser(user);
  }

  useEffect(() => {
    if (currentUser) {
      console.log('User signed in');
    } else {
      console.error('No user is signed in');
    }
  }, [currentUser]); // Add a dependency on currentUser to the useEffect hook

  async function handleMatchRequest() {
    if (!currentUser) {
      console.log('No user is signed in');
      return;
    }
    const firebaseUid = currentUser.uid;
    let token;
    try {
      token = await currentUser.getIdToken();
    } catch (error) {
      console.error('Error getting ID token:', error);
      return;
    }
    // Get the mentee ID from the server
    let menteeId;
    const userResponse = await axios.get(HOST + `api/users/firebaseUid/${firebaseUid}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  
    const user = userResponse.data;
    menteeId = user.firebaseUid;
  
    if (!selectedUser) {
      console.log('No user selected');
      return;
    }
  
    const mentorId = selectedUser.firebaseUid;
    const response = await axios.post(HOST+'api/matchRequest/', {
      mentee: menteeId,
      mentor: mentorId,
      message: message, // Include the message
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  
    console.log('Response:', response);
    
    const matchRequest = response.data;
    console.log('Match request created:', matchRequest);
    setSnackbarOpen(true);
  }

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(filter.toLowerCase()) 
    &&
    user.skills.some(skill => skill.toLowerCase().includes(skillsFilter.toLowerCase())) 
    &&
    user.role.toLowerCase().includes(roleFilter.toLowerCase()) 
  );

  const theme = createTheme({
    components: {
      TextField: {
        styleOverrides: {
          root: {
            "& .MuiInput-root": {
              color: "#000",
              fontFamily: "Arial",
              fontWeight: "bold",
          }
        }
      }
    },
    color: '#ffffff'
  }
  })

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
      }}
    >
    <Paper sx={{
          marginTop: 5,
          padding: 2,
        }}>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Match request sent successfully!
        </Alert>
      </Snackbar>
        <Typography variant="h4" style={{color: '#0096b5'}} gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            type="text"
            placeholder="Filter by username"
            value={filter}
            onChange={handleFilterChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            type="text"
            placeholder="Filter by skills"
            value={skillsFilter}
            onChange={event => setSkillsFilter(event.target.value)}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            type="text"
            placeholder="Filter by role"
            value={roleFilter}
            onChange={event => setRoleFilter(event.target.value)}
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
      <List>
        {filteredUsers.map(user => (
          <ListItem button key={user._id} onClick={() => handleUserClick(user)}>
            <ListItemText primary={user.fullName} style={{color: '#000000'}} />
          </ListItem>
        ))}
      </List>
      {selectedUser && (
        <Card>
          <CardContent style={{backgroundColor: 'white'}}>
            <Typography variant="h5" color='text.secondary' component="div" style={{color: 'black'}}>
              {selectedUser.fullName}
            </Typography>
            <Typography variant="body2" style={{paddingTop: '10px', paddingLeft:'10px'}}>
              Username: {selectedUser.username}
            </Typography>
            <Typography variant="body2" style={{paddingLeft: '10px', paddingTop: '5px'}}>
              Email: {selectedUser.email}
            </Typography>
            <Typography variant="body2" style={{paddingLeft: '10px', paddingTop: '5px'}}>
              Phone Number: {selectedUser.phoneNumber}
            </Typography>
            <Typography variant="body2" style={{paddingLeft: '10px', paddingTop: '5px'}}>
              Role: {selectedUser.role}
            </Typography>
            <Typography variant="body2" style={{paddingLeft: '10px', paddingTop: '5px'}}>
              Bio: {selectedUser.bio}
            </Typography>
            <Typography variant="body2" style={{paddingLeft: '10px', paddingTop: '5px', paddingBottom: '5px'}}>
              Skills: {selectedUser.skills.join(', ')}
            </Typography>
            <Typography variant="h7" style={{paddingLeft: '10px'}}>
              Education:
            </Typography>
            <List sx={{marginTop: '-15px'}}>
              {selectedUser.education.map((edu, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={
                      <Typography variant="body2" color="text.secondary">
                        {edu.institution}
                      </Typography>
                    }
                    secondary={
                      <div>
                      <Typography style={{paddingLeft: '10px', color: 'white'}} variant="body2">
                        Degree: {edu.degree}
                      </Typography>
                      <Typography style={{paddingLeft: '10px', color: 'white'}} variant="body2" color="text.secondary">
                        Field of Study: {edu.fieldOfStudy}
                      </Typography>
                      <Typography style={{paddingLeft: '10px', color: 'white'}} variant="body2" color="text.secondary">
                        Start Date: {format(new Date(edu.startDate), 'MM/dd/yyyy')}
                      </Typography>
                      <Typography style={{paddingLeft: '10px', color: 'white'}} variant="body2" color="text.secondary">
                        End Date: {format(new Date(edu.endDate), 'MM/dd/yyyy')}
                      </Typography>
                      </div>
                      }
                  />
                </ListItem>
              ))}
            </List>
            <Typography style={{paddingLeft: '10px'}} variant="h7">
              Experience:
            </Typography>
            <List>
              {selectedUser.experience.map((exp, index) => (
                <ListItem button key={index} onClick={() => handleClickOpen(exp.description)}>
                  <ListItemText
                    primary={
                      <Typography variant="body2" color="text.secondary">
                      {exp.title}
                      </Typography>
                    }
                    secondary={
                      <div>
                        <Typography style={{paddingLeft: '10px', color: 'white'}} variant="body2" color="text.secondary">
                        Company: {exp.company}
                        </Typography>
                        <Typography style={{paddingLeft: '10px', color: 'white'}} variant="body2" color="text.secondary">
                          Location: {exp.location}
                        </Typography>
                        <Typography style={{paddingLeft: '10px', color: 'white'}} variant="body2" color="text.secondary">
                          Start Date: {format(new Date(exp.startDate), 'MM/dd/yyyy')}
                        </Typography>
                        <Typography style={{paddingLeft: '10px', color: 'white'}} variant="body2" color="text.secondary">
                          End Date: {format(new Date(exp.endDate), 'MM/dd/yyyy')}
                        </Typography>
                      </div>
                    }
                    sx={{marginTop: '-10px'}}
                  />
                </ListItem>
              ))}
            </List>
            < CalendlyWidget url="https://calendly.com/elanaagarwal/coffee-chat">
            </CalendlyWidget>
            <Paper sx={{marginTop: '15px'}}>
            <TextField
              type="text"
              placeholder="Message"
              value={message}
              onChange={event => setMessage(event.target.value)}
              variant="outlined"
              fullWidth
              focused
            />
            </Paper>
            <Button variant="contained" style={{marginTop: '20px', backgroundColor: '#0096b5'}} onClick={handleMatchRequest}>
              Send Match Request
            </Button>
          </CardContent>
        </Card>
      )}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Description</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{dialogContent}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
    </div>
  );
}

export default Dashboard;