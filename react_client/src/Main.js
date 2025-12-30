import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Main() {
    const navigate = useNavigate();
    
    const [email,setEmail] = useState(""); 
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");
    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("username");
    const [totalContacts, setTotalContacts] = useState(localStorage.getItem("totalContacts"));
    const [username, setUsername] = useState(localStorage.getItem("username"));
    
    // Fetch user details if not already present
    useEffect(() =>{
        try { 
            axios.get('http://localhost:5001/api/users/current', {headers: {'Authorization': `Bearer ${token}`}})
            .then((axiosresponse) => {console.log("Login Response: ", axiosresponse.data);
            localStorage.setItem("id", axiosresponse.data.id);
            localStorage.setItem("username", axiosresponse.data.username);
            });
            setSuccessMessage(`Successfully Fetched Info for ${localStorage.getItem("username")}`);
        } catch (err) {
            setError(`Could not fetch user details`);
        }
    }, []);

    // Fetch total contacts if not already present
    useEffect(() =>{
        try { 
            axios.get(`http://localhost:5001/api/contacts`, {headers: {'Authorization': `Bearer ${token}`}})
            .then((axiosresponse) => {console.log("Total Contacts Response: ", axiosresponse.data);
            localStorage.setItem("totalContacts", axiosresponse.data.length);
            });
            setSuccessMessage(`Successfully Fetched Contacts for ${localStorage.getItem("username")}`);
            navigate('/ContactList');
        } catch (err) {
            setError(`Could not fetch contact count`);
        }
    }, []);

    return (
    <div className="app">
        <h3>Welcome to your contacts page, <b><u>{user} !</u></b></h3>
        {/* <button className="submit-button" onClick={() => handleSubmit()}>Add New Contact</button> 
            <button className="submit-button" onClick={() => handleSubmit()}>Update Existing Contact</button> 
            <button className="submit-button" onClick={() => handleSubmit()}>Delete ExistingContact</button> 
            <button className="submit-button" onClick={() => handleSubmit()}>Logout</button> 
        
        */}
    </div>
  );
};
export default Main