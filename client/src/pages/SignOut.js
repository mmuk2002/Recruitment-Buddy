import React from 'react';
import { useNavigate } from 'react-router-dom'; // For redirecting to the sign-in page
import { Button } from '@mui/material';
import { auth } from '../firebase'; // Adjust the path as needed
import { signOut } from 'firebase/auth';

const SignOut = () => {
  const navigate = useNavigate(); // Hook for redirecting

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate('/sign-in'); // Redirect to the sign-in page
    } catch (error) {
      console.error('Error signing out: ', error);
      alert('Error signing out: ' + error.message);
    }
  };

  return (
    <Button onClick={handleSignOut} color="inherit">
      Sign Out
    </Button>
  );
};

export default SignOut;




