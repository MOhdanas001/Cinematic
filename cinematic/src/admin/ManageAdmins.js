import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageAdmins = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('/api/admin/admins');
        setAdmins(response.data.admins);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };
    fetchAdmins();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Admins</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Admin Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map(admin => (
            <tr key={admin.id}>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>
                <button className="bg-red-500 text-white p-2 rounded-md">Remove Admin</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAdmins;
