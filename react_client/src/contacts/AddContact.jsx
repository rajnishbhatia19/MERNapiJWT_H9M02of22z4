import { useState } from "react"
import { Link } from "react-router-dom"
import ContactList from "./ContactList";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddContact = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  let [state, setState] = useState({
    loading: false,
    contact: {
    name: "",
    email: "",
    phone: ""
    },
    errorMessage: ''
  });

  let updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value
      }
    });
  };

  let {loading, contact, errorMessage} = state;

  // Prepare data to send to the backend
  const userData = {
    "name": contact.name,
    "email": contact.email,
    "phone": contact.phone,
    "user_id": localStorage.getItem("id")
  };

  let submitForm = async (event) => {
    event.preventDefault();
    
    try { 
      console.log("Submitting New Contact: ", userData);
      console.log("Using Token: ", token);
          const response = await axios.post('http://localhost:5001/api/contacts',  
            userData,
            {headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'}})
          .then((axiosresponse) => 
          {
            console.log("Login Response: ", axiosresponse.data);
            navigate('/ContactList');
          });
          setSuccessMessage(`Contact Creation successful for ${contact.name}`);
        } catch (err) {
          setError(`Contact Creation failed with ${err.message} for ${contact.name}`);

        console.log(contact);        
      }
    };    


  return (
    <div>
      {/* <pre>{JSON.stringify(state.contact)}</pre> */}
      <section className="add-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-success fw-bold">New Contact</p>
              <p className="fst-italic">Add a New Contact to your Contacts list</p>
            </div>
            <div className="row">
              <div className="col-md-4">
                <form onSubmit={submitForm}>
                  <div className="mb-2"><input name="name" required={true} value={contact.name} onChange={updateInput} type="text" className="form-control-lg" placeholder="Name" /></div> 
                  <div className="mb-2"><input name="email" required={true} value={contact.email} onChange={updateInput} type="email" className="form-control-lg"placeholder="Email" /></div> 
                  <div className="mb-2"><input name="phone" required={true} value={contact.phone} onChange={updateInput} type="text" className="form-control-lg" placeholder="Phone" /></div> 
                  <div className="mb-2 mx-sm-3" on="true">
                        <input type="submit" on="true" className="btn btn-success mb-2" value="Add Contact" /> 
                        <Link to="/ContactList" className="btn btn-dark ms-2">Cancel</Link>
                    </div>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AddContact