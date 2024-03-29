import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// Components
import Footer from "../components/layout/Footer";
import ProfileUser from "../components/dashboard/ProfileUser";
import AllProductsOfStore from "../components/products/AllProductsOfStore";
import UpdateProduct from "../components/products/UpdateProduct";
import DeleteEmployee from "../components/employees/DeleteEmployee";
import UpdateEmployee from "../components/employees/UpdateEmployee";
import AddEmployeesOfStore from "../components/employees/AddEmployeesOfStore";
import AddProductToStore from "../components/products/AddProductToStore";

// Helpers
import getStoreOfUser from "../utils/helpersFetch/stores/getStoresOfUser";
import getAllEmployeesOfStore from "../utils/helpersFetch/stores/getAllEmployeesOfStore";
// Redux
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
// Toast
import { ToastContainer } from "react-toastify";
// Interfaces
import { employee } from "../utils/interfaces/employees";

const Dashboard = () => {
  const [emp, setEmp] = useState<employee | undefined>();
  const user = useSelector((state: RootState) => state.userReducer.user);
  const modal = document?.getElementById(
    "my_modal_update_employee"
  ) as HTMLDialogElement;
  const product = useSelector(
    (state: RootState) => state.productReducer.product
  );
  const storeData = useQuery({
    queryKey: ["stores-owner", user.id],
    queryFn: getStoreOfUser,
  });
  const sid: number | undefined = storeData?.data?.data.id;
  const employeeData = useQuery({
    queryKey: ["employee-store", sid],
    queryFn: getAllEmployeesOfStore,
  });

  const handleUpdateEmployee = (empolyee: employee) => {
    setEmp(empolyee);
    modal.showModal();
  };

  return (
    <>
      <div className="antialiasedv w-full min-h-screen text-slate-300 relative py-4">
        <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
          {/* Profile user */}

          <ProfileUser />
          <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
            <div id="24h">
              <div className="flex gap-x-4 items-center justify-items-center">
                <h1 className="font-bold py-4 uppercase">
                  Datos de la empresa.
                </h1>
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
                              <td>{user.email}</td>
                              <td>{user.name}</td>
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
              <div className="flex gap-x-3 items-center">
                <h1 className="font-bold py-4 uppercase">Productos</h1>
                {storeData && sid && <AddProductToStore sid={sid} />}
              </div>

              <div className="grid grid-cols-3 gap-4 w-full">
                <div className="col-span-2">
                  <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                      {storeData.data && (
                        <AllProductsOfStore sid={storeData.data?.data.id} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="card bg-base-100 h-full shadow-xl">
                    <div className="flex items-center justify-between">
                      <h2 className="card-title bg-secondary rounded-r-lg max-w-fit m-2 px-2 ">
                        Producto
                      </h2>
                      <div className="mr-4">
                        <UpdateProduct />
                      </div>
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
              <div className="flex gap-2 items-center">
                <h1 className="font-bold py-4 uppercase">Empleados</h1>
                {storeData.data && (
                  <AddEmployeesOfStore store={storeData.data?.data} />
                )}
              </div>
              <div className="overflow-auto h-60 w-full scroll-bar">
                <table className="w-full whitespace-nowrap">
                  <thead className="bg-black/60">
                    <th className="text-left py-3 px-2">Nombre</th>
                    <th className="text-left py-3 px-2">Disponibilidad</th>
                    <th className="text-left py-3 px-2">Rol</th>
                    <th className="text-left py-3 px-2 rounded-r-lg">
                      Actions
                    </th>
                  </thead>
                  {employeeData.isLoading ? (
                    <>
                      <tr className="">
                        <th className="skeleton h-8 mx-2"></th>
                        <td className="skeleton h-8 mx-2"> </td>
                        <td className="skeleton h-8 mx-2"> </td>
                        <td className="skeleton h-8 mx-2"> </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      {employeeData.data?.success ? (
                        <>
                          {employeeData.data?.data.map((employee: employee) => {
                            return (
                              <>
                                <tr
                                  key={employee.id}
                                  className="border-b border-gray-700"
                                >
                                  <td className="py-3 px-2 font-bold">
                                    <div className="inline-flex space-x-3 items-center">
                                      <span>{employee.name}</span>
                                    </div>
                                  </td>
                                  <td className="py-3 px-2">null</td>
                                  <td className="py-3 px-2">{employee.role}</td>
                                  <td className="py-3 px-2">
                                    <div className="inline-flex items-center space-x-3">
                                      {modal ? (
                                        <button
                                          onClick={() => {
                                            handleUpdateEmployee(employee);
                                          }}
                                          className="hover:bg-primary p-1 rounded-lg"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                            />
                                          </svg>
                                        </button>
                                      ) : (
                                        <div className="flex flex-col gap-4 w-5">
                                          <div className="skeleton h-4"></div>
                                        </div>
                                      )}
                                      <DeleteEmployee eid={employee.id} />
                                    </div>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          <p className="text-xl text-error m-4">
                            {employeeData.data?.message}
                          </p>
                        </>
                      )}
                    </>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <dialog id="my_modal_update_employee" className="modal">
        <div className="modal-box">
          {emp && <UpdateEmployee employee={emp} />}
        </div>
      </dialog>
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

export default Dashboard;
