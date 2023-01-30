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
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [waiting, setWaiting] = useState(true);

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const theme = useSelector(state => state.theme);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "LOGIN", payload: user })
      } else {
        dispatch({ type: "LOGOUT", payload: null })
      }
      setWaiting(false);
    });
  }, []);

  if (waiting) {
    return (
      <Loading />
    );
  } else {
    return (
      <div id={theme}>
        <Router>
          {user ? (
            <Routes>
              <Route path='/' element={<Navigate to='/profile' />} />
              <Route path='/profile' element={<Profile />} />
            </Routes>
          ) : (
            <Routes>
              <Route path='/' element={<Navigate to='/login' />} />
              <Route path='/login' element={<LoginSignup />} />
            </Routes>
          )}
        </Router>
      </div>
    );
  }
}

export default App;
