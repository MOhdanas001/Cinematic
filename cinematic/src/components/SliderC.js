import React, { useRef, useState } from "react";
import "../CSS/browse.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Card from "./Card";

function Slider({ movies, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 6; // Show 5 cards at a time

  // Move to the next set of cards
  const handleNext = () => {
    if (movies && currentIndex + cardsToShow < movies.length) {
      setCurrentIndex((prevIndex) => prevIndex + cardsToShow);
    }
  };

  // Move to the previous set of cards
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - cardsToShow);
    }
  };

  // Ensure `movies` is not null or undefined and is an array
  const validMovies = Array.isArray(movies) ? movies : [];

  return (
    <div className="py-14 relative !-mt-52   mb-48">
      <h3 className="font-bold text-3xl text-white mb-5 ml-8">
        {title || "Top Rated Movies"}
      </h3>

      <div className="relative flex items-center w-[95%] m-auto">

        <button
          className="absolute left-0 z-10 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <IoIosArrowBack size={30} />
        </button>

        {/* Cards */}
        <div className="flex space-x-3 justify-between w-full px-12">
          {validMovies.slice(currentIndex, currentIndex + cardsToShow).map((item) => (
            <Card key={item.id} items={item} />
          ))}
        </div>

        <button
          className="absolute right-0 z-10 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
          onClick={handleNext}
          disabled={currentIndex + cardsToShow >= validMovies.length}
        >
          <IoIosArrowForward size={30} />
        </button>
      </div>
    </div>
  );
}

export default Slider;
