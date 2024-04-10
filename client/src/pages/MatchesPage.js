// src/pages/MatchesPage.js
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Box, Tab, Tabs, List, ListItem, ListItemText, Button } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid } from '@mui/material';
import { app, db, auth, signIn } from '../firebase';
import { useAuth } from '../AuthContext'; // Import the useAuth hook
import CircularProgress from '@mui/material/CircularProgress';
import { HOST } from "../host-config";
import {Paper} from "@mui/material";

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
      const response = await axios.delete(HOST+`api/matches/${matchId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Refresh the matches
      await fetchMatches();
    } catch (error) {
      console.error('Error ending match:', error);
    } finally {
      setLoading(false); // Stop loading when the operation is done
    }
  }

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
      const mentorResponse = await axios.get(HOST + `api/users/firebaseUid/${currentUser.uid}`);
      mentorData = mentorResponse.data;
    } catch (error) {
      console.error('Error fetching mentor:', error);
      setLoading(false); // Stop loading if there's an error
      return;
    }
  
    try {
      // Make a POST request to the backend to create a new match
      const response = await axios.post(HOST+'api/matches', {
        mentee: request.mentee.firebaseUid,
        mentor: currentUser.uid,
        status: 'active',
        contactInfo: {
          email: mentorData.email,
          phone: mentorData.phoneNumber
        }
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      setMatchRequests(matchRequests.filter(req => req._id !== requestId));
      console.log('response:', response.status);
      if (response.status === 201) {
        // If the request was successful, filter out the accepted match request
        await handleReject(requestId);
      } else {
        // If the request was not successful, log the response message'
        console.log("Point 1")
        console.error('Failed to accept match request:', response.data.message);
      }
    } catch (error) {
      console.log("Point 2")
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
      const response = await axios.delete(HOST+`api/matchRequest/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('response:', response);
      if (response.status === 200) {
        // If the request was successful, filter out the deleted match request
        setMatchRequests(matchRequests.filter(request => request._id !== id));
      } else {
        // If the request was not successful, log the response message
        console.error('Failed to reject match request:', response.data.message);
      }
    } catch (error) {
      console.error('Failed to reject match request:', error);
    } finally {
      setLoading(false); // Stop loading when the operation is done
    }
  };

  const fetchUser = async (firebaseUid, setUser) => {
    try {
      const response = await axios.get(HOST + `api/users/firebaseUid/${firebaseUid}`);
      const userData = response.data;
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
      const response = await axios.get(HOST+'api/matchRequest', {
        headers: {
          'Content-Type': 'application/json',
          'firebaseuuid': firebaseUUID
        },
      });

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let matchRequests = response.data;

      // Filter match requests where the current user is the mentor
      matchRequests = matchRequests.filter(request => request.mentor === firebaseUUID);

      // Fetch mentee information for each match request
      matchRequests = await Promise.all(matchRequests.map(async (request) => {
        const menteeResponse = await axios.get(HOST+`api/users/firebaseUid/${request.mentee}`);
        const menteeData = menteeResponse.data;
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
      const response = await axios.get(HOST+`api/matches/${currentUser.uid}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let matches = response.data;

      // Fetch mentor and mentee information for each match
      matches = await Promise.all(matches.map(async (match) => {
        const mentorResponse = await axios.get(HOST+`api/users/firebaseUid/${match.mentor}`);
        const mentorData = mentorResponse.data;
        const menteeResponse = await axios.get(HOST+`api/users/firebaseUid/${match.mentee}`);
        const menteeData = menteeResponse.data;
        return { ...match, mentor: mentorData, mentee: menteeData };
      }));

      setMatches(matches);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs indicatorColor='#0096b5' TabIndicatorProps={{style: {background: '#0096b5'}}} value={value} onChange={handleChange} aria-label="basic tabs example">
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
                      <Grid item xs={6} md={5}>
                        <ListItemText sx={{color: '#0096b5'}} primary={request.mentee.fullName} />
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <ListItemText secondary={request.message} />
                      </Grid>
                    </Grid>
                  </Button>
                  <Box sx={{paddingRight: '10px'}}>
                  <Button variant="contained" sx={{backgroundColor: '#0096b5'}} onClick={() => handleAccept(request._id)}>Accept</Button>
                  </Box>
                  <Box>
                  <Button variant="contained" sx={{backgroundColor: '#000000', color: '#8aebff'}} onClick={() => handleReject(request._id)}>Reject</Button>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}
          {value === 1 && (
            <List>
              {matches.map((match) => (
                <ListItem key={match._id}>
                  <Button onClick={() => handleClickOpen(match)} sx={{ width: '100%'}}>
                    <Grid container>
                      <Grid item xs={5} md={4}>
                        <ListItemText sx={{color:'#0096b5'}} primary={match.mentee.fullName} />
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <ListItemText sx={{color: '#a6a6a6'}} secondary={match.mentee.email} />
                      </Grid>
                    </Grid>
                  </Button>
                  <Button variant="contained" sx={{backgroundColor: "#0096b5"}} onClick={() => handleEndMatch(match._id)}>End Match</Button>
                </ListItem>
              ))}
            </List>
          )}
        </>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{color: '#0096b5'}}>Match Information</DialogTitle>
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
          <Button sx={{color: '#0096b5'}} onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
    </Paper>
    </div>
  );
}

export default MatchesPage;