import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './Register';
import Welcome from './Welcome';
import Login from './Login';
import Main from './Main';
 function App() {
      return (
        <div className="app">
           <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Main" element={<Main />} />
          </Routes>
        </div>
    );
 };
export default App;
