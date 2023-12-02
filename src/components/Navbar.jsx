import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <div className="navbar p-3 flex items-center justify-between bg-gray-900 text-gray-400">
        <section className="flex items-center justify-center ">
          <div className="logo text-center md:order-1 flex">
            <Link to="/" className="text-white mx-4">
              My Notebook
            </Link>
            <div className="features">
              <ul className="flex mx-12 gap-8">
                <li className="hover:text-gray-200 cursor-pointer">
                  <Link
                    to="/"
                    className={location.pathname === "/" ? "text-white" : ""}
                  >
                    Home
                  </Link>
                </li>
                <li className="hover:text-gray-200 cursor-pointer">
                  <Link
                    to="/mynotes"
                    className={
                      location.pathname === "/mynotes" ? "text-white" : ""
                    }
                  >
                    My Notes
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
        {!localStorage.getItem("token") ? (
          <section className="flex gap-4 relative top-1">
            <Link
              to="/login"
              role="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Login
            </Link>
            <Link
              to="/signup"
              role="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              SignUp
            </Link>
          </section>
        ) : (
          <button
            onClick={handleLogout}
            role="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
