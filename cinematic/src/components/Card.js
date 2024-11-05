import React, { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { CiCirclePlus, CiCircleCheck } from "react-icons/ci";
import { AiTwotoneLike } from "react-icons/ai";
import { IoIosArrowDropdown, IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "../CSS/Card.css";
import { API_ENDPOINT } from "../utils/constant";
import axios from "axios";

function Card({ items ,myList}) {
  const [isHover, setIsHover] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [addList, setAddList] = useState(false);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId;
    if (isHover) {
      timeoutId = setTimeout(() => {
        setIsVideoPlaying(true);
      }, 1000);
    } else {
      setIsVideoPlaying(false);
    }

    return () => clearTimeout(timeoutId);
  }, [isHover]);

  const handleExpandClick = () => {
    setIsExpanded(true);
    setIsHover(false);
  };

  const handleCloseModal = () => {
    setIsExpanded(false);
  };

  const handleAddlist = async (id) => {
    try {
      // Sending the movieId in the request body
      const response = await axios.post(
        `${API_ENDPOINT}/addMyList`,
        { movieId: id },
        { withCredentials: true }
      );

      if (response.data.success) {
        setAddList(true); // Set the state to reflect the movie is added
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding to list:", error);
    }
  };

  const handleRemoveList = async (id) => {
    try {
      const response = await axios.post(
        `${API_ENDPOINT}/removeMylist`,
        { movieId: id },
        { withCredentials: true }
      );

      if (response.data.success) {
        setAddList(false);
        if (myList) setVisible(false);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error removing from list:", error);
    }
  };
  if (!visible) return null;

  return (
    <>
      <div
        key={items.id}
        className={`relative h-64 w-44 flex-shrink-0 bg-black rounded-md shadow-lg transition-transform transform ${
          isHover
            ? "scale-150 z-10 object-cover h-28 rounded-md shadow-none bg-black"
            : ""
        }`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {isVideoPlaying ? (
          <video
            src="./videoplayback.webm"
            autoPlay
            muted
            loop
            className="rounded-t-md object-cover h-28"
          />
        ) : (
          <img
            src={items.image}
            alt={items.title}
            className={`w-full object-cover rounded-md transition-all duration-1000 ease-in-out ${
              isHover ? "h-28" : "h-full"
            }`}
          />
        )}

        {isHover && !isExpanded && (
          <div className="inset-0 space-y-2 bg-gray-800 flex flex-col text-white p-4 transition-opacity duration-600 ease-in-out border border-slate-600 rounded-b-md">
            <h2 className="text-xs mb-2">{items.title}</h2>
            <div className="flex font-medium text-lg text-gray-500 space-x-2 justify-between">
              <div className="flex space-x-2">
                <FaPlayCircle
                  onClick={() => {
                    navigate("/player");
                  }}
                  className="hover:scale-125 cursor-pointer duration-500 ease-in-out"
                />
                <div className="icon-container">
  {addList || items.mylist ? (
    <div className="tooltip-wrapper">
      <div className="dialog_box bottom">Remove from My List</div>
      <CiCircleCheck
        onClick={() => handleRemoveList(items._id)}
        className="font-bold text-xl mb-2 hover:text-white"
      />
    </div>
  ) : (
    <div className="tooltip-wrapper">
      <div className="dialog_box !px-2 py-0 bottom">Add to My List</div>
      <CiCirclePlus
        onClick={() => handleAddlist(items._id)}
        className="font-extrabold text-xl mb-2 hover:text-white"
      />
    </div>
  )}
</div>

                <AiTwotoneLike />
              </div>
              <IoIosArrowDropdown
                onClick={handleExpandClick}
                className="cursor-pointer text-gray-500 text-2xl mb-4 hover:text-white"
              />
            </div>
            <div className="flex font-normal text-[10px] space-x-2">
              <span className="border border-slate-400 rounded-sm px-1">
                U/A 7+
              </span>
              <p>2h 23m</p>
              <p>HD</p>
            </div>
            <div className="flex">
              <ul className="flex font-normal text-[8px] space-x-2 ">
                {Array.isArray(items.genres) && items.genres.length > 0 ? (
                  items.genres.map((genre, index) => (
                    <li key={index}>{genre}</li>
                  ))
                ) : (
                  <li>No genres available</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
      {/* Expanded Modal */}
      {isExpanded && (
        <>
          {" "}
          <div
            className="modal-overlay backdrop-blur-sm"
            onClick={handleCloseModal}
          ></div>
          <div
            className="modal-container bg-gray-800 border border-gray-700 shadow-lg"
            // onMouseLeave={handleCloseModal} // Close the modal when the mouse leaves
          >
            <div className="modal-content">
              <button
                className="close-button fixed right-1 top-1"
                onClick={handleCloseModal}
              >
                <IoIosClose className="text-4xl bg-black rounded-full " />
              </button>
              <img
                src={items.image}
                alt={items.title}
                className="modal-image "
              />
              <h2 className="modal-title">{items.title}</h2>
              <p className="modal-overview">{items.overview}</p>
              <h3 className="modal-episodes-title">Episodes:</h3>
              <ul className="modal-episodes-list">
                <li>Episode 1 - Introduction</li>
                <li>Episode 2 - The Challenge</li>
                <li>Episode 3 - The Finale</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Card;
