import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './Register';
import Welcome from './Welcome';
import Login from './Login';
import Main from './Main';
import NavBar from './contacts/NavBar';
import ContactList from './contacts/ContactList';
import AddContact from './contacts/AddContact';
import EditContact from './contacts/EditContact';
 function App() {
      localStorage.setItem("accessToken", "");
      localStorage.setItem("username", "");
      localStorage.setItem("loggedInUserEmail", "");
      localStorage.setItem("id", "");
      localStorage.setItem("totalContacts", "0"); 
      localStorage.setItem("contacts", []);
      return (
        <div className="app">
          {/* Example Bootstrap Buttons 
           <button className="btn btn-success me-5">Hello</button>
           <button className="btn btn-success me-5"><i className="fa fa-home" />Home</button> */}
           <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Main" element={<Main />} />
              <Route path="/NavBar" element={<NavBar />} />
              <Route path="/ContactList" element={<ContactList />} />
              <Route path="/AddContact" element={<AddContact />} />
              <Route path="/EditContact" element={<EditContact />} />
          </Routes>
        </div>
    );
 };
export default App;
