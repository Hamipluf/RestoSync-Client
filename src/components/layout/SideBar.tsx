import React, { useState } from "react";
import LogoW from "../../assets/RestoSync-logos_white.png";
import { Link } from "react-router-dom";
function Sidebar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function setDarkMode(val: string) {
    setIsDarkMode(val === "dark");
  }

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <div className="fixed top-0 z-50 ">
      <label className="btn btn-circle btn-accent swap swap-rotate btn-md my-2">
        {/* this hidden checkbox controls the state */}
        <input type="checkbox" onClick={() => toggleSidebar()} />

        {/* hamburger icon */}
        <svg
          className="swap-off fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>

        {/* close icon */}
        <svg
          className="swap-on fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
        </svg>
      </label>
      <aside
        className={`w-60 ${
          isSidebarOpen ? "" : "-translate-x-48"
        } fixed transition transform ease-in-out duration-1000 flex h-screen bg-[#1E293B] rounded-md`}
      >
        <ul className="flex-1 overflow-y-auto">
          {/* Dashboard */}
          <li className="p-2 hover:bg-gray-700 cursor-pointer my-4 ">
            <Link to="/dashboard">
              {isSidebarOpen ? (
                <>
                  <p className="text-sm flex gap-3 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-layout-dashboard"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M4 4h6v8h-6z"></path>
                      <path d="M4 16h6v4h-6z"></path>
                      <path d="M14 12h6v8h-6z"></path>
                      <path d="M14 4h6v4h-6z"></path>
                    </svg>
                    Dashboard
                  </p>
                </>
              ) : (
                <>
                  <p className="translate-x-48 transition-all ease-out duration-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-layout-dashboard "
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M4 4h6v8h-6z"></path>
                      <path d="M4 16h6v4h-6z"></path>
                      <path d="M14 12h6v8h-6z"></path>
                      <path d="M14 4h6v4h-6z"></path>
                    </svg>
                  </p>
                </>
              )}
            </Link>
          </li>
          {/* Home */}
          <li className="p-2 hover:bg-gray-700 cursor-pointer my-4  ">
            {isSidebarOpen ? (
              <>
                <p className="text-sm flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-home"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
                  </svg>
                  Home
                </p>
              </>
            ) : (
              <>
                <p className="translate-x-48 transition-all ease-out duration-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-home"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
                  </svg>
                </p>
              </>
            )}
          </li>
          {/* Horarios */}
          <li className="p-2 hover:bg-gray-700 cursor-pointer my-4  ">
            {isSidebarOpen ? (
              <>
                <p className="text-sm flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-report"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M8 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5.697"></path>
                    <path d="M18 14v4h4"></path>
                    <path d="M18 11v-4a2 2 0 0 0 -2 -2h-2"></path>
                    <path d="M8 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
                    <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                    <path d="M8 11h4"></path>
                    <path d="M8 15h3"></path>
                  </svg>{" "}
                  Horarios
                </p>
              </>
            ) : (
              <p className="translate-x-48 transition-all ease-out duration-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-report"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M8 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5.697"></path>
                  <path d="M18 14v4h4"></path>
                  <path d="M18 11v-4a2 2 0 0 0 -2 -2h-2"></path>
                  <path d="M8 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
                  <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                  <path d="M8 11h4"></path>
                  <path d="M8 15h3"></path>
                </svg>
              </p>
            )}
          </li>
          {/* Facturas */}
          <li className="p-2 hover:bg-gray-700 cursor-pointer my-4  ">
            {isSidebarOpen ? (
              <p className="text-sm flex gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-file-invoice"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                  <path d="M9 7l1 0"></path>
                  <path d="M9 13l6 0"></path>
                  <path d="M13 17l2 0"></path>
                </svg>
                Facturas
              </p>
            ) : (
              <p className="translate-x-48 transition-all ease-out duration-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-file-invoice"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                  <path d="M9 7l1 0"></path>
                  <path d="M9 13l6 0"></path>
                  <path d="M13 17l2 0"></path>
                </svg>
              </p>
            )}
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;
