// client/src/pages/ProfilePage.js

// import React from 'react';

// const ProfilePage = () => {
//   return <div>Profile Page</div>;
// };

// export default ProfilePage;




// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { TextField, Button, Container } from '@mui/material';
// import { auth } from '../firebase';
// import { onAuthStateChanged } from 'firebase/auth';

// const ProfilePage = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [user, setUser] = useState(null); // Define the user state here
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser); // Update the user state
//         currentUser.getIdToken().then((token) => {
//           // Fetch the user's data here using the token
//           fetch(`/api/users/details`, {
//             headers: {
//               'Authorization': `Bearer ${token}`,
//             },
//           })
//           .then(response => {
//             if (!response.ok) {
//               throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             return response.json();
//           })
//           .then(data => {
//             setPhoneNumber(data.phoneNumber || '');
//           })
//           .catch(error => {
//             console.error('Failed to fetch user details:', error);
//           });
//         });
//       } else {
//         // User is signed out
//         navigate('/sign-in');
//       }
//     });

//     // Clean up the observer when the component unmounts
//     return () => unsubscribe();
//   }, [navigate]);

//   const handlePhoneNumberChange = async (e) => {
//     e.preventDefault();
    
//     if (!user) {
//       alert('No user is signed in.');
//       return;
//     }

//     try {
//       const token = await auth.currentUser.getIdToken();
//       // Send the updated phone number to the backend
//       const response = await fetch(`/api/users/update-phone`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({ phoneNumber }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update the phone number.');
//       }

//       alert('Phone number updated successfully!');
//     } catch (error) {
//       console.error('Error updating phone number:', error);
//       alert('Error updating phone number: ' + error.message);
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <h1>Profile Page</h1>
//       <form onSubmit={handlePhoneNumberChange}>
//         <TextField
//           variant="outlined"
//           margin="normal"
//           required
//           fullWidth
//           id="phoneNumber"
//           label="Phone Number"
//           name="phoneNumber"
//           autoComplete="tel"
//           autoFocus
//           value={phoneNumber}
//           onChange={(e) => setPhoneNumber(e.target.value)}
//         />
//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           color="primary"
//         >
//           Update Phone Number
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default ProfilePage;




// import React, { useEffect, useState } from "react";
// import {
//   Avatar,
//   Paper,
//   Grid,
//   Box,
//   Container,
//   Button,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import Typography from '@mui/material/Typography';

// import { Input } from "@mui/base/Input";
// import { Routes, Route, useNavigate } from "react-router-dom";
// import { getUserInfo, updateUserInfo } from "../api/profile";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import { MuiTelInput } from "mui-tel-input";
// import Snackbar from "@mui/material/Snackbar";
// import { Alert } from "@mui/material";
// import { IconButton } from "@mui/material";
// import { Close } from "@mui/icons-material";
// import { auth } from "../firebase";

// const Profile = () => {
//   const [values, setValues] = useState({
//     fullName: "",
//     phoneNumber: "",
//     role: "",
//     bio: "",
//     skills: "",
//     education: "",
//     experience: "",
//     calendlyLink: "",
//   });

//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [profileData, setProfileData] = useState("");
//   const [originalData, setOriginalData] = useState("");
//   const [addNewExperience, setAddNewExperience] = useState(false);
//   const [newExperienceValues, setNewExperienceValues] = useState({
//     title: "",
//     company: "",
//     location: "",
//     description: "",
//     startDate: "",
//     endDate: "",
//   });
//   const [addNewExperienceError, setAddExperienceError] = useState(false);

//   const [disabled, setDisabled] = useState(true);

//   const navigate = useNavigate();

//   // const firebaseUid = auth.currentUser.uid;
  
//   const retrieveUserProfileData = async () => {
//     try {
//       const response = await getUserInfo("65cea289942e4bcd4f4f9d9d");

//       setProfileData(response.data);
//       setOriginalData(response.data);
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setAddExperienceError(false);
//   };

//   const action = (
//     <React.Fragment>
//       <Button color="secondary" size="small" onClick={handleClose}>
//         UNDO
//       </Button>
//       <IconButton
//         size="small"
//         aria-label="close"
//         color="inherit"
//         onClick={handleClose}
//       >
//         <Close fontSize="small" />
//       </IconButton>
//     </React.Fragment>
//   );

//   useEffect(() => {
//     retrieveUserProfileData();
//   }, []);

//   useEffect(() => {
//     if (
//       profileData !== null &&
//       profileData !== undefined &&
//       profileData !== ""
//     ) {
//       let profileDataCopy = Object.assign({}, profileData);

//       const profileValues = {
//         fullName: profileDataCopy["fullName"],
//         role: profileDataCopy["role"],
//         bio: profileDataCopy["bio"],
//         skills:
//           profileDataCopy["skills"] !== null &&
//           profileDataCopy["skills"] !== undefined &&
//           profileDataCopy["skills"].length !== 0
//             ? profileDataCopy["skills"].join(", ")
//             : "",
//         education:
//           profileDataCopy["education"] !== null &&
//           profileDataCopy["education"] !== undefined &&
//           profileDataCopy["education"].length !== 0
//             ? profileDataCopy["education"][0]
//             : "",
//         experience: profileDataCopy["experience"],
//         calendlyLink: profileDataCopy["calendlyLink"],
//       };
//       setPhoneNumber("+1" + profileDataCopy["phoneNumber"]);
//       setValues(profileValues);
//     }
//   }, [profileData]);

//   const updateProfileValue = (fieldName, fieldValue) => {
//     let currentValues = Object.assign({}, values);
//     currentValues[fieldName] = fieldValue;
//     setValues(currentValues);
//   };

//   const resetProfileValues = () => {
//     window.location.reload();
//   };

//   const addNewExperienceRecord = () => {
//     var errors = false;

//     if (
//       newExperienceValues.title === "" ||
//       newExperienceValues.company === "" ||
//       newExperienceValues.location === "" ||
//       newExperienceValues.description === "" ||
//       newExperienceValues.startDate === "" ||
//       newExperienceValues.endDate === ""
//     ) {
//       setAddExperienceError(true);
//       errors = true;
//     }

//     if (errors === false) {
//       let curValues = Object.assign({}, values);
//       curValues.experience.push(newExperienceValues);
//       setValues(curValues);
//       setAddNewExperience(false);
//       setNewExperienceValues({});
//     }
//   };

//   const submitUpdates = async () => {
//     try {
//       let updatedValues = Object.assign({}, values);

//       let numbersOnlyPhone = phoneNumber.replace(/\D/g, "");

//       updatedValues.phoneNumber = numbersOnlyPhone.substring(1);

//       // Use updated values as the payload for the request to the backend.
//       // Make the call to the backend here.
//       await updateUserInfo("65cea289942e4bcd4f4f9d9d", updatedValues);
//       setDisabled(true);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         padding: "20px",
//       }}
//     >
//       <Paper
//         sx={{
//           marginTop: 2,
//           display: "flex",
//           justifyContent: "center",
//           padding: 2,
//         }}
//         className="profile-page"
//       >
//         <Grid container justifyContent={"center"}>
//           <Grid
//             item
//             xs={5}
//             md={10}
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Avatar
//               alt={`Edit profile`}
//               sx={{
//                 width: 100,
//                 height: 100,
//                 backgroundColor: "#1769aa",
//                 marginBottom: "10px",
//               }}
//             />
//             <Typography
//               variant="h5"
//               align="center"
//               sx={{ color: "#063257", marginBottom: "10px" }}
//             >
//               Profile
//             </Typography>
//             <Grid
//               container
//               spacing={1}
//               rowSpacing={2}
//               justifyContent="center"
//               sx={{ paddingLeft: "0px" }}
//             >
//               <Grid item xs={12} sx={{ paddingLeft: "0px" }}>
//                 <Box display="flex" justifyContent={"flex-start"}>
//                   <Typography
//                     variant="h6"
//                     align="center"
//                     sx={{ color: "#063257", marginBottom: "5px" }}
//                   >
//                     User Information:
//                   </Typography>
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={6} sx={{ paddingLeft: "0px" }}>
//                 <TextField
//                   label="Username"
//                   disabled={true}
//                   value={profileData.username}
//                   onChange={(e) => updateProfileValue("", e.target.value)}
//                   type="text"
//                   size="small"
//                   varient="outlined"
//                   defaultValue=""
//                   InputLabelProps={{shrink: true}}
//                   fullWidth={true}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label={"Email"}
//                   disabled={true}
//                   value={profileData.email}
//                   onChange={(e) => updateProfileValue("", e.target.value)}
//                   type="text"
//                   size="small"
//                   varient="outlined"
//                   defaultValue=""
//                   InputLabelProps={{shrink: true}}
//                   fullWidth={true}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label={"Calendly Link"}
//                   fullWidth={true}
//                   shrink={true}
//                   disabled={disabled}
//                   value={values.calendlyLink}
//                   onChange={(e) =>
//                     updateProfileValue("calendlyLink", e.target.value)
//                   }
//                   type="text"
//                   size="small"
//                   varient="outlined"
//                   defaultValue=""
//                 />
//               </Grid>
//               <Grid item xs={12} md={6} sx={{ paddingLeft: "0px" }}>
//                 <TextField
//                   disabled={disabled}
//                   value={values.fullName}
//                   onChange={(e) =>
//                     updateProfileValue("fullName", e.target.value)
//                   }
//                   type="text"
//                   size="small"
//                   varient="outlined"
//                   defaultValue=""
//                   label="Full Name"
//                   fullWidth={true}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <MuiTelInput
//                   label="Phone Number"
//                   shrink={true}
//                   fullWidth={true}
//                   size="small"
//                   disabled={disabled}
//                   value={phoneNumber}
//                   onChange={(e) => {
//                     setPhoneNumber(e);
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sx={{ paddingLeft: "0px" }}>
//                 <FormControl fullWidth>
//                   <InputLabel shrink={true}>Role</InputLabel>
//                   <Select
//                     labelId="demo-select-small-label"
//                     id="demo-select-small"
//                     label="Role"
//                     shrink={true}
//                     variant="outlined"
//                     disabled={disabled}
//                     value={values.role}
//                     size="small"
//                     fullWidth={true}
//                     onChange={(e) => updateProfileValue("role", e.target.value)}
//                   >
//                     <MenuItem value="mentor">Mentor</MenuItem>
//                     <MenuItem value="mentee">Mentee</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   disabled={disabled}
//                   fullWidth={true}
//                   label="Bio"
//                   shrink={true}
//                   type="text"
//                   id="outlined-multiline-static"
//                   multiline
//                   rows={4}
//                   varient="outlined"
//                   defaultValue=""
//                   value={values.bio}
//                   onChange={(e) => updateProfileValue("bio", e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   disabled={disabled}
//                   label={"Skills"}
//                   fullWidth={true}
//                   shrink={true}
//                   type="text"
//                   id="outlined-multiline-static"
//                   multiline
//                   rows={4}
//                   varient="outlined"
//                   defaultValue=""
//                   value={values.skills}
//                   onChange={(e) => updateProfileValue("skills", e.target.value)}
//                 />
//               </Grid>
//               {values.education !== "" &&
//               values.education !== null &&
//               values.education !== undefined ? (
//                 <Grid
//                   container
//                   spacing={1}
//                   rowSpacing={2}
//                   justifyContent="center"
//                 >
//                   <Grid item xs={12}>
//                     <Box display="flex" justifyContent={"flex-start"}>
//                       <Typography
//                         variant="h6"
//                         align="center"
//                         sx={{
//                           color: "#063257",
//                           marginBottom: "5px",
//                           marginTop: "10px",
//                         }}
//                       >
//                         Education:
//                       </Typography>
//                     </Box>
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       shrink={true}
//                       fullWidth={true}
//                       label="Institution"
//                       disabled={disabled}
//                       value={values.education.institution}
//                       onChange={(e) => {
//                         let curValues = Object.assign({}, values);
//                         curValues.education.institution = e.target.value;
//                         setValues(curValues);
//                       }}
//                       type="text"
//                       size="small"
//                       varient="outlined"
//                       defaultValue=""
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       shrink={true}
//                       fullWidth={true}
//                       label="Major"
//                       disabled={disabled}
//                       value={values.education.fieldOfStudy}
//                       onChange={(e) => {
//                         let curValues = Object.assign({}, values);
//                         curValues.education.fieldOfStudy = e.target.value;
//                         setValues(curValues);
//                       }}
//                       type="text"
//                       size="small"
//                       varient="outlined"
//                       defaultValue=""
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       shrink={true}
//                       fullWidth={true}
//                       label="Degree"
//                       disabled={disabled}
//                       value={values.education.degree}
//                       onChange={(e) => {
//                         let curValues = Object.assign({}, values);
//                         curValues.education.degree = e.target.value;
//                         setValues(curValues);
//                       }}
//                       type="text"
//                       size="small"
//                       varient="outlined"
//                       defaultValue=""
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <LocalizationProvider dateAdapter={AdapterDayjs}>
//                       <DatePicker
//                         label="Start Date"
//                         shrink={true}
//                         fullWidth={true}
//                         size="small"
//                         disabled={disabled}
//                         value={dayjs(values.education.startDate)}
//                         onChange={(e) => {
//                           let curValues = Object.assign({}, values);
//                           curValues.education.startDate = e;
//                           setValues(curValues);
//                         }}
//                         slotProps={{
//                           textField: { fullWidth: true, size: "small" },
//                         }}
//                       />
//                     </LocalizationProvider>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <LocalizationProvider dateAdapter={AdapterDayjs}>
//                       <DatePicker
//                         label="End Date"
//                         shrink={true}
//                         fullWidth={true}
//                         size="small"
//                         disabled={disabled}
//                         value={dayjs(values.education.endDate)}
//                         onChange={(e) => {
//                           let curValues = Object.assign({}, values);
//                           curValues.education.endDate = e;
//                           setValues(curValues);
//                         }}
//                         slotProps={{
//                           textField: { fullWidth: true, size: "small" },
//                         }}
//                       />
//                     </LocalizationProvider>
//                   </Grid>
//                 </Grid>
//               ) : null}
//               <Grid
//                 container
//                 spacing={1}
//                 rowSpacing={2}
//                 justifyContent={"center"}
//               >
//                 <Grid item xs={12}>
//                   <Box display="flex" justifyContent={"flex-start"}>
//                     <Typography
//                       variant="h6"
//                       align="center"
//                       sx={{
//                         color: "#063257",
//                         marginBottom: "5px",
//                         marginTop: "10px",
//                       }}
//                     >
//                       Experience:
//                     </Typography>
//                   </Box>
//                 </Grid>
//               </Grid>

//               {values.experience !== null &&
//               values.experience !== undefined &&
//               values.experience !== "" &&
//               values.experience.length !== 0 ? (
//                 <Grid
//                   container
//                   spacing={1}
//                   rowSpacing={2}
//                   justifyContent="center"
//                 >
//                   {values.experience.map((record, idx) => {
//                     return (
//                       <React.Fragment>
//                         <Grid item xs={12} key={idx + "recordLabel"}>
//                           <Box display="flex" justifyContent={"flex-start"}>
//                             <Typography
//                               variant="h7"
//                               align="center"
//                               sx={{
//                                 color: "#063257",
//                                 marginBottom: "5px",
//                                 marginTop: "10px",
//                               }}
//                             >
//                               #{idx + 1}
//                             </Typography>
//                           </Box>
//                         </Grid>
//                         <Grid item xs={12} md={6} key={idx + "title"}>
//                           <TextField
//                             shrink={true}
//                             fullWidth={true}
//                             label="Title"
//                             disabled={disabled}
//                             value={record.title}
//                             onChange={(e) => {
//                               let curValues = Object.assign({}, values);
//                               curValues.experience[idx].title = e.target.value;
//                               setValues(curValues);
//                             }}
//                             type="text"
//                             size="small"
//                             varient="outlined"
//                             defaultValue=""
//                           />
//                         </Grid>
//                         <Grid item xs={12} md={6} key={idx + "company"}>
//                           <TextField
//                             shrink={true}
//                             fullWidth={true}
//                             label="Company"
//                             disabled={disabled}
//                             value={record.company}
//                             onChange={(e) => {
//                               let curValues = Object.assign({}, values);
//                               curValues.experience[idx].company =
//                                 e.target.value;
//                               setValues(curValues);
//                             }}
//                             type="text"
//                             size="small"
//                             varient="outlined"
//                             defaultValue=""
//                           />
//                         </Grid>
//                         <Grid item xs={12} key={idx + "location"}>
//                           <TextField
//                             shrink={true}
//                             fullWidth={true}
//                             label="Location"
//                             disabled={disabled}
//                             value={record.location}
//                             onChange={(e) => {
//                               let curValues = Object.assign({}, values);
//                               curValues.experience[idx].location =
//                                 e.target.value;
//                               setValues(curValues);
//                             }}
//                             type="text"
//                             size="small"
//                             varient="outlined"
//                             defaultValue=""
//                           />
//                         </Grid>
//                         <Grid item xs={12} key={idx + "description"}>
//                           <TextField
//                             disabled={disabled}
//                             fullWidth={true}
//                             label="Description"
//                             shrink={true}
//                             type="text"
//                             id="outlined-multiline-static"
//                             multiline
//                             rows={4}
//                             varient="outlined"
//                             defaultValue=""
//                             value={record.description}
//                             onChange={(e) => {
//                               let curValues = Object.assign({}, values);
//                               curValues.experience[idx].description =
//                                 e.target.value;
//                               setValues(curValues);
//                             }}
//                           />
//                         </Grid>
//                         <Grid item xs={12} md={6} key={idx + "startDate"}>
//                           <LocalizationProvider dateAdapter={AdapterDayjs}>
//                             <DatePicker
//                               label="Start Date"
//                               shrink={true}
//                               fullWidth={true}
//                               size="small"
//                               disabled={disabled}
//                               value={dayjs(record.startDate)}
//                               onChange={(e) => {
//                                 let curValues = Object.assign({}, values);
//                                 curValues.experience[idx].startDate = e;
//                                 setValues(curValues);
//                               }}
//                               slotProps={{
//                                 textField: { fullWidth: true, size: "small" },
//                               }}
//                             />
//                           </LocalizationProvider>
//                         </Grid>
//                         <Grid item xs={12} md={6} key={idx + "endDate"}>
//                           <LocalizationProvider dateAdapter={AdapterDayjs}>
//                             <DatePicker
//                               label="End Date"
//                               shrink={true}
//                               fullWidth={true}
//                               size="small"
//                               disabled={disabled}
//                               value={dayjs(record.endDate)}
//                               onChange={(e) => {
//                                 let curValues = Object.assign({}, values);
//                                 curValues.experience[idx].endDate = e;
//                                 setValues(curValues);
//                               }}
//                               slotProps={{
//                                 textField: { fullWidth: true, size: "small" },
//                               }}
//                             />
//                           </LocalizationProvider>
//                         </Grid>
//                         {disabled === false && (
//                           <Grid item xs={12} key={idx + "deleteButton"}>
//                             <Button
//                               variant="contained"
//                               sx={{
//                                 backgroundColor: "#1769aa",
//                                 color: "#ffffff",
//                                 marginTop: "10px",
//                                 "&:hover": {
//                                   boxShadow: "none",
//                                 },
//                               }}
//                               onClick={() => {
//                                 let curValues = Object.assign({}, values);
//                                 curValues.experience.splice(idx, 1);
//                                 setValues(curValues);
//                               }}
//                             >
//                               Remove this experience
//                             </Button>
//                           </Grid>
//                         )}
//                       </React.Fragment>
//                     );
//                   })}
//                 </Grid>
//               ) : (
//                 <Grid item xs={12} md={6}>
//                   <Box display="flex" justifyContent={"flex-start"}>
//                     <Typography
//                       variant="h7"
//                       align="center"
//                       sx={{
//                         color: "#063257",
//                         marginBottom: "5px",
//                         marginTop: "10px",
//                       }}
//                     >
//                       There is no experience to display.
//                     </Typography>
//                   </Box>
//                 </Grid>
//               )}
//               {disabled === false && addNewExperience === false && (
//                 <Grid item xs={12} key={"addExperienceButton"}>
//                   <Button
//                     variant="contained"
//                     sx={{
//                       backgroundColor: "#1769aa",
//                       color: "#ffffff",
//                       marginTop: "10px",
//                       "&:hover": {
//                         boxShadow: "none",
//                       },
//                     }}
//                     onClick={() => {
//                       setAddNewExperience(true);
//                     }}
//                   >
//                     Add a new experience
//                   </Button>
//                 </Grid>
//               )}
//               {disabled === false && addNewExperience === true && (
//                 <React.Fragment>
//                   <Grid item xs={12} key={"recordLabelNew"}>
//                     <Box display="flex" justifyContent={"flex-start"}>
//                       <Typography
//                         variant="h7"
//                         align="center"
//                         sx={{
//                           color: "#063257",
//                           marginBottom: "5px",
//                           marginTop: "10px",
//                         }}
//                       >
//                         New Experience
//                       </Typography>
//                     </Box>
//                   </Grid>
//                   <Grid item xs={12} md={6} key={"titleNew"}>
//                     <TextField
//                       shrink={true}
//                       fullWidth={true}
//                       label="Title"
//                       disabled={disabled}
//                       value={newExperienceValues.title}
//                       onChange={(e) => {
//                         let curValues = Object.assign({}, newExperienceValues);
//                         curValues.title = e.target.value;
//                         setNewExperienceValues(curValues);
//                       }}
//                       type="text"
//                       size="small"
//                       varient="outlined"
//                       defaultValue=""
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={6} key={"companyNew"}>
//                     <TextField
//                       shrink={true}
//                       fullWidth={true}
//                       label="Company"
//                       disabled={disabled}
//                       value={newExperienceValues.company}
//                       onChange={(e) => {
//                         let curValues = Object.assign({}, newExperienceValues);
//                         curValues.company = e.target.value;
//                         setNewExperienceValues(curValues);
//                       }}
//                       type="text"
//                       size="small"
//                       varient="outlined"
//                       defaultValue=""
//                     />
//                   </Grid>
//                   <Grid item xs={12} key={"locationNew"}>
//                     <TextField
//                       shrink={true}
//                       fullWidth={true}
//                       label="Location"
//                       disabled={disabled}
//                       value={newExperienceValues.location}
//                       onChange={(e) => {
//                         let curValues = Object.assign({}, newExperienceValues);
//                         curValues.location = e.target.value;
//                         setNewExperienceValues(curValues);
//                       }}
//                       type="text"
//                       size="small"
//                       varient="outlined"
//                       defaultValue=""
//                     />
//                   </Grid>
//                   <Grid item xs={12} key={"descriptionNew"}>
//                     <TextField
//                       disabled={disabled}
//                       fullWidth={true}
//                       label="Description"
//                       shrink={true}
//                       type="text"
//                       id="outlined-multiline-static"
//                       multiline
//                       rows={4}
//                       varient="outlined"
//                       defaultValue=""
//                       value={newExperienceValues.description}
//                       onChange={(e) => {
//                         let curValues = Object.assign({}, newExperienceValues);
//                         curValues.description = e.target.value;
//                         setNewExperienceValues(curValues);
//                       }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={6} key={"startDateNew"}>
//                     <LocalizationProvider dateAdapter={AdapterDayjs}>
//                       <DatePicker
//                         label="Start Date"
//                         shrink={true}
//                         fullWidth={true}
//                         size="small"
//                         disabled={disabled}
//                         value={dayjs(newExperienceValues.startDate)}
//                         onChange={(e) => {
//                           let curValues = Object.assign(
//                             {},
//                             newExperienceValues
//                           );
//                           curValues.startDate = e;
//                           setNewExperienceValues(curValues);
//                         }}
//                         slotProps={{
//                           textField: {
//                             fullWidth: true,
//                             size: "small",
//                           },
//                         }}
//                       />
//                     </LocalizationProvider>
//                   </Grid>
//                   <Grid item xs={12} md={6} key={"endDateNew"}>
//                     <LocalizationProvider dateAdapter={AdapterDayjs}>
//                       <DatePicker
//                         label="End Date"
//                         shrink={true}
//                         fullWidth={true}
//                         size="small"
//                         disabled={disabled}
//                         value={dayjs(newExperienceValues.endDate)}
//                         onChange={(e) => {
//                           let curValues = Object.assign(
//                             {},
//                             newExperienceValues
//                           );
//                           curValues.endDate = e;
//                           setNewExperienceValues(curValues);
//                         }}
//                         slotProps={{
//                           textField: {
//                             fullWidth: true,
//                             size: "small",
//                           },
//                         }}
//                       />
//                     </LocalizationProvider>
//                   </Grid>
//                   <Grid item xs={12} key={"confirmAddExperience"}>
//                     <Button
//                       variant="contained"
//                       sx={{
//                         backgroundColor: "#1769aa",
//                         color: "#ffffff",
//                         marginTop: "10px",
//                         "&:hover": {
//                           boxShadow: "none",
//                         },
//                       }}
//                       onClick={() => {
//                         addNewExperienceRecord();
//                       }}
//                     >
//                       Confirm Addition
//                     </Button>
//                   </Grid>
//                 </React.Fragment>
//               )}
//               {disabled === true ? (
//                 <Grid
//                   container
//                   spacing={1}
//                   rowSpacing={2}
//                   justifyContent="center"
//                 >
//                   <Grid item xs={12}>
//                     <Button
//                       sx={{
//                         backgroundColor: "#1769aa",
//                         color: "#ffffff",
//                         marginTop: "45px",
//                         "&:hover": {
//                           color: "#1769aa",
//                           boxShadow: "none",
//                         },
//                       }}
//                       onClick={() => setDisabled(false)}
//                     >
//                       Edit Profile
//                     </Button>
//                   </Grid>
//                 </Grid>
//               ) : (
//                 <Grid
//                   container
//                   spacing={1}
//                   rowSpacing={2}
//                   justifyContent={"center"}
//                 >
//                   <Grid item xs={12}>
//                     <Button
//                       onClick={() => {
//                         resetProfileValues();
//                       }}
//                       sx={{
//                         color: "#1769aa",
//                         marginTop: "45px",
//                         marginRight: "20px",
//                       }}
//                     >
//                       Cancel
//                     </Button>
//                     <Button
//                       variant="contained"
//                       onClick={() => {
//                         submitUpdates();
//                       }}
//                       sx={{ backgroundColor: "#1769aa", marginTop: "45px" }}
//                     >
//                       Save Changes
//                     </Button>
//                   </Grid>
//                 </Grid>
//               )}
//             </Grid>
//           </Grid>
//         </Grid>
//       </Paper>
//       <Snackbar
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//         key={"topright"}
//         open={addNewExperienceError}
//         autoHideDuration={5000}
//         onClose={handleClose}
//         action={action}
//         sx={{ paddingLeft: "3px" }}
//       >
//         <Alert autoHideDuration={5000} onClose={handleClose} severity={"error"}>
//           "Please fill out all fields for the new experience."
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default Profile;















// //src/pages/ProfilePage.js
// import React, { useState, useEffect } from 'react';
// import { Container, TextField, Button, Typography } from '@mui/material';
// import { useAuth } from '../AuthContext'; // make sure this path is correct
// import { auth } from '../firebase'; // make sure this path is correct

// const ProfilePage = () => {
//   const { currentUser } = useAuth(); // useAuth() is a hook we created in AuthContext.js
//   const [userData, setUserData] = useState({
//     phoneNumber: '',
//     // add more fields as necessary
//   });
//   const [loading, setLoading] = useState(true);

//   // Fetch user data when component mounts or when currentUser changes
//   useEffect(() => {
//     if (currentUser) {
//       const fetchUserData = async () => {
//         const token = await currentUser.getIdToken();
//         // Assuming you have an endpoint to get user data by Firebase UID
//         const response = await fetch(`/api/users/firebaseUid/${currentUser.uid}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();
//         setUserData(data); // This should include phoneNumber and any other user fields
//         setLoading(false);
//       };

//       fetchUserData().catch(console.error);
//     }
//   }, [currentUser]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUserData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!currentUser) {
//       alert('You need to be signed in to update your profile');
//       return;
//     }

//     try {
//       const token = await currentUser.getIdToken();
//       // Update the user's data
//       await fetch(`/api/users/${userData._id}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//       });

//       alert('Profile updated successfully!');
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       alert('Failed to update profile: ' + error.message);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Container component="main" maxWidth="sm">
//       <Typography component="h1" variant="h5">
//         Profile Page
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           id="phoneNumber"
//           label="Phone Number"
//           name="phoneNumber"
//           autoComplete="tel"
//           autoFocus
//           value={userData.phoneNumber}
//           onChange={handleInputChange}
//         />
//         {/* Add more input fields as necessary */}
//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           color="primary"
//         >
//           Update Profile
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default ProfilePage;








// import React, { useState, useEffect } from 'react';
// import { Container, TextField, Button, Typography } from '@mui/material';
// import { useAuth } from '../AuthContext'; // Adjust this path if necessary
// import { auth } from '../firebase'; // Adjust this path if necessary

// const ProfilePage = () => {
//   const { currentUser } = useAuth(); // Assuming useAuth() is properly implemented
//   const [userData, setUserData] = useState({
//     username: '',
//     email: '',
//     phoneNumber: '',
//     role: '',
//     firebaseUid: '',
//     fullName: '',
//     bio: '',
//     skills: '',
//     education: [],
//     experience: [],
//     calendlyLink: '',
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (currentUser) {
//       const fetchUserData = async () => {
//         const token = await currentUser.getIdToken();
//         const response = await fetch(`/api/users/firebaseUid/${currentUser.uid}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();
//         setUserData({
//           ...data, 
//           // Convert array of skills to a comma-separated string for easy editing
//           skills: data.skills.join(', '),
//         });
//         setLoading(false);
//       };

//       fetchUserData().catch(console.error);
//     }
//   }, [currentUser]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUserData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!currentUser) {
//       alert('You need to be signed in to update your profile');
//       return;
//     }

//     // Convert skills back to an array before sending
//     const updatedData = {
//       ...userData,
//       skills: userData.skills.split(',').map(skill => skill.trim()),
//     };

//     try {
//       const token = await currentUser.getIdToken();
//       await fetch(`/api/users/${userData._id}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedData),
//       });

//       alert('Profile updated successfully!');
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       alert('Failed to update profile: ' + error.message);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Container component="main" maxWidth="sm">
//       <Typography component="h1" variant="h5">
//         Profile Page
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         {/* Here are the additional fields similar to the phone number */}
//         <TextField
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           label="Full Name"
//           name="fullName"
//           autoComplete="name"
//           value={userData.fullName}
//           onChange={handleInputChange}
//         />
//         <TextField
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           label="Bio"
//           name="bio"
//           autoComplete="bio"
//           value={userData.bio}
//           onChange={handleInputChange}
//         />
//         <TextField
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           label="Skills (comma separated)"
//           name="skills"
//           autoComplete="skills"
//           value={userData.skills}
//           onChange={handleInputChange}
//         />
//         <TextField
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           label="Calendly Link"
//           name="calendlyLink"
//           autoComplete="calendly-link"
//           value={userData.calendlyLink}
//           onChange={handleInputChange}
//         />
//         {/* Add additional fields if necessary */}
//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           color="primary"
//         >
//           Update Profile
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default ProfilePage;







// import React, { useState, useEffect } from 'react';
// import { Container, TextField, Button, Typography } from '@mui/material';
// import { useAuth } from '../AuthContext'; // make sure this path is correct
// import { auth } from '../firebase'; // make sure this path is correct
// import { updatePassword } from 'firebase/auth';

// const ProfilePage = () => {
//   const { currentUser } = useAuth(); // useAuth() is a hook we created in AuthContext.js
//   const [userData, setUserData] = useState({
//     username: '',
//     email: '',
//     phoneNumber: '',
//     role: '',
//     firebaseUid: '',
//     fullName: '',
//     bio: '',
//     skills: '',
//     education: [],
//     experience: [],
//     calendlyLink: '',
//   });
//   const [newPassword, setNewPassword] = useState('');
//   const [loading, setLoading] = useState(true);

//   // Fetch user data when component mounts or when currentUser changes
//   useEffect(() => {
//     if (currentUser) {
//       const fetchUserData = async () => {
//         const token = await currentUser.getIdToken();
//         const response = await fetch(`/api/users/firebaseUid/${currentUser.uid}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();
//         setUserData(data); // Populate userData with the fetched data
//         setLoading(false);
//       };

//       fetchUserData().catch(console.error);
//     }
//   }, [currentUser]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUserData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!currentUser) {
//       alert('You need to be signed in to update your profile');
//       return;
//     }

//     try {
//       const token = await currentUser.getIdToken();
//       await fetch(`/api/users/${userData._id}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//       });

//       if (newPassword) {
//         // If newPassword is set, attempt to change the password
//         await updatePassword(currentUser, newPassword);
//         setNewPassword(''); // Clear the password field after update
//       }

//       alert('Profile updated successfully!');
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       alert('Failed to update profile: ' + error.message);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Container component="main" maxWidth="sm">
//       <Typography component="h1" variant="h5">
//         Profile Page
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         {/* Render all necessary fields based on the user schema */}
//         <TextField
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           id="fullName"
//           label="Full Name"
//           name="fullName"
//           autoComplete="name"
//           value={userData.fullName}
//           onChange={handleInputChange}
//         />
//         <TextField
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           id="bio"
//           label="Bio"
//           name="bio"
//           autoComplete="bio"
//           value={userData.bio}
//           onChange={handleInputChange}
//         />
//         <TextField
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           id="phoneNumber"
//           label="Phone Number"
//           name="phoneNumber"
//           autoComplete="tel"
//           value={userData.phoneNumber}
//           onChange={handleInputChange}
//         />
//         {/* Add additional fields here based on the user data you need to collect */}

//         {/* Change password field */}
//         <TextField
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           name="newPassword"
//           label="New Password"
//           type="password"
//           id="newPassword"
//           autoComplete="new-password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//         />

//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           color="primary"
//           style={{ marginTop: '16px' }}
//         >
//           Update Profile
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default ProfilePage;










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
          value={userData.skills.join(', ')} // Assuming skills is an array
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
        {userData.experience.length > 0 && (
          <Typography variant="h6" gutterBottom>
            Experience
          </Typography>
        )}
        {userData.experience.map((exp, index) => (
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

