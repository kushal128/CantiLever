import React from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth.js";
import { SearchProvider } from "../../context/Search.js";
import SearchInput from "../Form/SearchInput.js";
import { useCart } from "../../context/cart.js";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    //console.log(auth);
  };
  return (
    <>
      <nav className="bg-gray-200 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Avinya
          </Link>

          <div
            className={`${
              isOpen ? "block" : "hidden"
            } w-full md:flex md:items-center md:w-auto`}
            id="navbarSupportedContent"
          >
            <ul className="md:flex md:space-x-4 md:items-center">
              <li>
                <NavLink
                  to="/"
                  className="block py-2 px-4 text-gray-800 hover:text-gray-600"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <SearchInput />
              </li>
              {/* <li>
                <NavLink
                  to="/category"
                  className="block py-2 px-4 text-gray-800 hover:text-gray-600"
                >
                  Category
                </NavLink>
              </li> */}
              {!auth.user ? (
                <>
                  <li>
                    <NavLink
                      to="/register"
                      className="block py-2 px-4 text-gray-800 hover:text-gray-600"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      className="block py-2 px-4 text-gray-800 hover:text-gray-600"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown relative">
                    <Link
                      className="nav-link dropdown-toggle cursor-pointer inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                      onClick={toggleMenu}
                      role="button"
                      aria-expanded={isOpen ? "true" : "false"}
                    >
                      {auth?.user?.name} 🔽
                    </Link>
                    {isOpen && (
                      <ul className="dropdown-menu bg-transparent absolute right-0 z-10 w-56 mt-2 origin-top-right divide-y rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <li>
                          <NavLink
                            to={`/dashboard/${
                              auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                            className="dropdown-item block px-4 py-2 text-sm rounded-lg hover:text-gray-700 hover:bg-gray-100 bg-blue-500 text-white"
                          >
                            Dashboard
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={handleLogout}
                            to="/login"
                            className="dropdown-item block px-4 mt-1 py-2 text-sm text-white hover:bg-gray-100 hover:text-red-800 bg-red-600 rounded-lg"
                          >
                            Logout
                          </NavLink>
                        </li>
                      </ul>
                    )}
                  </li>
                </>
              )}
              <li>
                <NavLink
                  to="/cart"
                  className="block py-2 px-4 text-gray-800 hover:text-gray-600"
                >
                  Cart {cart?.length}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
