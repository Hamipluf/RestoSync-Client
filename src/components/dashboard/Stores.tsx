import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// Helpers
import getStoreOfUser from "../../utils/helpersFetch/stores/getStoresOfUser";
// Components
import AddStore from "../stores/AddStore";
import AddEmployeesOfStore from "../stores/AddEmployeesOfStore";
import EmployeesOfStore from "../stores/EmployeesOfStore";
// Interfaces
import { store } from "../../utils/interfaces";
// Redux
import { useAppDispatch } from "../../redux/hooks";
import { setStore } from "../../redux/actions/storeSlice";
import StoreById from "../stores/StoreById";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
const Stores = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useQuery({
    queryKey: ["stores-owner"],
    queryFn: getStoreOfUser,
  });
  const store = useSelector((state: RootState) => state.storeReducer.store);

  return (
    <>
      <div className="m-5">
        <div className="">
          <div className="flex flex-col justify-start w-full">
            <h2 className="text-xl font-bold text-light">Tiendas</h2>
            <AddStore />
          </div>
          <div className="divider"></div>
          {isLoading ? (
            <>
              <span className="loading loading-ring loading-lg"></span>
            </>
          ) : (
            <div className="carousel rounded-box w-full">
              {data &&
                data.data.map((store) => {
                  return (
                    <div key={store.id} className="carousel-item">
                      <div className="card w-96 bg-primary mx-4 shadow-xl">
                        <div className="card-body">
                          <h2 className="card-title">{store.company_name}</h2>
                          <p>Nombre: {store.name}</p>
                          <p>Direccion: {store.address}</p>
                          <p>CUIT: {store.cuit}</p>
                          <button
                            className="btn btn-wide mx-auto mt-2"
                            onClick={() => dispatch(setStore(store))}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-info-circle"
                              width="30"
                              height="30"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              ></path>
                              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                              <path d="M12 9h.01"></path>
                              <path d="M11 12h1v4h1"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
      {store?.id && <StoreById />}
    </>
  );
};

export default Stores;
