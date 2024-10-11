import React from "react";
import {} from "react-router-dom";

function Profile() {
  return (
    <div className="bg-slate-900 min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-white text-center text-4xl font-semibold mb-8">
        Who's Watching?
      </h2>
      <div className="flex space-x-8 justify-center mb-8">
        <div className="h-32 w-32">
          <img src="/Netflix-avatar.png" alt="avatar-image" />
          <h6 className="text-white text-center mt-2">User 1</h6>
        </div>
        <div className="h-32 w-32">
          <img src="/Netflix-avatar.png" alt="avatar-image" />
          <h6 className="text-white text-center mt-2">User 2</h6>
        </div>
        <div className="h-32 w-32 hover:h-36 hover:w-36 ease-in-out">
          <img src="/Netflix-avatar.png" alt="avatar-image" />
          <h6 className="text-white text-center mt-2">User 3</h6>
        </div>
      </div>

      <button className="text-white border border-white px-4 py-2 rounded mt-8">
        Manage Profile
      </button>

    </div>
  );
}

export default Profile;
