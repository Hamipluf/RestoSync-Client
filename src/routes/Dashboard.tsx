import React from "react";
import { useQuery } from "@tanstack/react-query";
// Components
import SideBar from "../components/layout/SideBar";
import Footer from "../components/layout/Footer";
import Stores from "../components/dashboard/Stores";
import ProfileUser from "../components/dashboard/ProfileUser";
// Helpers
import { getCurrent } from "../utils/helpersFetch/user/current";
import getStoreOfUser from "../utils/helpersFetch/stores/getStoresOfUser";
import UpdateStore from "../components/stores/UpdateStore";
import AllProductsOfStore from "../components/products/AllProductsOfStore";
// Redux
import { useAppDispatch } from "../redux/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Dashboard = () => {
  const product = useSelector(
    (state: RootState) => state.productReducer.product
  );
  const userData = useQuery({
    queryKey: ["user"],
    queryFn: getCurrent,
  });
  const storeData = useQuery({
    queryKey: ["stores-owner"],
    queryFn: getStoreOfUser,
  });
  return (
    <>
      <div className="antialiasedv w-full min-h-screen text-slate-300 relative py-4">
        <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
          {/* Profile user */}

          {userData.data && (
            <ProfileUser
              user={userData.data?.data}
              isLoading={userData.isLoading}
            />
          )}
          <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
            <div id="24h">
              <div className="flex gap-x-4 items-center justify-items-center">
                <h1 className="font-bold py-4 uppercase">
                  Datos de la empresa.
                </h1>
                {storeData.data && <UpdateStore store={storeData.data.data} />}
              </div>
              <div id="stats" className="grid gird-cols-1 w-full gap-6">
                <div className="bg-black/60 to-white/5 p-6 rounded-lg ">
                  <div className="overflow-x-auto">
                    {storeData.isLoading ? (
                      <>
                        <div className="flex flex-col gap-4 w-10/12">
                          <div className="skeleton h-4 w-10/12"></div>
                          <div className="skeleton h-4 w-full"></div>
                          <div className="skeleton h-4 w-full"></div>
                        </div>
                      </>
                    ) : (
                      <>
                        <table className="table">
                          {/* head */}
                          <thead className="bg-secondary rounded-lg text-dark">
                            <tr>
                              <th>Local</th>
                              <th>Email</th>
                              <th>Dueño</th>
                              <th>Razon Social</th>
                              <th>Direccion</th>
                              <th>CUIT </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{storeData.data?.data.name}</td>
                              <td>{userData.data?.data.email}</td>
                              <td>{userData.data?.data.name}</td>
                              <td>{storeData.data?.data.company_name}</td>
                              <td>{storeData.data?.data.address}</td>
                              <td>{storeData.data?.data.cuit}</td>
                            </tr>
                          </tbody>
                        </table>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div id="last-incomes">
              <h1 className="font-bold py-4 uppercase">Productos</h1>
              <div className="grid grid-cols-3 gap-4 w-full">
                <div className="col-span-2">
                  <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                      {storeData.data && ( sid={storeData.data?.data.id} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="card bg-base-100 h-full shadow-xl">
                    <div className="flex">
                      <h2 className="card-title bg-secondary rounded-r-lg max-w-fit m-2 px-2">
                        Producto
                      </h2>
                    </div>
                    <div className="card-body">
                      {product.id && (
                        <>
                          <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900 bg-secondary px-2 rounded-sm">
                            {product.title}
                          </h2>
                          <p className="mb-2 text-base dark:text-gray-300 text-light p-2 rounded-sm bg-neutral">
                            {product.description}
                          </p>
                          <p className=" dark:text-gray-300 text-ligth bg-primary px-2 max-w-fit rounded-md">
                            Category:{" "}
                            <span className="text-white">
                              {product.category}
                            </span>
                          </p>
                          <div className="flex items-center">
                            <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white ">
                              ${product.price}
                            </p>
                            <p className="text-base  font-semibold text-midLigth  dark:text-gray-300 ">
                              Stock: {product.stock_quantity}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="last-users">
              <h1 className="font-bold py-4 uppercase">Last 24h users</h1>
              <div className="overflow-x-scroll">
                <table className="w-full whitespace-nowrap">
                  <thead className="bg-black/60">
                    <th className="text-left py-3 px-2 rounded-l-lg">Name</th>
                    <th className="text-left py-3 px-2">Email</th>
                    <th className="text-left py-3 px-2">Group</th>
                    <th className="text-left py-3 px-2">Status</th>
                    <th className="text-left py-3 px-2 rounded-r-lg">
                      Actions
                    </th>
                  </thead>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-2 font-bold">
                      <div className="inline-flex space-x-3 items-center">
                        <span>
                          <img
                            className="rounded-full w-8 h-8"
                            src="https://images.generated.photos/tGiLEDiAbS6NdHAXAjCfpKoW05x2nq70NGmxjxzT5aU/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTM4ODM1LmpwZw.jpg"
                            alt=""
                          />
                        </span>
                        <span>Thai Mei</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">thai.mei@abc.com</td>
                    <td className="py-3 px-2">User</td>
                    <td className="py-3 px-2">Approved</td>
                    <td className="py-3 px-2">
                      <div className="inline-flex items-center space-x-3">
                        <a href="" title="Edit" className="hover:text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </a>
                        <a
                          href=""
                          title="Edit password"
                          className="hover:text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                            />
                          </svg>
                        </a>
                        <a
                          href=""
                          title="Suspend user"
                          className="hover:text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                            />
                          </svg>
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-2 font-bold">
                      <div className="inline-flex space-x-3 items-center">
                        <span>
                          <img
                            className="rounded-full w-8 h-8"
                            src="https://images.generated.photos/tGiLEDiAbS6NdHAXAjCfpKoW05x2nq70NGmxjxzT5aU/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTM4ODM1LmpwZw.jpg"
                            alt=""
                          />
                        </span>
                        <span>Thai Mei</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">thai.mei@abc.com</td>
                    <td className="py-3 px-2">User</td>
                    <td className="py-3 px-2">Approved</td>
                    <td className="py-3 px-2">
                      <div className="inline-flex items-center space-x-3">
                        <a href="" title="Edit" className="hover:text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </a>
                        <a
                          href=""
                          title="Edit password"
                          className="hover:text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                            />
                          </svg>
                        </a>
                        <a
                          href=""
                          title="Suspend user"
                          className="hover:text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                            />
                          </svg>
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-2 font-bold">
                      <div className="inline-flex space-x-3 items-center">
                        <span>
                          <img
                            className="rounded-full w-8 h-8"
                            src="https://images.generated.photos/tGiLEDiAbS6NdHAXAjCfpKoW05x2nq70NGmxjxzT5aU/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTM4ODM1LmpwZw.jpg"
                            alt=""
                          />
                        </span>
                        <span>Thai Mei</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">thai.mei@abc.com</td>
                    <td className="py-3 px-2">User</td>
                    <td className="py-3 px-2">Approved</td>
                    <td className="py-3 px-2">
                      <div className="inline-flex items-center space-x-3">
                        <a href="" title="Edit" className="hover:text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </a>
                        <a
                          href=""
                          title="Edit password"
                          className="hover:text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                            />
                          </svg>
                        </a>
                        <a
                          href=""
                          title="Suspend user"
                          className="hover:text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                            />
                          </svg>
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-2 font-bold">
                      <div className="inline-flex space-x-3 items-center">
                        <span>
                          <img
                            className="rounded-full w-8 h-8"
                            src="https://images.generated.photos/niCVbIBAm4hahzwS83HoEtcVEIactkKohOzgXWYY4lM/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NTk4ODczLmpwZw.jpg"
                            alt=""
                          />
                        </span>
                        <span>Marquez Spineli</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">marquez.spineli@cba.com</td>
                    <td className="py-3 px-2">User</td>
                    <td className="py-3 px-2">Approved</td>
                    <td className="py-3 px-2">
                      <div className="inline-flex items-center space-x-3">
                        <a href="" title="Edit" className="hover:text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </a>
                        <a
                          href=""
                          title="Edit password"
                          className="hover:text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                            />
                          </svg>
                        </a>
                        <a
                          href=""
                          title="Suspend user"
                          className="hover:text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                            />
                          </svg>
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-2 font-bold">
                      <div className="inline-flex space-x-3 items-center">
                        <span>
                          <img
                            className="rounded-full w-8 h-8"
                            src="https://images.generated.photos/f_xU7q780YXiKG7IwKVV05eU6Sj2nIodEkN1S8GyM2M/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDk2MTc4LmpwZw.jpg"
                            alt=""
                          />
                        </span>
                        <span>Mark Spike</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">mark.spike@abc.com</td>
                    <td className="py-3 px-2">Administrator</td>
                    <td className="py-3 px-2">Approved</td>
                    <td className="py-3 px-2">
                      <div className="inline-flex items-center space-x-3">
                        <a href="" title="Edit" className="hover:text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </a>
                        <a
                          href=""
                          title="Edit password"
                          className="hover:text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                            />
                          </svg>
                        </a>
                        <a
                          href=""
                          title="Suspend user"
                          className="hover:text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                            />
                          </svg>
                        </a>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

// <div classNameName="min-h-screen w-10/12 mx-auto">
// {/* NavBar */}
// <div classNameName="navbar bg-primary mt-2 rounded-md">
//   <div classNameName="flex-1">
//     <a classNameName="btn btn-ghost normal-case text-xl">daisyUI</a>
//   </div>
//   <div classNameName="flex-none">
//     <button classNameName="btn btn-square btn-ghost">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         classNameName="inline-block w-5 h-5 stroke-current"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
//         ></path>
//       </svg>
//     </button>
//   </div>
// </div>
// {/* Perfil del user */}
// {/* Tiendas del user */}
// <Stores />
// </div>
// <Footer />
