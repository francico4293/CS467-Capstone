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
import JobBoard from './pages/JobBoard';
import Contacts from './pages/Contacts';
import LoadingSymbol from './components/LoadingSymbol'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./fire";
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './services/users';

const App = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch()
  const { user, theme } = useSelector(state => state)

  const setError = (e) => {
    alert("Could not fetch data!");
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user, setError)
        dispatch({ type: "LOGIN", payload: {data, ...user} })
      } else {
        dispatch({ type: "LOGOUT", payload: null })
      }
      setLoading(false)
    });
  }, []);


  return (
    loading ?
      <LoadingSymbol />
      :
      <div id={theme}>
        <Router>
          {user ? (
            <Routes>
              <Route path='/' element={<Navigate to='/profile' />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/job-board' element={<JobBoard />} />
              <Route path='/contacts' element={<Contacts />} />
              <Route path='/login' element={<Navigate to='/profile' />} />
            </Routes>
          ) : (
            <Routes>
              <Route path='/login' element={<LoginSignup />} />
              <Route path='*' element={<Navigate to='/login' />} />
            </Routes>
          )}
        </Router>
      </div>
  );
}

export default App;
