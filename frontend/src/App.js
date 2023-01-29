import React, { useState, useEffect } from 'react';
import './styles/light.css';
import './styles/dark.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import LoginSignup from './pages/LoginSignup';
import Profile from './pages/Profile';
import Loading from './components/Loading'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./fire";

const App = () => {
  const [isLightMode, setLightMode] = useState(sessionStorage.getItem('theme') ? sessionStorage.getItem('theme') === 'true' : false);
  const [user, setUser] = useState(null);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setWaiting(false);
    });

    sessionStorage.setItem('theme', isLightMode);
  }, [isLightMode]);

  if (waiting) {
    return (
      <Loading />
    );
  } else {
    return (
      <div id={isLightMode ? 'light' : 'dark'}>
        <Router>
          {user ? (
            <Routes>
              <Route path='/' element={<Navigate to='/profile' />} />
              <Route path='/profile' element={<Profile user={user} isLightMode={isLightMode} setLightMode={setLightMode} />} />
            </Routes>
          ) : (
            <Routes>
              <Route path='/' element={<Navigate to='/login-signup' />} />
              <Route path='/login-signup' element={<LoginSignup user={user} isLightMode={isLightMode} setLightMode={setLightMode} />} />
            </Routes>
          )}
        </Router>
      </div>
    );
  }
}

export default App;
