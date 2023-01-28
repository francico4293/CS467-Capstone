import React, {useState} from 'react';
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

const App = () => {
  const theme = useSelector(state => state.theme);
  const [user, setUser] = useState(null);

  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  })

  return (
    <div id={theme.type}>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='/login-signup'/>}/>
          <Route path='/login-signup' element={<LoginSignup/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
