// src/pages/MatchesPage.js

import React, { useState, useEffect } from 'react';
import { Box, Tab, Tabs, List, ListItem, ListItemText, Button } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

function MatchesPage() {
  const [value, setValue] = useState(0);
  const [matchRequests, setMatchRequests] = useState([]);
  const [matches, setMatches] = useState([]);
  const [mentor, setMentor] = useState(null);
  const [open, setOpen] = useState(false);
  const auth = getAuth();

  async function loginUser(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in');
      fetchMatchRequests();
    } catch (error) {
      console.error('Error signing in:', error);
    }
  }

  useEffect(() => {
    const email = "recruitmentbuddy@gmail.com";
    const password = "1357911";
    loginUser(email, password);
  }, []);

  useEffect(() => {
    fetchMatchRequests();
    fetchMatches();
  }, []);


  const handleClickOpen = (matchRequest) => {
    fetchUser(matchRequest.mentor, setMentor);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = async (requestId) => {
    // Call the server to accept the match request
    // This is just a placeholder, replace it with your actual code

    // Remove the accepted request from the matchRequests state variable
    setMatchRequests(matchRequests.filter(request => request.id !== requestId));
  };

  const fetchUser = async (firebaseUid, setUser) => {
    try {
      const response = await fetch(`/api/users/firebaseUid/${firebaseUid}`);
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleClick = (matchRequest) => {
    fetchUser(matchRequest.mentor, setMentor);
  };

  const handleReject = async (requestId) => {
    // Call the server to reject the match request
    // This is just a placeholder, replace it with your actual code

    // Remove the rejected request from the matchRequests state variable
    setMatchRequests(matchRequests.filter(request => request.id !== requestId));
  };

  const fetchMatchRequests = async () => {
    try {
      const firebaseUUID = auth.currentUser.uid;
      console.log('firebaseUUID:', firebaseUUID);
      const response = await fetch('/api/matchRequest', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'firebaseuuid': firebaseUUID
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      let matchRequests = await response.json();
  
      // Fetch mentee information for each match request
      matchRequests = await Promise.all(matchRequests.map(async (request) => {
        const menteeResponse = await fetch(`/api/users/firebaseUid/${request.mentee}`);
        const menteeData = await menteeResponse.json();
        console.log('menteeData:', menteeResponse);
        console.log('menteeResponse:', request);
        return { ...request, mentee: menteeData };
      }));
  
      setMatchRequests(matchRequests);
    } catch (error) {
      console.error('Error fetching match requests:', error);
    }
  };

  const fetchMatches = async () => {
    // Fetch matches from your server
    // and set them in the state variable
    // This is just a placeholder, replace it with your actual code
    setMatches([{ id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', phone: '123-456-7890' }]);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Match Requests" />
          <Tab label="Matches" />
        </Tabs>
      </Box>
      {value === 0 && (
        <List>
          {matchRequests.map((request) => (
            <ListItem key={request.id}>
              <ListItemText primary={request.name} secondary={request.message} />
              <Button variant="contained" color="primary" onClick={() => handleAccept(request.id)}>Accept</Button>
              <Button variant="contained" color="secondary" onClick={() => handleReject(request.id)}>Reject</Button>
            </ListItem>
          ))}
        </List>
      )}
      {value === 1 && (
        <List>
          {matches.map((match) => (
            <ListItem key={match.id}>
              <Button onClick={() => handleClickOpen(match)}>
                <ListItemText primary={match.name} secondary={`${match.email}, ${match.phone}`} />
              </Button>
            </ListItem>
          ))}
        </List>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Mentor Information</DialogTitle>
        {mentor && (
          <DialogContent>
            <DialogContentText>Name: {mentor.name}</DialogContentText>
            <DialogContentText>Email: {mentor.email}</DialogContentText>
            <DialogContentText>Phone: {mentor.phone}</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MatchesPage;