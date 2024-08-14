import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h4 className="text-lg font-semibold mb-4">Dashboard</h4>
      <div className="flex flex-col space-y-2">
        <NavLink
          to="/dashboard/user/profile"
          className="list-group-item list-group-item-action bg-gray-100 border border-gray-200 p-3 rounded-md hover:bg-gray-200"
          activeClassName="bg-blue-500 text-white"
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className="list-group-item list-group-item-action bg-gray-100 border border-gray-200 p-3 rounded-md hover:bg-gray-200"
          activeClassName="bg-blue-500 text-white"
        >
          Orders
        </NavLink>
        </div>
    </div>
  );
};

export default UserMenu;
