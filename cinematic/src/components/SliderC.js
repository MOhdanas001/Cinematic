import React, { useRef, useState } from "react";
import "../CSS/browse.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Card from "./Card";

function Slider({ movies, title, content }) {

  return (
    <div className=" bg-slate-800 py-14 overflow-y-visible ">
      <h3 className="font-bold text-3xl overflow-y-visible text-white mb-5 ml-8">
        TOP RATED MOVIES
      </h3>
      <div
  className="flex space-x-3  overflow-y-visible w-[95%] m-auto"
>
  {movies && movies.length > 0 ? (
    movies.map((item) => <Card key={item.id} items={item} />)
  ) : (
    <h1>no movies</h1>
  )}
</div>
    </div>
  );
}

export default Slider;
