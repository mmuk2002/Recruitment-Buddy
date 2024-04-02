import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, List, ListItem, ListItemText, Card, CardContent, Button } from '@mui/material';
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
    axios.get('/api/users')
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
    const userResponse = await fetch(`/api/users/firebaseUid/${firebaseUid}`, {      
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (userResponse.ok) {
      const user = await userResponse.json();
      menteeId = user.firebaseUid;
    } else {
      throw new Error(`Failed to get user: ${userResponse.status}`);
    }

    if (!selectedUser) {
      console.log('No user selected');
      return;
    }

    const mentorId = selectedUser.firebaseUid;
    const response = await fetch('/api/matchRequest/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        mentee: menteeId,
        mentor: mentorId,
        message: message, // Include the message
      }),
    });
    console.log('Response:', response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const matchRequest = await response.json();
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

  return (
    <Container>
          <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
      <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
        Match request sent successfully!
      </Alert>
    </Snackbar>
      <Typography variant="h4" component="h1" gutterBottom>
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
            <ListItemText primary={user.username} />
          </ListItem>
        ))}
      </List>
      {selectedUser && (
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              {selectedUser.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Username: {selectedUser.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {selectedUser.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone Number: {selectedUser.phoneNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Role: {selectedUser.role}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Bio: {selectedUser.bio}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Skills: {selectedUser.skills.join(', ')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Education:
              <List>
                {selectedUser.education.map((edu, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={edu.institution}
                      secondary={`Degree: ${edu.degree}, Field of Study: ${edu.fieldOfStudy}, Start Date: ${format(new Date(edu.startDate), 'MM/dd/yyyy')}, End Date: ${format(new Date(edu.endDate), 'MM/dd/yyyy')}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Experience:
              <List>
                {selectedUser.experience.map((exp, index) => (
                  <ListItem button key={index} onClick={() => handleClickOpen(exp.description)}>
                    <ListItemText
                      primary={exp.title}
                      secondary={`Company: ${exp.company}, Location: ${exp.location}, Start Date: ${format(new Date(exp.startDate), 'MM/dd/yyyy')}, End Date: ${format(new Date(exp.endDate), 'MM/dd/yyyy')}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Typography>
            <TextField
              type="text"
              placeholder="Message"
              value={message}
              onChange={event => setMessage(event.target.value)}
              variant="outlined"
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleMatchRequest}>
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
    </Container>
  );
}

export default Dashboard;