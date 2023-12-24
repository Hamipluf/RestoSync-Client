import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// Componentes
import ChangeProfilePicture from "../components/profile/ChangeProfilePicture";
import Footer from "../components/layout/Footer";
// Redux
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
// Interfaces
import { responseTaskOfUser } from "../utils/interfaces/tasks";
// HElpers
import getTaskOfUser from "../utils/helpersFetch/tasks/getTaskUser";

const Profile: React.FC = () => {
  const [edit, setEdit] = useState(false);
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
            <ChangeProfilePicture />
            <div className="flex items-center space-x-2 mt-2">
              <p className="text-2xl">{user.name + " " + user.last_name}</p>
              <span className="bg-blue-500 rounded-full p-1" title="Verified">
                {userRole()}
              </span>
            </div>
            <p className="text-gray-700">{user.username}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
            <div className="flex items-center space-x-4 mt-2">
              <button
                onClick={() => setEdit(!edit)}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-user-edit h-4 w-4 "
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5" />
                  <path d="M18.42 15.61a2.1 2.1 0 0 1 2.97 2.97l-3.39 3.42h-3v-3l3.42 -3.39z" />
                </svg>
                <span>Editar Perfil</span>
              </button>
            </div>
          </div>
        </div>

        <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
          <div className="w-full flex flex-col 2xl:w-1/3">
            <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
              <div className="flex justify-between">
                <h4 className="text-xl text-gray-900 font-bold">
                  Informacion Personal
                </h4>
                {edit && (
                  <button
                    onClick={() => setEdit(false)}
                    className="btn btn-error btn-square"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-square-rounded-x-filled m-auto"
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#2c3e50"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path
                        d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm-1.489 7.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z"
                        fill="currentColor"
                        stroke-width="0"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <ul className="mt-2 text-gray-700">
                <li className="flex border-y py-2">
                  <span className="font-bold w-24">Nombre:</span>
                  {edit ? (
                    <input
                      className="input input-bordered input-primary input-sm"
                      type="text"
                      placeholder={user.name}
                    />
                  ) : (
                    <span className="text-gray-700">{user.name}</span>
                  )}
                </li>
                <li className="flex border-y py-3">
                  <span className="font-bold w-24">Apellido:</span>
                  {edit ? (
                    <input
                      className="input input-bordered input-primary input-sm"
                      type="text"
                      placeholder={user.last_name}
                    />
                  ) : (
                    <span className="text-gray-700">{user.last_name}</span>
                  )}
                </li>

                <li className="flex border-b py-3">
                  <span className="font-bold w-24">Celular:</span>
                  <span className="text-gray-700">(123) 123-1234</span>
                </li>
                <li className="flex border-b py-3">
                  <span className="font-bold w-24">Email:</span>
                  {edit ? (
                    <input
                      className="input input-bordered input-primary input-sm"
                      type="text"
                      placeholder={user.email}
                    />
                  ) : (
                    <span className="text-gray-700">{user.email}</span>
                  )}
                </li>
                <li className="flex border-b py-3">
                  <span className="font-bold w-24">Ultima conexion:</span>
                  <span className="text-gray-700">
                    10 Jan 2022 (25 days ago)
                  </span>
                </li>
              </ul>
            </div>
          </div>
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
    </>
  );
};

export default Profile;
