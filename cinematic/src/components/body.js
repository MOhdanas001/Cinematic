import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './Home';
import Login from './login';
import Profile from './profile';
import Browse from './Browse';
import Navbar from './Navbar';
import axios from 'axios';
import { API_ENDPOINT } from '../utils/constant';
import Movies from './Movies.js';
import Player from './Player';
import Tvshows from './Tvshows.js';
import Mylist from './Mylist.js';
import Dashboard from '../admin/Dashboard.js';

function Body() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const location =useLocation()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/auth`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setIsLogin(true); 

          if(location.pathname==='/' || location.pathname==='/login'){
          navigate('/browse');
          }
        } else {
          setIsLogin(false); // User is not authenticated
  
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsLogin(false);

      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <>
      {isLogin && <Navbar />} {/* Show Navbar only if authenticated */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/shows" element={<Tvshows />} />
        <Route path="/player" element={<Player />} />
        <Route path="/mylist" element={<Mylist />} />
        <Route path="/admin-Dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default Body;
