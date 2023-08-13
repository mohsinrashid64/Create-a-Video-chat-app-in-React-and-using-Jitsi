import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import Header from './Components/Header';

function App() {
  const location = useLocation();
  const isHomeRoute = location.pathname === '/home';

  return (
    <div>
      {isHomeRoute && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
