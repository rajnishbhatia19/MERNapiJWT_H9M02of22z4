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
        <br />
        <h5><i>Keep all your personal and professional contacts in one place securely. Sign up now to get started!</i></h5>
        <br />
        <h8>A <a href="https://cs50.harvard.edu/x/project/">CS50</a> Project by Rajnish Bhatia</h8>
    </div>
  );
};
export default Welcome;
