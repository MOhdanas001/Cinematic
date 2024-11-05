import React, { useState } from 'react';
import ManageUsers from './ManageUsers';
import ManageShows from './ManageShows';
import ManageAdmins from './ManageAdmins';
import "../CSS/admin.css"
const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('users');

  const renderSection = () => {
    switch (activeSection) {
      case 'users':
        return <ManageUsers />;
      case 'shows':
        return <ManageShows />;
      case 'admins':
        return <ManageAdmins />;
      default:
        return <ManageUsers />;
    }
  };

  return (
    <div className="dashboard-container p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>

      <div className="sidebar flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <div className="flex flex-col space-y-4 md:w-1/4 bg-gray-800 p-4 rounded-lg">
          <button
            className={`p-3 rounded-lg ${activeSection === 'users' ? 'bg-gray-700' : ''}`}
            onClick={() => setActiveSection('users')}
          >
            Manage Users
          </button>
          <button
            className={`p-3 rounded-lg ${activeSection === 'shows' ? 'bg-gray-700' : ''}`}
            onClick={() => setActiveSection('shows')}
          >
            Manage Shows
          </button>
          <button
            className={`p-3 rounded-lg ${activeSection === 'admins' ? 'bg-gray-700' : ''}`}
            onClick={() => setActiveSection('admins')}
          >
            Manage Admins
          </button>
        </div>

        {/* Main Content */}
        <div className="content flex-1 p-4">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
