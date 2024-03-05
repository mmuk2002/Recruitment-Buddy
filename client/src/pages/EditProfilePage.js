// src/pages/EditProfilePage.js

import React from 'react';
import {Avatar, Typography, Paper, Grid, Box, Container, Button, TextField, FormControl} from '@mui/material';
import {Input} from '@mui/base/Input';

const EditProfilePage = () => {
  return (
    <div style={{backgroundColor: '#6ebdfa', minHeight: '100vh', padding: '20px'}} >
      <Paper sx={{padding: 2, marginTop:2, display:'flex', justifyContent:'center'}} className="profile-page">
        <Grid container>
            <Grid item xs={6} md={6} sx={{display: 'flex', flexDirection:'column', alignItems:'center', padding:2}} >
              <Avatar alt={`Edit profile`} sx={{ width: 100, height: 100, backgroundColor:'#1769aa'}} />
              <Typography variant="h5" align='center' sx={{color:'#063257', padding:2}} >Edit Profile</Typography>
              {/* <Button variant="contained" onClick={navigateToEdit} sx={{backgroundColor:'#1769aa'}}>Edit Profile</Button> */}
              <Container component="section" className="profile-body">
                <FormControl defaultValue="" required>
                  <Typography variant="subtitle1" sx={{color:'#1769aa'}}>First Name</Typography>
                  <TextField type="text" size="small" varient="outlined" defaultValue=""/>
                
                  <Typography variant="subtitle1" sx={{color:'#1769aa'}}>Last Name</Typography>
                  <TextField type="text" fullWidth size="small" varient="outlined" defaultValue=""/>
                </FormControl>
                
                <FormControl fullWidth defaultValue="" required>
                  <Typography variant="subtitle1" sx={{color:'#1769aa', marginTop:'10px'}}>Bio</Typography>
                  <TextField type="text" id="outlined-multiline-static" multiline rows={4} varient="outlined" defaultValue=""/>

                  <Typography variant="subtitle1" sx={{color:'#1769aa'}}>Experience</Typography>
                  <TextField type="text" id="outlined-multiline-static" multiline rows={4} varient="outlined" defaultValue=""/>
                </FormControl>
              </Container>
            </Grid>
           
            <Grid xs={6} md={6} sx={{paddingTop:20}} >
              <Container component="section" sx={{marginTop:2, border:'1px'}} className="profile-body">
                <FormControl fullwidth defaultValue="" required>
                  <Typography variant="subtitle1" sx={{color:'#1769aa'}}>Institution</Typography>
                  <TextField type="text" size="small" varient="outlined" defaultValue=""/>
                
                  <Typography variant="subtitle1" sx={{color:'#1769aa'}}>Graduation Year</Typography>
                  <TextField type="text" fullWidth size="small" varient="outlined" defaultValue=""/>

                  <Typography variant="subtitle1" sx={{color:'#1769aa'}}>Major(s)</Typography>
                  <TextField type="text" fullWidth size="small" varient="outlined" defaultValue=""/>
                </FormControl>
              </Container>
              <Container component="section" sx={{marginTop:2, border:'1px'}} className="profile-body">
                <FormControl fullWidth defaultValue="" required>
                  <Typography variant="subtitle1" sx={{color:'#1769aa'}}>Skills</Typography>
                  <TextField type="text" id="outlined-multiline-static" multiline rows={4} varient="outlined" defaultValue=""/>            
                </FormControl>
                <Button sx={{color:'#1769aa', marginTop:'45px', marginRight:'20px'}} >Cancel</Button>
                <Button variant="contained" sx={{backgroundColor:'#1769aa', marginTop:'45px'}}>Save Changes</Button> 
              </Container>
            </Grid>
          </Grid>
  
      </Paper>
    </div>);
};

export default EditProfilePage;
