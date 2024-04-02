import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useAuth } from '../AuthContext'; // make sure this path is correct
import { auth } from '../firebase'; // make sure this path is correct
import { updatePassword } from 'firebase/auth';

const ProfilePage = () => {
  const { currentUser } = useAuth(); // useAuth() is a hook we created in AuthContext.js
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    role: '',
    firebaseUid: '',
    fullName: '',
    bio: '',
    skills: [],
    education: [],
    experience: [],
    calendlyLink: '',
  });
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        const token = await currentUser.getIdToken();
        const response = await fetch(`/api/users/firebaseUid/${currentUser.uid}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUserData(data); // Populate userData with the fetched data
        setLoading(false);
      };

      fetchUserData().catch(console.error);
    }
  }, [currentUser]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!currentUser) {
      alert('You need to be signed in to update your profile');
      return;
    }

    try {
      const token = await currentUser.getIdToken();
      await fetch(`/api/users/${userData._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (newPassword) {
        // If newPassword is set, attempt to change the password
        await updatePassword(currentUser, newPassword);
        setNewPassword(''); // Clear the password field after update
      }

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile: ' + error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container component="main" maxWidth="sm">
      <Typography component="h1" variant="h5">
        Profile Page
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Fields to display but not editable */}
        <TextField
          margin="normal"
          fullWidth
          id="fullName"
          label="Full Name"
          name="fullName"
          value={userData.fullName}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          margin="normal"
          fullWidth
          id="email"
          label="Email"
          name="email"
          value={userData.email}
          InputProps={{
            readOnly: true,
          }}
        />

        {/* Editable fields */}
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="phoneNumber"
          label="Phone Number"
          name="phoneNumber"
          autoComplete="tel"
          value={userData.phoneNumber}
          onChange={handleInputChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="calendlyLink"
          label="Calendly Link"
          name="calendlyLink"
          value={userData.calendlyLink}
          onChange={handleInputChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="role"
          label="Role"
          name="role"
          value={userData.role}
          onChange={handleInputChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="bio"
          label="Bio"
          name="bio"
          multiline
          rows={4}
          value={userData.bio}
          onChange={handleInputChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="skills"
          label="Skills"
          name="skills"
          value={Array.isArray(userData.skills) ? userData.skills.join(', ') : ''}
          onChange={(e) => setUserData({ ...userData, skills: e.target.value.split(', ') })}
        />

        {/* Change password field */}
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="newPassword"
          label="New Password"
          type="password"
          id="newPassword"
          autoComplete="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        {/* Experience fields */}
        {userData.experience && userData.experience.length > 0 && (
          <Typography variant="h6" gutterBottom>
            Experience
          </Typography>
        )}
        {Array.isArray(userData.experience) && userData.experience.map((exp, index) => (
          <div key={index}>
            {/* Implement fields for each experience */}
          </div>
        ))}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '24px' }}
        >
          Update Profile
        </Button>
      </form>
    </Container>
  );
};

export default ProfilePage;