import React from 'react';
import Layout from '../../components/layout/Layout.js';
import UserMenu from '../../components/layout/UserMenu.js';

const Profile = () => {
  return (
    <Layout>
      <div className="flex flex-col lg:flex-row lg:space-x-8 p-6 bg-gray-50 min-h-screen">
        <div className="lg:w-1/4 mb-6 lg:mb-0">
          <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
          <UserMenu />
        </div>
        <div className="lg:w-3/4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
          {/* Add content related to user profile here */}
          <div className="space-y-4">
            {/* Example profile data */}
            <div className="flex items-center border-b border-gray-200 py-2">
              <span className="font-medium w-32">Name:</span>
              <span>John Doe</span>
            </div>
            <div className="flex items-center border-b border-gray-200 py-2">
              <span className="font-medium w-32">Email:</span>
              <span>john.doe@example.com</span>
            </div>
            <div className="flex items-center border-b border-gray-200 py-2">
              <span className="font-medium w-32">Address:</span>
              <span>123 Main St, Anytown, USA</span>
            </div>
            {/* Repeat profile data as needed */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
