// src/components/NavBar.js

// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { Link } from 'react-router-dom';

// export default function NavBar() {
//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           Vanderbilt Recruitment Platform
//         </Typography>
//         <Button color="inherit" component={Link} to="/">Home</Button>
//         <Button color="inherit" component={Link} to="/profile">Profile</Button>
//         <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
//         <Button color="inherit" component={Link} to="/matches">Matches</Button> {/* Add this line */}
//       </Toolbar>
//     </AppBar>
//   );
// }



import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { auth } from '../firebase'; // Adjust this path if necessary
import { signOut } from 'firebase/auth';

export default function NavBar() {
  const navigate = useNavigate();

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
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Vanderbilt Recruitment Platform
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/profile">Profile</Button>
        <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
        <Button color="inherit" component={Link} to="/matches">Matches</Button>
        {/* Sign Out Button */}
        <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>
      </Toolbar>
    </AppBar>
  );
}


