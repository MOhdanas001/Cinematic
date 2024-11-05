import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageShows = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get('/api/admin/shows');
        setShows(response.data.shows);
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };
    fetchShows();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Shows</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shows.map(show => (
            <tr key={show.id}>
              <td>{show.title}</td>
              <td>{show.genre}</td>
              <td>
                <button className="bg-yellow-500 text-white p-2 rounded-md">Edit</button>
                <button className="bg-red-500 text-white p-2 rounded-md ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageShows;
