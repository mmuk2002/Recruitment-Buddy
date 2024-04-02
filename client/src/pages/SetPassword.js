import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { auth } from '../firebase';
import { updatePassword } from 'firebase/auth';

const SetPassword = () => {
  const [newPassword, setNewPassword] = useState('');

  const handleSetPassword = async () => {
    if (!newPassword) {
      alert('Please enter a new password.');
      return;
    }

    try {
      await updatePassword(auth.currentUser, newPassword);
      alert('Password set successfully.');
      setNewPassword(''); // Clear the password field
    } catch (error) {
      console.error('Error setting password:', error);
      alert('Error setting password: ' + error.message);
    }
  };

  return (
    <div>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="newPassword"
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSetPassword}
      >
        Set Password
      </Button>
    </div>
  );
};

export default SetPassword;
