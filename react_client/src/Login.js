import './App.css';
import axios from 'axios';
import { useState } from 'react';
import Register from './Register';
import lockImage from './images/cropped_circle_image.png';
import { useNavigate } from 'react-router-dom';
import Main from './Main';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email,setEmail] = useState(""); 
  const [password,setPassword] = useState(""); 
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
  //event.preventDefault(); // Prevent form submission from reloading the page

  // First clear any previous messages
  setSuccessMessage("");
  setError("");
      
  // validation checks
  if (!email || !password) {
    setError("Both fields are required.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError("Invalid email format.");
    return;
  }

  // Prepare data to send to the backend
  const userData = {
    email: email.toLowerCase(),
    password: password,
  };

  try { 
      const response = await axios.post('http://localhost:5001/api/users/login', userData)
      .then((axiosresponse) => {console.log("Login Response: ", axiosresponse.data);
      localStorage.setItem("accessToken", axiosresponse.data.accessToken);
      //localStorage.setItem("username", axiosresponse.username);
      localStorage.setItem("loggedInUserEmail", email.toLowerCase());
      navigate('/Main');
    });
    setSuccessMessage(`Login successful for ${email.toLowerCase()}`);
  } catch (err) {
      setError(`Login failed`);
    }
  };
  
  return (
    <div className="app">
        <img src={lockImage} alt="Contacts Logo" />
        <br />
        <h1>Existing User Login</h1>
        <br />
        <input type="email" name="email"className="input-field" autoComplete='true' placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} /><br />
        <input type="password" name="password" className="input-field" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} /><br />
        <button className="submit-button" onClick={() => handleSubmit()}>Login</button>
        {successMessage.length !== 0 ? <h2 className="success information-label">{successMessage}</h2> : <> </> } 
        {error.length !== 0 ? <h2 className="error information-label">{error}</h2> : <> </> }
        <br />
        <button className="submit-button" onClick={() => navigate('/Register')}>New User Sign Up</button>
          
    </div>
  );
};

export default Login;