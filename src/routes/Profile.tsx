import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// Componentes
import ChangeImageProfile from "../components/profile/ChangeImageProfile";
import ProfileImage from "../components/profile/ProfileImage";
import Footer from "../components/layout/Footer";
// Redux
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
// Interfaces
import { responseTaskOfUser } from "../utils/interfaces/tasks";
// HElpers
import getTaskOfUser from "../utils/helpersFetch/tasks/getTaskUser";
import getStoreOfUser from "../utils/helpersFetch/stores/getStoresOfUser";
// Toastify
import { ToastContainer } from "react-toastify";
import UpdateUserInfo from "../components/user/UdapteUserInfo";
import UpdateStore from "../components/stores/UpdateStore";

const Profile: React.FC = () => {

  const user = useSelector((state: RootState) => state.userReducer.user);
  const {
    data: tasksUser,
  }: {
    data: responseTaskOfUser | undefined;
    isError: ConstrainBoolean;
    isLoading: ConstrainBoolean;
  } = useQuery<responseTaskOfUser, Error>({
    queryKey: ["tasks", user?.id],
    queryFn: getTaskOfUser,
  });
  const { data: dataStore } = useQuery({
    queryKey: ["stores-owner", user?.id],
    queryFn: getStoreOfUser,
  });

  const userRole = () => {
    if (user?.role === 3) {
      return "Administrador";
    } else if (user?.role === 2) {
      return "Premium";
    } else {
      return "Base";
    }
  };

  return (
    <>
      <div className="h-full bg-neutral p-8">
        <div className="bg-base-100 rounded-lg shadow-xl pb-8">
          <div className="absolute right-12 mt-4 rounded ">
            <div className="dropdown dropdown-end ">
              <div tabIndex={0} role="button" className="btn m-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  ></path>
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <p>Cambiar Portada</p>
                </li>
                <li className="btn btn-sm btn-error">Logout</li>
              </ul>
            </div>
          </div>
          <div className="w-full h-[250px]">
            <img
              src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
              className="w-full h-full rounded-tl-lg rounded-tr-lg"
            />
          </div>
          <div className="flex flex-col items-center -mt-20">
            <ProfileImage />
            <ChangeImageProfile />
            <div className="flex items-center space-x-2 mt-2">
              <p className="text-2xl">{user.name + " " + user.last_name}</p>
              <span className="bg-blue-500 rounded-full p-1" title="Verified">
                {userRole()}
              </span>
            </div>
            <p className="text-gray-700">{user.username}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2"></div>
        </div>

        <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
          <UpdateUserInfo />
          {dataStore && <UpdateStore store={dataStore} />}
          <div className="flex flex-col w-full 2xl:w-2/3">
            <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
              <h4 className="text-xl text-gray-900 font-bold">Recursos</h4>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
                <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl hover:scale-105 hover:translate-y-2 transition-all ease-in duration-100">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-indigo-600">
                      Tareas
                    </span>

                    <Link
                      to="/home"
                      className="btn-xs bg-gray-200 btn text-gray-500 hover:text-gray-200  "
                    >
                      ver
                    </Link>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-list-details w-12 h-12"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M13 5h8" />
                        <path d="M13 9h5" />
                        <path d="M13 15h8" />
                        <path d="M13 19h5" />
                        <path d="M3 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                        <path d="M3 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-end">
                        <span className="text-2xl 2xl:text-3xl font-bold text-dark">
                          {tasksUser?.data.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl hover:scale-105 hover:translate-y-2 transition-all ease-in duration-100">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-green-600">
                      Facturas
                    </span>
                    <Link
                      to="/#"
                      className="btn-xs bg-gray-200 btn text-gray-500 hover:text-gray-200  "
                    >
                      ver
                    </Link>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-file-description w-12 h-12"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                        <path d="M9 17h6" />
                        <path d="M9 13h6" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-end">
                        <span className="text-2xl 2xl:text-3xl font-bold text-dark">
                          7
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-blue-600">
                      New Connections
                    </span>
                    <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">
                      7 days
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div>
                      <svg
                        className="w-12 h-12 p-2.5 bg-blue-400 bg-opacity-20 rounded-full text-blue-600 border border-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-end">
                        <span className="text-2xl 2xl:text-3xl font-bold">
                          54
                        </span>
                        <div className="flex items-center ml-2 mb-1">
                          <svg
                            className="w-5 h-5 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            ></path>
                          </svg>
                          <span className="font-bold text-sm text-gray-500 ml-0.5">
                            7%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default Profile;
