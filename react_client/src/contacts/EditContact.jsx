import { use, useEffect } from "react";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import axios from "axios";

const EditContact = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  //let {contactId} = useParams(); // Get contactId from URL parameter
  const editContactId =  localStorage.getItem("editContactId");
  console.log("Editing Contact with ID: ", editContactId);
  const URL = `http://localhost:5001/api/contacts/${editContactId}`; 
  
  let [state, setState] = useState({
      contact: {
        name: "",
        email: "",
        phone: ""
      } 
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
    
  let {contact, errorMessage} = state;

if (state.contact.name === "") {
  axios.get(URL, {headers: {'Authorization': `Bearer ${token}`}})
  .then(axiosresponse => {setState({...state, contact: axiosresponse.data}); console.log(axiosresponse.data)})
  .catch(error => console.error(error));
}

let submitForm = async (event) => {
    event.preventDefault();
    
    try { 
      console.log("Submitting Updated Contact: ", state.contact);
      console.log("Using Token: ", token);
          const response = await axios.put(URL, state.contact,
            {headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'}})
          .then((axiosresponse) => 
          {
            console.log("Login Response: ", axiosresponse.data);
            navigate('/ContactList');
          });
          console.log(`Contact Update successful for ${state.contact.name}`);
        } catch (err) {
          console.log(`Contact Update failed with ${err.message} for ${state.contact.name}`);

        console.log(state.contact);        
      }
    };    

  return (
<div>
      <section className="edit-contact p-3">
        {/* <pre>{JSON.stringify(state.contact)}</pre> */}
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-success fw-bold">Edit Contact</p>
              <p className="fst-italic">Update an existing Contact from your Contacts list</p>
            </div>
            <div className="row">
              <div className="col-md-4">
                <form onSubmit={submitForm}>
                  <div className="mb-2"><input type="text" className="form-control-lg" name="name" placeholder="Name" value={state.contact.name} onChange={updateInput} required="true"/></div> 
                  <div className="mb-2"><input type="email" className="form-control-lg" name="email" placeholder="Email" value={state.contact.email} onChange={updateInput} required="true"/></div>
                  <div className="mb-2"><input type="text" className="form-control-lg" name="phone" placeholder="Phone" value={state.contact.phone} onChange={updateInput} required="true"/></div> 
                  <div className="mb-2 mx-sm-3">
                        <input type="submit" on="true" className="btn btn-success mb-2" value="Edit Contact" /> 
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

export default EditContact