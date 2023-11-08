import { useState } from "react";
import { Link } from "react-router-dom";
// Images
import Logo from "../../assets/RestoSync-logos_white.png";

function SideBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarWidth = isOpen ? "w-32" : "w-16";
  return (
    <>
      <div
        className={`bg-gray-900 text-white h-[98vh] ${sidebarWidth} transition-all duration-300 flex flex-col items-center m-2 rounded-xl fixed z-10`}
      >
        <div className="p-4">
          <img
            src={Logo}
            onClick={toggleSidebar}
            className="w-full cursor-pointer"
          />
        </div>
        <div className="divider mx-4"></div>
        <ul className="flex-1 overflow-y-auto">
          {/* Dashboard */}
          <li className="p-2 hover:bg-gray-700 cursor-pointer my-4">
            <Link to="/dashboard">
              {isOpen ? (
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-layout-dashboard"
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
                    <path d="M4 4h6v8h-6z"></path>
                    <path d="M4 16h6v4h-6z"></path>
                    <path d="M14 12h6v8h-6z"></path>
                    <path d="M14 4h6v4h-6z"></path>
                  </svg>
                </>
              )}
            </Link>
          </li>
          {/* Home */}
          <li className="p-2 hover:bg-gray-700 cursor-pointer my-4  ">
            {isOpen ? (
              <>
                <p className="text-sm flex gap-3">
                  {" "}
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
              </>
            )}
          </li>
          {/* Horarios */}
          <li className="p-2 hover:bg-gray-700 cursor-pointer my-4  ">
            {isOpen ? (
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
              <>
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
                </svg>
              </>
            )}
          </li>
          {/* Facturas */}
          <li className="p-2 hover:bg-gray-700 cursor-pointer my-4  ">
            {isOpen ? (
              <>
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
              </>
            ) : (
              <>
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
              </>
            )}
          </li>
        </ul>
        <div className="divider mx-4"></div>

        <div className="avatar p-4">
          <div className={` ${isOpen ? "w-20" : "w-10"} rounded-full`}>
            <img src="data:image/png;base64,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" />
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
