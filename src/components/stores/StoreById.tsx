import React from "react";
// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAppDispatch } from "../../redux/hooks";
import { invalidateStore } from "../../redux/actions/storeSlice";
import { setVisibleProducts } from "../../redux/actions/productsSlice";

const StoreById = () => {
  const store = useSelector((state: RootState) => state.storeReducer.store);
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="card w-96 bg-primary mx-4 shadow-xl">
        <button
          onClick={() => dispatch(invalidateStore())}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>

        <div className="card-body">
          <div className="flex justify-between items-center gap-4 m-2">
            <h2 className="card-title bg-slate-200 max-w-fit px-4 py-1 rounded-r-lg text-dark">
              {store.company_name}
            </h2>
            <div className="flex gap-x-2">
              <button className="btn btn-error btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-trash"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </button>
              <button className="btn btn-square btn-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-edit-circle"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 15l8.385 -8.415a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3z" />
                  <path d="M16 5l3 3" />
                  <path d="M9 7.07a7 7 0 0 0 1 13.93a7 7 0 0 0 6.929 -6" />
                </svg>
              </button>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <p>Nombre: {store.name}</p>
              <p>Direccion: {store.address}</p>
              <p>CUIT: {store.cuit}</p>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <button
              className="btn btn-warning"
              onClick={() => dispatch(setVisibleProducts())}
            >
              Productos
            </button>
            <button className="btn btn-info">Empleados</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreById;
