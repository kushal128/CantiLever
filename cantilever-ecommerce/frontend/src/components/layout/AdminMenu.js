import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h4 className="text-lg font-semibold mb-4">Admin Panel</h4>
      <div className="flex flex-col space-y-2">
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action bg-gray-100 border border-gray-200 p-3 rounded-md hover:bg-gray-200"
          activeClassName="bg-blue-500 text-white"
        >
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-action bg-gray-100 border border-gray-200 p-3 rounded-md hover:bg-gray-200"
          activeClassName="bg-blue-500 text-white"
        >
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="list-group-item list-group-item-action bg-gray-100 border border-gray-200 p-3 rounded-md hover:bg-gray-200"
          activeClassName="bg-blue-500 text-white"
        >
          Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className="list-group-item list-group-item-action bg-gray-100 border border-gray-200 p-3 rounded-md hover:bg-gray-200"
          activeClassName="bg-blue-500 text-white"
        >
          Users
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
