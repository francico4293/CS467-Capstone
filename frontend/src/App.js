import React from 'react';
import './App.css';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate 
} from 'react-router-dom';
import LoginSignup from './pages/LoginSignup';

const App = () => {
  return (
    <div id=''>
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
