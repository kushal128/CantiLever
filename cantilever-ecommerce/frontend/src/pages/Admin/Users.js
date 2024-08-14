import React from "react";
import Layout from "../../components/layout/Layout.js";
import AdminMenu from "../../components/layout/AdminMenu.js";

const Users = () => {
  return (
    <Layout>
      <div className="flex flex-col lg:flex-row lg:space-x-8 p-6 bg-gray-50 min-h-screen">
        <div className="lg:w-1/4 mb-6 lg:mb-0">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <AdminMenu />
        </div>
        <div className="lg:w-3/4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">All Users</h2>
          {/* Add content related to users here */}
          <div className="space-y-4">
            {/* Example user data */}
            <div className="flex items-center border-b border-gray-200 py-2">
              <span className="font-medium w-32">User 1:</span>
              <span>user1@example.com</span>
            </div>
            <div className="flex items-center border-b border-gray-200 py-2">
              <span className="font-medium w-32">User 2:</span>
              <span>user2@example.com</span>
            </div>
            {/* Repeat user data as needed */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
