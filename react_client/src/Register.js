import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

/* React Front-End Inspired by: 
https://www.geeksforgeeks.org/reactjs/how-to-develop-user-registration-form-in-reactjs/
https://www.geeksforgeeks.org/reactjs/reactjs-introduction */


  


function Register() {
  
  const [username, setUsername] = useState("");
  const [email,setEmail] = useState(""); 
  const [password,setPassword] = useState(""); 
  const [confirmPassword,setConfirmPassword] = useState(""); 
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  

 const handleSubmit = async (event) => {
  event.preventDefault(); // Prevent form submission from reloading the page

  // First clear any previous messages
    setSuccessMessage("");
    setError("");


    
    // validation checks
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // If all validations pass
    // setSuccessMessage("Registration successful!");

    // Prepare data to send to the backend


    const userData = {
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: password,
    };

    try {
/* Both methods work to post data to backend
      axios({
        url:'http://localhost:5001/api/users/register',
        method: 'POST',
        data: userData
      }).then((response)=>{
        setSuccessMessage(`Registration successful! User ID: ${response.data._id}, Email: ${response.data.email}`); 
      }).catch((err)=>{
           setError(`User Registration failed:`);}); */
    const response = await axios.post('http://localhost:5001/api/users/register', userData);
    // setSuccessMessage(`Registration successful! User ID: ${response.data._id}, Email: ${response.data.email}`);
    setSuccessMessage(`Registration successful for ${response.data.email}`);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(`Registration failed: ${err.response.data.message}`);
      } else {
        setError(`Registration failed: An unexpected error occurred. ${err.message}`);
      }
    };
  };



    return (
      <div className="app">
        
        <h1>New User Registration</h1>
        <input type="text" className="input-field" placeholder="UserName" value={username} onChange={(event) => setUsername(event.target.value)} /><br /><br />
        <input type="email"className="input-field"  placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} /><br /><br />
        <input type="password" className="input-field" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} /><br /><br />
        <input type="password" className="input-field" placeholder="Confirm Password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} /><br /><br />
        <button type="submit" className="submit-button" onClick={handleSubmit}>Register New User</button>
        {successMessage.length !== 0 ? <h2 className="success information-label">{successMessage}</h2> : <> </> } 
        {error.length !== 0 ? <h2 className="error information-label">{error}</h2> : <> </> }
        <br />
        <button type="submit" className="submit-button" onClick={()=>{navigate("/Login")}}>Already Registered? Login Here</button>        
      </div>
  );


}

export default Register
