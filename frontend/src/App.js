import React from 'react';
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

const App = () => {
  const theme = useSelector(state => state.theme);

  return (
    <div id={theme.type}>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='/login-signup'/>}/>
          <Route path='/login-signup' element={<LoginSignup/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
