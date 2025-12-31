import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ContactList = () => {

  const token = localStorage.getItem("accessToken");
  const user = localStorage.getItem("username");
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(""); 
  const [error, setError] = useState("");
  let [state, setState] = useState({ loading: false, contacts: [], errorMessage: '' });

    // Fetch total contacts if not already present
    useEffect(() =>{
        try { 
            setState({...state, loading: true});
            axios.get(`http://localhost:5001/api/contacts`, {headers: {'Authorization': `Bearer ${token}`}})
            .then((axiosresponse) => {console.log("Total Contacts Response: ", axiosresponse.data);
            localStorage.setItem("totalContacts", axiosresponse.data.length);
            setState({...state, loading: false, contacts: axiosresponse.data});
            localStorage.setItem("contacts", JSON.stringify(axiosresponse.data));
            });
            setSuccessMessage(`Successfully Fetched Contacts for ${localStorage.getItem("username")}`);
        } catch (err) {
            setError(`Could not fetch contact count`);
            setState({...state, loading: false, errorMessage: err.message});
        }
    }, []);

   let {loading, contacts, errorMessage} = state; 
    const handleEdit = async (event) => {
      //event.preventDefault(); // Prevent form submission from reloading the page
      console.log("Editing Contact ID: ", event);
      // Navigate to Edit Contact Page
      localStorage.setItem("editContactId", event);    
      navigate(`/EditContact/${event}`);
    }

  return (
    <div>
      <section className="contact-search">
        {/* <pre>{JSON.stringify(contacts)}</pre> */}
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3">Contact Manager
                  <Link to={'/AddContact'} className="btn btn-primary ms-2"><i className="fa fa-plus-circle me-2" /> New Contact</Link>
                </p>
                <p className="fst-italic">  A simple contact manager application, to manage your personal and professional contacts easily.
                </p>
                </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <form className="row">
                <div className="col">
                  <div className="mb-2">
                    <input type="text" className="form-control" placeholder="Search Contacts..." />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-2">
                    <input type="submit" className="btn btn-outline-dark" value="Search" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-list">
        <div className="container">
          <div className="row">
            {
              contacts.length > 0 && contacts.map(contact => {
              return(
                  <div key={contact.id} className="col-md-6">
                    <div className="card my-2">
                      <div className="card-body">
                      <div className="row align-items-center d-flex float-sm-left">
                          {/* <div className="col-md-1">
                          <img src="http://assets.stickpng.com/images/585e4bcdcb11b227491c3396.png" alt="Image Name" className="contact-img" />
                          </div> */}
                          <div className="col-md-10">
                            <ul className="list-group">
                              <li className="list-group-item list-group-item-action">
                                Name : <span className="fw-bold">{contact.name}</span>
                              </li>
                              <li className="list-group-item list-group-item-action">
                                Email : <span className="fw-bold">{contact.email}</span>
                              </li>
                              <li className="list-group-item list-group-item-action">
                                Phone : <span className="fw-bold">{contact.phone}</span>
                              </li>
                            </ul>
                          </div>
                          <div className="col-md-1 float-sm-left">
                            {/* <Link to={`/contacts/view/:contactId`} className="btn btn-warning my-1"><i className="fa fa-eye" /></Link> */}
                                <Link to={`/EditContact`} onClick={() => handleEdit(contact._id)} className="btn btn-primary my-1"><i className="fa fa-pen" /></Link>
                                <button className="btn btn-danger my-1"><i className="fa fa-trash" /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) 
              })
            }
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactList