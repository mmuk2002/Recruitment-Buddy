// src/pages/MatchesPage.js

import React, { useState, useEffect } from 'react';
import { Box, Tab, Tabs, List, ListItem, ListItemText, Button } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid } from '@mui/material';
import { app, db, auth, signIn } from '../firebase';
import { useAuth } from '../AuthContext'; // Import the useAuth hook
import CircularProgress from '@mui/material/CircularProgress';

function MatchesPage() {
  const [value, setValue] = useState(0);
  const { currentUser } = useAuth(); // Use the useAuth hook to get the current user
  const [matchRequests, setMatchRequests] = useState([]);
  const [matches, setMatches] = useState([]);
  const [mentor, setMentor] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedMentee, setSelectedMentee] = useState(null);
  const auth = getAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      console.log('User signed in');
    } else {
      console.error('No user is signed in');
    }
  }, [currentUser]); // Add a dependency on currentUser to the useEffect hook

  useEffect(() => {
    fetchMatchRequests();
    fetchMatches();
  }, [matchRequests]);


  const handleClickOpen = (request) => {
    setSelectedMentee(request.mentee);
    setOpen(true);
  };
  const handleEndMatch = async (matchId) => {
    setLoading(true); // Start loading
    let token;
    try {
      token = await currentUser.getIdToken();
    } catch (error) {
      console.error('Error getting ID token:', error);
      setLoading(false); // Stop loading if there's an error
      return;
    }
  
    try {
      const response = await fetch(`/api/matches/${matchId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    
      // const data = await response.json();
      // console.log(data.message);
    
      // Refresh the matches
      await fetchMatches();
    } catch (error) {
      console.error('Error ending match:', error);
    } finally {
      setLoading(false); // Stop loading when the operation is done
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = async (requestId) => {
    setLoading(true); // Start loading
    if (!currentUser) {
      console.log('No user is signed in');
      setLoading(false); // Stop loading if there's an error
      return;
    }
    const newMatchRequests = matchRequests.filter(req => req._id !== requestId);
    setMatchRequests(newMatchRequests);
    let token;
    try {
      token = await currentUser.getIdToken();
    } catch (error) {
      console.error('Error getting ID token:', error);
      setLoading(false); // Stop loading if there's an error
      return;
    }
  
    const request = matchRequests.find(req => req._id === requestId);
    if (!request) {
      console.error('Match request not found:', requestId);
      setLoading(false); // Stop loading if there's an error
      return;
    }
  
    // Fetch the mentor's information
    let mentorData;
    try {
      const mentorResponse = await fetch(`/api/users/firebaseUid/${currentUser.uid}`);
      mentorData = await mentorResponse.json();
    } catch (error) {
      console.error('Error fetching mentor:', error);
      setLoading(false); // Stop loading if there's an error
      return;
    }
  
    try {
      // Make a POST request to the backend to create a new match
      const response = await fetch('/api/matches', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mentee: request.mentee.firebaseUid,
          mentor: currentUser.uid,
          status: 'active',
          contactInfo: {
            email: mentorData.email,
            phone: mentorData.phoneNumber
          }
        })
      });
      console.log('response:', response);
      if (response.ok) {
        // If the request was successful, filter out the accepted match request
        setMatchRequests(matchRequests.filter(req => req._id !== requestId));
        await handleReject(requestId);
      } else {
        // If the request was not successful, log the response message
        const data = await response.json();
        console.error('Failed to accept match request:', data.message);
      }
    } catch (error) {
      console.error('Failed to accept match request:', error);
      setLoading(false); // Stop loading if there's an error
    } finally {
      setLoading(false); // Stop loading when the operation is done
    }
  };

  const handleReject = async (id) => {
    setLoading(true); // Start loading
    if (!currentUser) {
      console.log('No user is signed in');
      setLoading(false); // Stop loading if there's an error
      return;
    }
    const newMatchRequests = matchRequests.filter(request => request._id !== id);
    setMatchRequests(newMatchRequests);
    let token;
    try {
      token = await currentUser.getIdToken();
    } catch (error) {
      console.error('Error getting ID token:', error);
      setLoading(false); // Stop loading if there's an error
      return;
    }

    try {
      // Make a DELETE request to the backend
      const response = await fetch(`/api/matchRequest/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('response:', response);
      if (response.ok) {
        // If the request was successful, filter out the deleted match request
        setMatchRequests(matchRequests.filter(request => request._id !== id));
      } else {
        // If the request was not successful, log the response message
        const data = await response.json();
        console.error('Failed to reject match request:', data.message);
      }
    } catch (error) {
      console.error('Failed to reject match request:', error);
    } finally {
      setLoading(false); // Stop loading when the operation is done
    }
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

  const fetchMatchRequests = async () => {
    try {
      const firebaseUUID = currentUser.uid;
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
  
      // Filter match requests where the current user is the mentor
      matchRequests = matchRequests.filter(request => request.mentor === firebaseUUID);
  
      // Fetch mentee information for each match request
      matchRequests = await Promise.all(matchRequests.map(async (request) => {
        const menteeResponse = await fetch(`/api/users/firebaseUid/${request.mentee}`);
        const menteeData = await menteeResponse.json();
        return { ...request, mentee: menteeData };
      }));
  
      setMatchRequests(matchRequests);
    } catch (error) {
      console.error('Error fetching match requests:', error);
    }
  };

  const fetchMatches = async () => {
    if (!currentUser) {
      console.log('No user is signed in');
      return;
    }

    let token;
    try {
      token = await currentUser.getIdToken();
    } catch (error) {
      console.error('Error getting ID token:', error);
      return;
    }

    try {
      const response = await fetch(`/api/matches/${currentUser.uid}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let matches = await response.json();

      // Fetch mentor and mentee information for each match
      matches = await Promise.all(matches.map(async (match) => {
        const mentorResponse = await fetch(`/api/users/firebaseUid/${match.mentor}`);
        const mentorData = await mentorResponse.json();
        const menteeResponse = await fetch(`/api/users/firebaseUid/${match.mentee}`);
        const menteeData = await menteeResponse.json();
        return { ...match, mentor: mentorData, mentee: menteeData };
      }));
      setMatches(matches);
    }
    catch (error) {
      console.error('Error fetching matches:', error);
    }
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
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {value === 0 && (
            <List>
              {matchRequests.map((request) => (
                <ListItem key={request._id}>
                  <Button onClick={() => handleClickOpen(request)} sx={{ width: '100%', justifyContent: 'flex-start' }}>
                    <Grid container>
                      <Grid item xs={6}>
                        <ListItemText primary={request.mentee.fullName} />
                      </Grid>
                      <Grid item xs={6}>
                        <ListItemText secondary={request.message} />
                      </Grid>
                    </Grid>
                  </Button>
                  <Button variant="contained" color="primary" onClick={() => handleAccept(request._id)}>Accept</Button>
                  <Button variant="contained" color="secondary" onClick={() => handleReject(request._id)}>Reject</Button>
                </ListItem>
              ))}
            </List>
          )}
          {value === 1 && (
            <List>
              {matches.map((match) => (
                <ListItem key={match._id}>
                  <Button onClick={() => handleClickOpen(match)} sx={{ width: '100%', justifyContent: 'flex-start' }}>
                    <Grid container>
                      <Grid item xs={6}>
                        <ListItemText primary={match.mentee.fullName} />
                      </Grid>
                      <Grid item xs={6}>
                        <ListItemText secondary={match.mentor.email} />
                      </Grid>
                    </Grid>
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleEndMatch(match._id)}>End Match</Button>
                </ListItem>
              ))}
            </List>
          )}
        </>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Match Information</DialogTitle>
        {selectedMentee && (
          <DialogContent>
            <DialogContentText>Name: {selectedMentee.fullName}</DialogContentText>
            <DialogContentText>Email: {selectedMentee.email}</DialogContentText>
            <DialogContentText>Phone: {selectedMentee.phoneNumber}</DialogContentText>
            <DialogContentText>Skills: {selectedMentee.skills.join(', ')}</DialogContentText>
            <DialogContentText>Calendly Link: {selectedMentee.calendlyLink}</DialogContentText>
            {/* Add more fields as needed */}
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