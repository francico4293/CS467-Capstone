import React, { useState, useEffect } from 'react';
import './styles/light.css';
import './styles/dark.css';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route,
  Navigate
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Loading from './components/Loading';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './fire';
import { getUser } from './services/users';

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { user, theme } = useSelector(state => state);

  const setError = (e) => {
    alert("Could not fetch data!");
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user, setError);
        dispatch({ type: 'LOGIN', payload: {data, auth: user} });
      } else {
        dispatch({ type: 'LOGOUT', payload: null });
      }

      setLoading(false);
    });
  }, []);

  return (
    <div className='app' id={theme}>
      {
        loading
          ? (
            <div className='spinner-container d-flex justify-content-center align-items-center'>
              <Loading/>
            </div>
          )
          : (
            <Router>
              {
                user ? (
                  <Routes>
                    <Route path='/' element={<Navigate to='/profile'/>}/>
                    <Route path='/login' element={<Navigate to='/profile'/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                  </Routes>
                ) : (
                  <Routes>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='*' element={<Navigate to='/login'/>}/>
                  </Routes>
                )
              }
            </Router>
          )
      }
    </div>
  );
}

export default App;
