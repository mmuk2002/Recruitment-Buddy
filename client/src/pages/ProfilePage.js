// client/src/pages/ProfilePage.js

import React, {useEffect, useState} from 'react';
import {Avatar, Typography, Paper, Grid, Box, Button} from '@mui/material';
import {Routes, Route, useNavigate} from 'react-router-dom';
import EditProfilePage from './EditProfilePage';
import { getUserInfo } from '../api/profile'; 

const ProfilePage = () => {
  const navigate = useNavigate();
  const navigateToEdit = () => {
    // navigate to edit profile page
    navigate('/edit-profile');
  };
  const [profileData, setProfileData] = useState("");

  const { education } = profileData;
  const educationItems = education.map(education)


  const retrieveUserProfileData = async () => {
    try {
      const response = await getUserInfo('65cea289942e4bcd4f4f9d9d');
      
      setProfileData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    retrieveUserProfileData();
  }, []);

  useEffect(()=> {
    if(profileData !== "" && profileData !== null && profileData !== undefined) {
      console.log("User data is:" + JSON.stringify(profileData));
    }
  }, [profileData]);

  return (
  <div style={{backgroundColor: '#6ebdfa', minHeight: '100vh', padding: '20px'}} >
    <Paper sx={{padding: 2, marginTop:2, display:'flex', justifyContent:'center'}} className="profile-page">
      <Grid container>
          <Grid item xs={4} md={4} sx={{display: 'flex', flexDirection:'column', alignItems:'center', padding:2}} >
            <Avatar alt={`My profile`} sx={{ width: 150, height: 150, backgroundColor:'#1769aa'}} />
            <Typography variant="h5" sx={{color:'#063257', padding:2}} >My Profile</Typography>
            <Button variant="contained" onClick={navigateToEdit} sx={{backgroundColor:'#1769aa'}}>Edit Profile</Button>
          </Grid>
          <Grid item xs={3} md={3}>
            <Typography variant="h5" sx={{marginTop:2, color:'#1769aa' }}>{profileData.fullName}</Typography>
            <Typography variant="subtitle1">{profileData.email}</Typography>
            <Typography variant="subtitle2">Username: {profileData.username}</Typography>
            <Box component="section" sx={{marginTop:2, border:'1px'}} className="profile-body">
              <Typography variant="h5" sx={{color:'#1769aa'}}>Bio</Typography>
              <Typography>{profileData.bio}</Typography>
            </Box>
            </Grid>
            <Grid xs={5} md={5}>
            <Box component="section" sx={{marginTop:2, border:'1px'}} className="profile-body">
              <Typography variant="h5" sx={{color:'#1769aa'}}>Education</Typography>
              <Typography>Institution: {profileData.skills}</Typography>
              <Typography>Graduation Year:</Typography>
              <Typography>Major(s): Computer Science, Economics</Typography>
            </Box>
            <Box component="section" sx={{marginTop:2, border:'1px'}} className="profile-body">
              <Typography variant="h5" sx={{color:'#1769aa'}}>Experience</Typography>
              <Typography>{profileData.experience[0]}</Typography>
            </Box>

            <Box component="section" sx={{marginTop:2, border:'1px'}} className="profile-body">
              <Typography variant="h5" sx={{color:'#1769aa'}}>Skills</Typography>
              <Typography>{profileData.skills[0]}, {profileData.skills[1]}, {profileData.skills[2]}</Typography>
            </Box>
          </Grid>
        </Grid>

    </Paper>
  </div>);
};

export default ProfilePage;