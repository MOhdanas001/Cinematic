import React from "react";
import "../CSS/home.css";
import axios from "axios";
import { API_ENDPOINT } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await axios.get(`${API_ENDPOINT}/logout`);

    if (res.data.success) {
      Cookies.remove('token');
      navigate("/login");
    }
  };

  return (
    <div className="bg-black flex justify-between items-center text-white h-20 shadow-2xl shadow-slate-900">
      <div className="flex">
        <img src="/logo.jpg" alt="Logo" className="h-10" />
        <h1 className="text-red-700 text-3xl font-bold">INEMATIC</h1>
      </div>
      <div>
        <ul className="text-white flex flex-row space-x-8 font-semibold">
          <li className="link link-underline link-underline-black pb-1">
            Movies
          </li>
          <li className="link link-underline link-underline-black pb-1">
            TV Shows
          </li>
          <li className="link link-underline link-underline-black pb-1">
            Categories
          </li>
        </ul>
      </div>
      <div>
        <button onClick={handleLogout} className="bg-slate-700 text-slate-300 font-bold p-2  mr-2 rounded-lg  px-3 ">
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Navbar;
