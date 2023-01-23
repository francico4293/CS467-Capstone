import React from 'react';
import './App.css';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate } from 'react-router-dom';
import LoginSignup from './pages/LoginSignup';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/login-signup'/>}/>
        <Route path='/login-signup' element={<LoginSignup/>}/>
      </Routes>
    </Router>
  );
}

export default App;
