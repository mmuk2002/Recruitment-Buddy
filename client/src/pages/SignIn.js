// import React from 'react';
// import { auth } from '../firebase'; // Adjust the path as needed
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// const SignIn = () => {
//   const signInWithGoogle = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       // User is signed in or signed up!
//       // Handle the signed-in user info here
      
//       // Optionally, save user to your database
//       saveUserToDatabase(result.user);
//     } catch (error) {
//       console.error('Google Sign-In error:', error.message);
//     }
//   };

//   const saveUserToDatabase = async (user) => {
//     // Example function to save user to your database
//     try {
//       const response = await fetch('/api/users/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImFlYzU4NjcwNGNhOTZiZDcwMzZiMmYwZDI4MGY5NDlmM2E5NzZkMzgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVjcnVpdG1lbnRidWRkeS1lZDRmMCIsImF1ZCI6InJlY3J1aXRtZW50YnVkZHktZWQ0ZjAiLCJhdXRoX3RpbWUiOjE3MDgwNDA4NTUsInVzZXJfaWQiOiJuYlhCdTF1MnVaWWhRWXZVSWNEeElKVklaeDkyIiwic3ViIjoibmJYQnUxdTJ1WlloUVl2VUljRHhJSlZJWng5MiIsImlhdCI6MTcwODA0MDg1NSwiZXhwIjoxNzA4MDQ0NDU1LCJlbWFpbCI6InJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.bnILNMSYhi7y6PWnDzzQP3Z-8tsPCdejZcuC3Xcr7XSpzJ0q1E44Si5ydksXk6fMIHPxBaPToq7rCSgsJE_Wt-0xxhYbVdO54KU_y13be8IScCe3ENE75hEjZti3tknc9gBtkkz6ILqwRGDxFhUOhibm_4BYnphNHeF-aiA-KD_Q6TP85u9mPnwmrI2dXl9T6cpSrs0NHaAq2ovqUUKsQNjdb8JbXoGMu9842hQw56WhcBDabr8FUolbtX5L_s5WpgH3XjnH_8mlL8MHpHLJVO00NGJ4t3CDcBXqXOyDwMcTC3erkAi69m_ggY00eZ7CS0xVLIfgQowjsnZDsNoO5Q`
//         },
//         body: JSON.stringify({
//           uid: user.uid,
//           name: user.displayName,
//           email: user.email,
//           photoURL: user.photoURL,
//         }),
//       });
//       if (!response.ok) throw new Error('Failed to save user to database');
//       console.log('User saved to database:', await response.json());
//     } catch (error) {
//       console.error('Error saving user to database:', error);
//     }
//   };

//   return (
//     <div className="signIn-container">
//       <h1>Sign In with Google</h1>
//       <button onClick={signInWithGoogle}>Sign In with Google</button>
//     </div>
//   );
// };

// export default SignIn;






// import React from 'react';
// import { auth } from '../firebase'; // Adjust the path as needed
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// const SignIn = () => {
//   const signInWithGoogle = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       // User is signed in or signed up!
      
//       // Now, save the new user info to the database
//       saveUserToDatabase(result.user);
//     } catch (error) {
//       console.error('Google Sign-In error:', error.message);
//     }
//   };

//   const saveUserToDatabase = async (user) => {
//     // Construct the user data for MongoDB
//     const userDataForMongoDB = {
//       username: user.email, // Assuming you're using email as username
//       email: user.email,
//       phoneNumber: '', // Placeholder, as phone number is not provided by Google Auth
//       role: 'user', // Assuming a default role; you might want to handle roles differently
//       firebaseUid: user.uid,
//       fullName: user.displayName,
//       bio: '', // Placeholder, as bio is not provided by Google Auth
//       skills: [], // Placeholder, as skills are not provided by Google Auth
//       education: [], // Placeholder, as education is not provided by Google Auth
//       experience: [], // Placeholder, as experience is not provided by Google Auth
//       calendlyLink: '', // Placeholder, as this is not provided by Google Auth
//     };

//     try {
//       const token = await user.getIdToken(); // Get the token from the Firebase user
//       const response = await fetch('/api/users/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImFlYzU4NjcwNGNhOTZiZDcwMzZiMmYwZDI4MGY5NDlmM2E5NzZkMzgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVjcnVpdG1lbnRidWRkeS1lZDRmMCIsImF1ZCI6InJlY3J1aXRtZW50YnVkZHktZWQ0ZjAiLCJhdXRoX3RpbWUiOjE3MDgwNDA4NTUsInVzZXJfaWQiOiJuYlhCdTF1MnVaWWhRWXZVSWNEeElKVklaeDkyIiwic3ViIjoibmJYQnUxdTJ1WlloUVl2VUljRHhJSlZJWng5MiIsImlhdCI6MTcwODA0MDg1NSwiZXhwIjoxNzA4MDQ0NDU1LCJlbWFpbCI6InJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.bnILNMSYhi7y6PWnDzzQP3Z-8tsPCdejZcuC3Xcr7XSpzJ0q1E44Si5ydksXk6fMIHPxBaPToq7rCSgsJE_Wt-0xxhYbVdO54KU_y13be8IScCe3ENE75hEjZti3tknc9gBtkkz6ILqwRGDxFhUOhibm_4BYnphNHeF-aiA-KD_Q6TP85u9mPnwmrI2dXl9T6cpSrs0NHaAq2ovqUUKsQNjdb8JbXoGMu9842hQw56WhcBDabr8FUolbtX5L_s5WpgH3XjnH_8mlL8MHpHLJVO00NGJ4t3CDcBXqXOyDwMcTC3erkAi69m_ggY00eZ7CS0xVLIfgQowjsnZDsNoO5Q` // Include the token in the Authorization header
//         },
//         body: JSON.stringify(userDataForMongoDB),
//       });
//       if (!response.ok) {
//         const responseText = await response.text();
//         throw new Error(responseText || 'Failed to save user to database');
//       }
//       console.log('User saved to database:', await response.json());
//     } catch (error) {
//       console.error('Error saving user to database:', error);
//     }
//   };

//   return (
//     <div className="signIn-container">
//       <h1>Sign In with Google</h1>
//       <button onClick={signInWithGoogle}>Sign In with Google</button>
//     </div>
//   );
// };

// export default SignIn;



// import React from 'react';
// import { Button, Typography } from '@mui/material';
// import { auth } from '../firebase'; // Adjust the path as needed
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// const SignIn = () => {
//   const signInWithGoogle = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       // User is signed in or signed up!
      
//       // Now, save the new user info to the database
//       saveUserToDatabase(result.user);
//     } catch (error) {
//       console.error('Google Sign-In error:', error.message);
//     }
//   };

//   const saveUserToDatabase = async (user) => {
//     // Construct the user data for MongoDB
//     const userDataForMongoDB = {
//       username: user.email, // Assuming you're using email as username
//       email: user.email,
//       phoneNumber: '', // Placeholder, as phone number is not provided by Google Auth
//       role: 'user', // Assuming a default role; you might want to handle roles differently
//       firebaseUid: user.uid,
//       fullName: user.displayName,
//       bio: '', // Placeholder, as bio is not provided by Google Auth
//       skills: [], // Placeholder, as skills are not provided by Google Auth
//       education: [], // Placeholder, as education is not provided by Google Auth
//       experience: [], // Placeholder, as experience is not provided by Google Auth
//       calendlyLink: '', // Placeholder, as this is not provided by Google Auth
//     };

//     try {
//       const token = await user.getIdToken(); // Get the token from the Firebase user
//       const response = await fetch('/api/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer token` // Include the token in the Authorization header
//         },
//         body: JSON.stringify(userDataForMongoDB),
//       });
//       if (!response.ok) {
//         const responseText = await response.text();
//         throw new Error(responseText || 'Failed to save user to database');
//       }
//       console.log('User saved to database:', await response.json());
//     } catch (error) {
//       console.error('Error saving user to database:', error);
//     }
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Sign In with Google
//       </Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={signInWithGoogle}
//         style={{ marginTop: '16px' }}
//       >
//         Sign In with Google
//       </Button>
//     </div>
//   );
// };

// export default SignIn;









// THIS WORKS 


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // For redirecting to the homepage
// import { Typography, TextField, Button, Container } from '@mui/material';
// import { auth, signIn, app } from '../firebase'; // Adjust the path as needed
// import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

// const SignIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate(); // Hook for redirecting

//   const handleSignInWithEmail = async (e) => {
//     e.preventDefault(); // Prevent form submission redirect
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate('/'); // Redirect to homepage
//     } catch (error) {
//       alert('Error signing in with email and password: ' + error.message);
//     }
//   };

//   // const signInWithGoogle = async () => {
//   //   try {
//   //     const provider = new GoogleAuthProvider();
//   //     await signInWithPopup(auth, provider);
//   //     navigate('/'); // Redirect to homepage
//   //   } catch (error) {
//   //     console.error('Google Sign-In error:', error.message);
//   //     alert('Google Sign-In error: ' + error.message);
//   //   }
//   // };

//   const signInWithGoogle = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       // Assuming getIdToken is a function to get the Firebase user token
//       const token = await result.user.getIdToken();
//       saveUserToDatabase(result.user, token); // Pass the user and token to saveUserToDatabase
//     } catch (error) {
//       console.error('Google Sign-In error:', error.message);
//       alert('Google Sign-In error: ' + error.message);
//     }
//   };
  
//   const saveUserToDatabase = async (user, token) => {
//     const userDataForMongoDB = {
//       username: user.email.split('@')[0], // Derive username from email, ensuring it's unique per user.
//       email: user.email,
//       phoneNumber: '', // This will be an empty string until the user provides a valid number.
//       role: 'mentee', // Default role; adjust as necessary. Could be 'mentor' based on your application logic.
//       firebaseUid: user.uid,
//       fullName: user.displayName || '', // In case the display name is not provided, fall back to an empty string.
//       bio: '', // Users can fill in their bio later in the profile settings.
//       skills: [], // This is a placeholder; the user will add skills later.
//       education: [], // This is a placeholder; the user will add education details later.
//       experience: [], // This is a placeholder; the user will add experience details later.
//       calendlyLink: '', // This will be an empty string until the user provides a link.
//     };
    
  
//     try {
//       // First, check if the user already exists in your database
//       const existingUserResponse = await fetch(`/api/users/firebaseUid/${user.uid}`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`, // Include the Firebase token
//         },
//       });
  
//       if (existingUserResponse.ok) {
//         // If the user exists, update their record
//         const existingUser = await existingUserResponse.json();
//         await fetch(`/api/users/${existingUser._id}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//           body: JSON.stringify(userDataForMongoDB),
//         });
//       } else {
//         // If the user does not exist, create a new record
//         await fetch('/api/users', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//           body: JSON.stringify(userDataForMongoDB),
//         });
//       }
//     } catch (error) {
//       console.error('Error saving user to database:', error);
//     }
//   };
  

//   return (
//     <Container maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
//       <Typography variant="h5" component="h1" gutterBottom>
//         Sign In
//       </Typography>
//       <form onSubmit={handleSignInWithEmail} style={{ width: '100%', marginTop: 1 }}>
//         <TextField
//           variant="outlined"
//           margin="normal"
//           required
//           fullWidth
//           label="Email Address"
//           name="email"
//           autoComplete="email"
//           autoFocus
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <TextField
//           variant="outlined"
//           margin="normal"
//           required
//           fullWidth
//           name="password"
//           label="Password"
//           type="password"
//           autoComplete="current-password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           color="primary"
//           style={{ margin: '24px 0px 16px' }}
//         >
//           Sign In
//         </Button>
//       </form>
//       <Button
//         variant="contained"
//         color="secondary"
//         onClick={signInWithGoogle}
//         style={{ margin: '8px 0px' }}
//       >
//         Sign In with Google
//       </Button>
//     </Container>
//   );
// };

// export default SignIn;







//THIS WORKS 2

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // For redirecting to the homepage
// import { Typography, TextField, Button, Container } from '@mui/material';
// import { auth } from '../firebase'; // Adjust the path as needed
// import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

// const SignIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate(); // Hook for redirecting

//   const handleSignInWithEmail = async (e) => {
//     e.preventDefault(); // Prevent form submission redirect
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate('/'); // Redirect to homepage
//     } catch (error) {
//       alert('Error signing in with email and password: ' + error.message);
//     }
//   };

//   const signInWithGoogle = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       const token = await result.user.getIdToken();
//       await saveUserToDatabase(result.user, token);
//       navigate('/'); // Redirect to homepage after the user is saved
//     } catch (error) {
//       console.error('Google Sign-In error:', error.message);
//       alert('Google Sign-In error: ' + error.message);
//     }
//   };
  
//   const saveUserToDatabase = async (user, token) => {
//     const userDataForMongoDB = {
//       username: user.email.split('@')[0],
//       email: user.email,
//       phoneNumber: '',
//       role: 'mentee',
//       firebaseUid: user.uid,
//       fullName: user.displayName || '',
//       bio: '',
//       skills: [],
//       education: [],
//       experience: [],
//       calendlyLink: '',
//     };
    
//     try {
//       const existingUserResponse = await fetch(`/api/users/firebaseUid/${user.uid}`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
      
//       if (existingUserResponse.ok) {
//         const existingUser = await existingUserResponse.json();
//         await fetch(`/api/users/${existingUser._id}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//           body: JSON.stringify(userDataForMongoDB),
//         });
//       } else {
//         await fetch('/api/users', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//           body: JSON.stringify(userDataForMongoDB),
//         });
//       }
//     } catch (error) {
//       console.error('Error saving user to database:', error);
//     }
//   };

//   return (
//     <Container maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
//       <Typography variant="h5" component="h1" gutterBottom>
//         Sign In
//       </Typography>
//       <form onSubmit={handleSignInWithEmail} style={{ width: '100%', marginTop: 1 }}>
//         <TextField
//           variant="outlined"
//           margin="normal"
//           required
//           fullWidth
//           label="Email Address"
//           name="email"
//           autoComplete="email"
//           autoFocus
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <TextField
//           variant="outlined"
//           margin="normal"
//           required
//           fullWidth
//           name="password"
//           label="Password"
//           type="password"
//           autoComplete="current-password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           color="primary"
//           style={{ margin: '24px 0px 16px' }}
//         >
//           Sign In
//         </Button>
//       </form>
//       <Button
//         variant="contained"
//         color="secondary"
//         onClick={signInWithGoogle}
//         style={{ margin: '8px 0px' }}
//       >
//         Sign In with Google
//       </Button>
//     </Container>
//   );
// };

// export default SignIn;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirecting to the homepage
import { Typography, TextField, Button, Container } from '@mui/material';
import { auth } from '../firebase'; // Adjust the path as needed
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for redirecting

  const handleSignInWithEmail = async (e) => {
    e.preventDefault(); // Prevent form submission redirect
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirect to homepage
    } catch (error) {
      alert('Error signing in with email and password: ' + error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      
      // Save the user to the database after successful Google sign-in
      await saveUserToDatabase(result.user, token);
      
      navigate('/'); // Redirect to homepage after the user is signed in
    } catch (error) {
      console.error('Google Sign-In error:', error);
      alert('Google Sign-In error: ' + error.message);
    }
  };
  
  const saveUserToDatabase = async (user, token) => {
    const userDataForMongoDB = {
      username: user.email.split('@')[0],
      email: user.email,
      phoneNumber: '',
      role: 'mentee',
      firebaseUid: user.uid,
      fullName: user.displayName || '',
      bio: '',
      skills: [],
      education: [],
      experience: [],
      calendlyLink: '',
    };
    
    try {
      const existingUserResponse = await fetch(`/api/users/firebaseUid/${user.uid}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (existingUserResponse.ok) {
        const existingUser = await existingUserResponse.json();
        await fetch(`/api/users/${existingUser._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(userDataForMongoDB),
        });
      } else {
        await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(userDataForMongoDB),
        });
      }
    } catch (error) {
      console.error('Error saving user to database:', error);
    }
  };

  return (
    <Container maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Sign In
      </Typography>
      <form onSubmit={handleSignInWithEmail} style={{ width: '100%', marginTop: 1 }}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ margin: '24px 0px 16px' }}
        >
          Sign In
        </Button>
      </form>
      <Button
        variant="contained"
        color="secondary"
        onClick={signInWithGoogle}
        style={{ margin: '8px 0px' }}
      >
        Sign In with Google
      </Button>
    </Container>
  );
};

export default SignIn;