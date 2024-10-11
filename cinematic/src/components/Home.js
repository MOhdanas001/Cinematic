import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/home.css";
import axios from "axios";
import { API_ENDPOINT } from "../utils/constant";

function Home() {
  const navigate = useNavigate();

  // const [isLogin, setIsLogin] = useState(false);

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await axios.get(`${API_ENDPOINT}/auth`, {
  //         withCredentials: true,
  //       });
  //       if (!response.data.success) {
  //         setIsLogin = false;   
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   checkAuth();
  // }, [navigate]);

  const [signData, setSignData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        signData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        console.log(response.data.message);
        // navigate("/login");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home-section flex flex-col   bg-opacity-75">
      <div className="flex justify-between items-center px-5">
        <img
          className=" h-[98px] w-[240px]"
          src="./logo.png"
          height={20}
          width={60}
        ></img>
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="bg-red-600 opacity-100 text-xl p-2 px-4 hover:bg-red-700 text-white font-semibold -mt-6 rounded-sm"
        >
          Login
        </button>
      </div>
      <div className="text-white opacity-100 space-y-3  !mx-auto">
        <h1 className="text-center font-extrabold text-5xl drop-shadow-xl text-shadow">
          Watch unlimted movies, TV Shows and more
        </h1>
        <p className="text-center font-semibold text-2xl text-shadow">
          Watch anytime, anywhere
        </p>
      </div>
      <div className="bg-black text-white inline-block m-auto p-8 items-center content bg-opacity-70 z-30 rounded-lg mt-6">
        <h3 className="text-white text-center font-semibold text-3xl mb-4">
          Sign Up
        </h3>
        <form
          onSubmit={handleSubmit}
          className="p-2 space-y-3 flex flex-col opacity-90 text-white"
        >
          <input
            type="text"
            name="name"
            value={signData.name}
            onChange={handleChange}
            placeholder="Name"
            className="text-2xl p-2 px-3 text-white bg-slate-600 rounded-md"
          ></input>
          <input
            type="email"
            name="email"
            value={signData.email}
            onChange={handleChange}
            placeholder="Email"
            className="text-2xl p-2 px-3 text-white bg-slate-600 rounded-md"
          ></input>
          <input
            type="password"
            name="password"
            value={signData.password}
            onChange={handleChange}
            placeholder="Password"
            className="text-2xl p-2 px-3 text-white bg-slate-600 rounded-md"
          ></input>
          <button
            type="submit"
            className="bg-red-600 opacity-100 text-2xl p-2 px-3 hover:bg-red-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
