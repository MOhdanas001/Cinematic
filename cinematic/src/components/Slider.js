import React, { useRef } from 'react';
import "../CSS/browse.css";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function Slider({ movies,title,content }) {
  const sliderRef = useRef(null); // Reference to the movie cards container

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth, 
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth, // Scroll by the container's width (100%)
        behavior: 'smooth', // Smooth scrolling effect
      });
    }
  };

  return (
    <div className='m-5'>
      <h3 className='text-white font-bold text-2xl'>{title}</h3>
      <div className='relative flex group w-full'>
        {/* Left Arrow */}
        <div 
          className='flex mt-4 h-72 bg-slate-600 arrows absolute opacity-0 group-hover:opacity-75 transition-opacity duration-300 ease-in-out'
          onClick={scrollLeft} // Call scrollLeft on click
        >
          <IoIosArrowBack color='white' size={55} className='my-auto cursor-pointer' />
        </div>
        
        {/* Movie Cards */}
        <div 
          ref={sliderRef} // Attach ref to this container
          className='movie-cards flex space-x-3 mt-4 overflow-x-hidden h-72 w-full'
        >
          {/* Map over the movie data */}
          {movies && movies.length > 0 ? (
            movies.map((movie) => (
              <div  className='card w-1/5 flex-shrink-0 rounded-xl'>
                {content === 1 ? (
                <img 
                  src={movie.image}  
                  alt={movie.title} 
                  className="w-full  object-cover" 
                />
              ) : content === 2 ? (
                <img 
                  src={movie.picture_url}  
                  alt={movie.title} 
                  className="w-full  object-cover" 
                />
              ) : null}
                <h4 className='text-white text-center mt-2'>{movie.title}</h4> {/* Movie title */}
              </div>
            ))
          ) : (
            <p className='text-white'>No movies to display</p>
          )}
        </div>

        {/* Right Arrow */}
        <div 
          className='flex h-72 mt-4 bg-slate-500 arrows absolute right-[0px] opacity-0 group-hover:opacity-75 transition-opacity duration-300 ease-in-out'
          onClick={scrollRight} // Call scrollRight on click
        >
          <IoIosArrowForward color='white' size={55} className='my-auto cursor-pointer' />
        </div>
      </div>
    </div>
  );
}

export default Slider;
