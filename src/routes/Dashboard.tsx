import React from "react";
// Components
import SideBar from "../components/layout/SideBar";
import Footer from "../components/layout/Footer";
import Stores from "../components/dashboard/Stores";
import ProfileUser from "../components/dashboard/ProfileUser";
function Dashboard() {


  return (
    <>
      <SideBar />
      <div className="min-h-screen w-10/12 mx-auto">
        {/* NavBar */}
        <div className="navbar bg-primary mt-2 rounded-md">
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
          </div>
          <div className="flex-none">
            <button className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {/* Perfil del user */}
        <ProfileUser />
        {/* Tiendas del user */}
        <Stores />
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
