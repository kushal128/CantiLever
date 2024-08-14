import React from "react";
import Layout from "../../components/layout/Layout.js";
import AdminMenu from "../../components/layout/AdminMenu.js";
import { useAuth } from "../../context/auth.js";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row lg:space-x-8 p-6 bg-gray-50 min-h-screen">
        <div className="lg:w-1/4 mb-6 lg:mb-0">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <AdminMenu />
        </div>
        <div className="lg:w-3/4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Admin Information</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-medium w-32">Name:</span>
              <span>{auth?.user?.name}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium w-32">Email:</span>
              <span>{auth?.user?.email}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium w-32">Phone:</span>
              <span>{auth?.user?.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
