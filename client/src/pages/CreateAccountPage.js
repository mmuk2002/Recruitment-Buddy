// import './CreateAccountPage.css';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth } from '../firebase'; // Make sure this path matches the location of your firebase.js file
// import { createUserWithEmailAndPassword } from 'firebase/auth';

// const CreateAccountPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     role: '',
//     bio: '',
//     skills: '',
//     major: '',
//     graduationYear: '',
//     experience: '',
//     password: '',
//   });

//   // State for holding the error message, correctly initialized
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { email, password } = formData;

//     // Reset error message at each submission attempt
//     setErrorMessage('');

//     // Check if the email is from the Vanderbilt domain
//     if (!email.endsWith('@vanderbilt.edu')) {
//       setErrorMessage('Invalid email. Please use a @vanderbilt.edu email');
//       return; // Prevents form submission if the validation fails
//     }

//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       navigate('/'); // Redirects the user to the homepage after successful account creation
//     } catch (error) {
//       console.error('Error during account creation with Firebase:', error.message);
//       setErrorMessage(error.message); // Sets Firebase error message
//     }
//   };

//   return (
//     <div className="create-account-container">
//       <h1>Create an Account</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="fullName" placeholder="Full Name (required)" value={formData.fullName} onChange={handleChange} required />
//         <input type="email" name="email" placeholder="Email (required)" value={formData.email} onChange={handleChange} required />
//         <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
//         <select name="role" value={formData.role} onChange={handleChange} required>
//           <option value="" disabled>Select a role</option>
//           <option value="mentor">Mentor</option>
//           <option value="mentee">Mentee</option>
//         </select>
//         <textarea name="bio" placeholder="Bio" value={formData.bio} onChange={handleChange}></textarea>
//         <input type="text" name="skills" placeholder="Skills (required)" value={formData.skills} onChange={handleChange} required />
//         <input type="text" name="major" placeholder="Major (required)" value={formData.major} onChange={handleChange} required />
//         <input type="text" name="graduationYear" placeholder="Graduation Year (required)" value={formData.graduationYear} onChange={handleChange} required />
//         <textarea name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange}></textarea>
//         <input type="password" name="password" placeholder="Password (8-12 characters) (required)" value={formData.password} onChange={handleChange} required minLength="8" maxLength="12" />
        
//         {/* Display the error message if present */}
//         {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        
//         <button type="submit">Create Account</button>
//       </form>
//     </div>
//   );
// };

// export default CreateAccountPage;


import './CreateAccountPage.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Adjust the import path as needed
import { createUserWithEmailAndPassword } from 'firebase/auth';

const CreateAccountPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    bio: '',
    skills: '',
    major: '',
    graduationYear: '',
    experience: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, fullName, phone, role, bio, skills, major, graduationYear, experience } = formData;

    if (!email.endsWith('@vanderbilt.edu')) {
      setErrorMessage('Invalid email. Please use a @vanderbilt.edu email');
      return;
    }
    console.log('entered handleSubmit');
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Get the Firebase ID token
      const token = await firebaseUser.getIdToken();
      // Prepare user data for MongoDB
      console.log('firebase authentication worked')
      const userDataForMongoDB = {
        username: firebaseUser.email, // Assuming you're using email as username
        email,
        phoneNumber: phone,
        role,
        firebaseUid: firebaseUser.uid,
        fullName,
        bio,
        skills: skills.split(',').map(skill => skill.trim()),
        education: [{
          institution: '',
          degree: '',
          fieldOfStudy: major,
          startDate: new Date(),
          endDate: new Date()
        }],
        experience: [{
          title: experience, // You might need to adjust the structure based on the actual form data
          company: '',
          location: '',
          startDate: new Date(),
          endDate: new Date(),
          description: '' // Added this field
        }],
        calendlyLink: '' // Assuming you have this field in your form
      };
      // We might need to remove required fields for testing purposes
      // Send user data to your backend for MongoDB storage
      const response = await fetch('/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDataForMongoDB),
      });

    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     throw new Error(errorData.message || 'Failed to save user data to MongoDB');
    //   }
    console.log(response);
    if (response.ok) {
        const userData = await response.json();
        // Handle userData
      } else {
        // If the response is not OK, don't assume it's JSON. Check before parsing.
        const text = await response.text();
        if (text) {
          const errorData = JSON.parse(text);
          setErrorMessage(errorData.message);
        } else {
          setErrorMessage('An error occurred, but no error message was returned from the server.');
        }
      }

      navigate('/');
    } catch (error) {
      console.error('Error during account creation:', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="create-account-container">
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit}>
        {/* Form inputs */}
        <input type="text" name="fullName" placeholder="Full Name (required)" value={formData.fullName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email (required)" value={formData.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="" disabled>Select a role</option>
          <option value="mentor">Mentor</option>
          <option value="mentee">Mentee</option>
        </select>
        <textarea name="bio" placeholder="Bio" value={formData.bio} onChange={handleChange}></textarea>
        <input type="text" name="skills" placeholder="Skills (required)" value={formData.skills} onChange={handleChange} required />
        <input type="text" name="major" placeholder="Major (required)" value={formData.major} onChange={handleChange} required />
        <input type="text" name="graduationYear" placeholder="Graduation Year (required)" value={formData.graduationYear} onChange={handleChange} required />
        <textarea name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange}></textarea>
        <input type="password" name="password" placeholder="Password (8-12 characters) (required)" value={formData.password} onChange={handleChange} required minLength="8" maxLength="12" />
        
        {/* Error message display */}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccountPage;



