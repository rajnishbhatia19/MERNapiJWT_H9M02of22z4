import { useNavigate } from 'react-router-dom';
import welcomeImage from './images/9722917.png';
function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="app">
        <img src={welcomeImage} alt="Contacts Logo" />
        <br />
        <h1>Personal Contacts App</h1>
        <br />
        <button className="submit-button" onClick={() => navigate('/Login')}>Existing User Login</button>
        <br />
        <button className="submit-button" onClick={() => navigate('/Register')}>New User Sign Up</button>
    </div>
  );
};
export default Welcome;
