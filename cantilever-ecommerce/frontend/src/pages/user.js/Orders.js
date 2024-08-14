import React from "react";
import Layout from "../../components/layout/Layout.js";
import UserMenu from "../../components/layout/UserMenu.js";

const Orders = () => {
  return (
    <Layout>
      <div className="flex flex-col lg:flex-row lg:space-x-8 p-6 bg-gray-50 min-h-screen">
        <div className="lg:w-1/4 mb-6 lg:mb-0">
          <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
          <UserMenu />
        </div>
        <div className="lg:w-3/4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">All Orders</h2>
          {/* Add content related to orders here */}
          <div className="space-y-4">
            {/* Example order data */}
            <div className="border-b border-gray-200 py-2">
              <h3 className="font-medium">Order #1</h3>
              <p>Details of order #1...</p>
            </div>
            <div className="border-b border-gray-200 py-2">
              <h3 className="font-medium">Order #2</h3>
              <p>Details of order #2...</p>
            </div>
            {/* Repeat order data as needed */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
