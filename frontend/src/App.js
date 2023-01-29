import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
  const theme = useSelector(state => state.theme);
  const _user = useSelector(state => state.user);
  const [user, setUser] = useState(null);
  const [waiting, setWaiting] = useState(true);

  // TODO => consolidate: _user vs user

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setWaiting(false);
    });
  }, []);

  if (waiting || _user.isLoading) {
    return (
      <Loading />
    );
  } else {
    return (
      <div id={theme.type}>
        <Router>
          {user ? (
            <Routes>
              <Route path='/' element={<Navigate to='/profile' />} />
              <Route path='/profile' element={<Profile />} />
            </Routes>
          ) : (
            <Routes>
              <Route path='/' element={<Navigate to='/login-signup' />} />
              <Route path='/login-signup' element={<LoginSignup />} />
            </Routes>
          )}
        </Router>
      </div>
    );
  }
}

export default App;
