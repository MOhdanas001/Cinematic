import React, { useState } from 'react';

function Card({ items }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      key={items.id}
      className={`relative h-64 w-44 flex-shrink-0  rounded-md shadow-lg transition-transform transform ${
        isHover ? 'scale-150 z-10 object-cover h-28 rounded-none shadow-none  border-2  border-slate-900 border-b-0' : ''
      }`} // Apply z-index and scale on hover
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img
        src={items.image}
        alt={items.title}
        className="h-full w-full object-cover rounded-md transition-all duration-600 ease-in-out"
      />

      {/* Hover overlay */}
      {isHover && (
        <div className="inset-0 bg-slate-700 flex flex-col justify-center items-center text-white p-4 transition-opacity duration-600 ease-in-out border-2 border-slate-900">
          <h2 className="text-sm mb-2">{items.title}</h2>
        </div>
      )}
    </div>
  );
}

export default Card;
