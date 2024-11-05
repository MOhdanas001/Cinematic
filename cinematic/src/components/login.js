import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import Cookies from 'js-cookie';
import { API_ENDPOINT } from '../utils/constant';
import { TbAlertTriangleFilled } from "react-icons/tb";


function Login() {

  const [isLogin,setIsLogin]=useState(true);

  const [logData, setLogData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLogData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    try {
      const response = await axios.post(`${API_ENDPOINT}/login`, logData, {
        headers: {
          'Content-Type': 'application/json',
          withCredentials: true
        }
      });

      if (response.data.success) {
        // dispatch(setUser(response.data.user));
        const user=response.data.user;
        Cookies.set('token', response.data.token, { expires: 1 });
        if(user.admin){
         navigate('/admin-Dashboard');
        }
        else{
        navigate('/browse'); 
        }
        setIsLogin(true);
      }
    
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setIsLogin(false);
        console.log("Unauthorized:", error.response.data.message);
      } else {
        console.error('Error logging in:', error);
      }
    }
  };

  return (
    <div className='home-section flex flex-col bg-opacity-75'>
        <div className="flex justify-between items-center px-5">
        <img
          className=" h-[98px] w-[240px]"
          src="./logo.png"
          height={20}
          width={60}
          alt='404-notfound'></img>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="bg-red-600 opacity-100 text-xl p-2 px-4 hover:bg-red-700 text-white font-semibold -mt-6 rounded-sm"
        >
          Sign Up
        </button>
      </div>
      <div className='bg-black text-white m-auto p-8 items-center content bg-opacity-70 z-30 rounded-lg w-[40%]'>
        <h3 className='text-white text-center font-semibold text-3xl'>Log In</h3>
        {!isLogin &&
        <div className='bg-amber-300 border-2 border-amber-900 rounded-md py-5 px-3 text-amber-900 font-semibold mt-2'>
          <h3 className='flex'><TbAlertTriangleFilled  className='mt-[1px] text-5xl mr-1'/>Invalid email or password !</h3>
        </div>
        }
       
        <form className='p-2 space-y-3 opacity-85 flex flex-col mt-2 ' onSubmit={handleSubmit}>
          <input 
            type='email' 
            name='email' 
            value={logData.email} 
            onChange={handleChange} 
            placeholder='Email' 
            className='text-xl p-2 px-3 text-white bg-slate-600 rounded-md' 
          />
          <input 
            type='password' 
            name='password' 
            value={logData.password} 
            onChange={handleChange} 
            placeholder='Password' 
            className='text-xl p-2 px-3 text-white bg-slate-600 rounded-md' 
          />
          <button 
            type="button" 
            data-hs-toggle-password='{
              "target": "#hs-toggle-password"
            }' 
            className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-white rounded-e-md focus:outline-none focus:text-blue-600 dark:text-white dark:focus:text-blue-500 right-[40px] bottom-[17px]"
          >
            <svg className="shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
              <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
              <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
              <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"></line>
              <path className="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
              <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
          <button type='submit' className='bg-red-600 opacity-100 text-2xl p-2 px-3 hover:bg-red-700 !mt-7'>Log In</button>
          <div className='flex justify-between'>
            <div className='space-x-1'>
              <input type='checkbox'></input>
              <label>Remember me</label>
            </div>
            <span>Need help?</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
