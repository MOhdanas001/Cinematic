import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../utils/constant";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Swal from "sweetalert2";
import { Button, Modal } from 'antd';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/users-data`);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Add delete logic here
        Swal.fire("Deleted!", "User has been deleted.", "success");
      }
    });
  };

  const actionsBodyTemplate = (rowData) => {
    return (
      <div className="flex space-x-2">
        <button
          onClick={() => handleDelete(rowData.id)}
          className="text-red-700 p-2 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-blue-600 p-2 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>

      {/* Search Field */}
      <div className="flex justify-end items-center mb-4 text-slate-800">
        <div className="flex items-center space-x-2">
          <InputText
            type="search"
            placeholder="Search users..."
            onInput={(e) => setGlobalFilter(e.target.value)}
            className="p-inputtext-sm"
            style={{
              width: "250px",
              borderRadius: "5px",
              padding: "5px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            }}
          />
        </div>
      </div>

      {/* DataTable with global filter */}
      <DataTable
        value={users}
        paginator
        rows={10}
        loading={loading}
        dataKey="id"
        globalFilter={globalFilter}
        emptyMessage="No users found."
        className="rounded-md"
      >
        <Column
          field="name"
          header="Name"
          sortable
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="email"
          header="Email"
          sortable
          style={{ minWidth: "18rem" }}
        />
        <Column
          header="Actions"
          body={actionsBodyTemplate}
          style={{ minWidth: "10rem" }}
        />
      </DataTable>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
              <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                <div className="max-w-md mx-auto">
                  <div className="flex items-center space-x-5">
                    <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">i</div>
                    <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                      <h2 className="leading-relaxed">Create an Event</h2>
                      <p className="text-sm text-gray-500 font-normal leading-relaxed">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      <div className="flex flex-col">
                        <label className="leading-loose">Event Title</label>
                        <input type="text" className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Event title" />
                      </div>
                      <div className="flex flex-col">
                        <label className="leading-loose">Event Subtitle</label>
                        <input type="text" className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Optional" />
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col">
                          <label className="leading-loose">Start</label>
                          <div className="relative focus-within:text-gray-600 text-gray-400">
                            <input type="text" className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="25/02/2020" />
                            <div className="absolute left-3 top-2">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label className="leading-loose">End</label>
                          <div className="relative focus-within:text-gray-600 text-gray-400">
                            <input type="text" className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="26/02/2020" />
                            <div className="absolute left-3 top-2">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label className="leading-loose">Event Description</label>
                        <input type="text" className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Optional" />
                      </div>
                    </div>
                    <div className="pt-4 flex items-center space-x-4">
                      <button className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none" onClick={handleCancel}>
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg> Cancel
                      </button>
                      <button className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none" onClick={handleOk}>
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default ManageUsers;
