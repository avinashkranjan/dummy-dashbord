import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../slices/userSlice";
import { searchSlice } from "../slices/searchSlice";

const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const logOut = (e: any) => {
    e.preventDefault();
    dispatch(logout());
    window.location.href = "/";
  };

  const handleSearch = async (e: any) => {
    e.preventDefault();
    dispatch(searchSlice.actions.search(search));
  };

  return (
    <nav className="w-full px-4 flex justify-between bg-white h-16">
      <div className="hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
      </div>

      <form className="w-1/2 mt-2">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search by Title..."
            onChange={(e) => setSearch(e.target.value)}
            required
          />
          <button
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </form>
      <ul className="flex items-center">
        <li className="pr-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-bell"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </li>
        <li className="h-10 w-10">
          <div className="relative inline-block text-left">
            <div className="rounded-full w-10 h-10 hover:cursor-pointer border-2 hover:border-blue-500">
              <img
                className="h-full w-full rounded-full mx-auto"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt="profile-woman"
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>

            <div
              className={`${
                isOpen ? "block" : "hidden"
              } absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex={-1}
            >
              <div className="py-1" role="none">
                <a
                  href="#"
                  className="text-gray-700 hover:bg-gray-200 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-0"
                >
                  Account settings
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:bg-gray-200 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-1"
                >
                  Support
                </a>
                <a
                  href="#"
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-2"
                >
                  License
                </a>
                <button
                  type="submit"
                  className="text-gray-700 hover:bg-gray-200 hover:text-red-500 block w-full px-4 py-2 text-left text-sm"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-3"
                  onClick={logOut}
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default TopNav;
