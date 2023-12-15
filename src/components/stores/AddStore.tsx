import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// Intefaces
import { dataStore } from "../../utils/interfaces/store";
// Helpers
import createStore from "../../utils/helpersFetch/stores/createStore";
// Toastify
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
const AddStore = () => {
  const navigate = useNavigate();
  const uid = useSelector((state: RootState) => state.userReducer.user.id);
  const queryClient = useQueryClient();
  const createStoreMutation = useMutation({
    mutationKey: ["create_store"],
    mutationFn: createStore,
    onSuccess(data) {
      if (!data.success) {
        console.error(data);
        toast.error(data.message);
      }
      if (data.success) {
        toast.success(data.message);
        //@ts-ignore
        queryClient.invalidateQueries("stores-owner");
        //@ts-ignore
        queryClient.refetchQueries("stores-owner");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (uid) {
      const newStore: dataStore = {
        // @ts-ignore
        name: e.target[0].value,
        // @ts-ignore
        company_name: e.target[1].value,
        // @ts-ignore
        cuit: e.target[2].value,
        // @ts-ignore
        address: e.target[3].value,
        // @ts-ignore
        city: e.target[4].value,
        // @ts-ignore
        country: e.target[5].value,
        // @ts-ignore
        state: e.target[8].value,
        // @ts-ignore
        zipcode: e.target[11].value,
        owner_id: uid,
      };
      createStoreMutation.mutate(newStore);
    } else {
      toast.error("Falta el id del usuario.");
    }
  };
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className="lg:col-span-2">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
          <div className="md:col-span-5">
            <label>Nombre del local</label>
            <input
              type="text"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-dark"
            />
          </div>

          <div className="md:col-span-3">
            <label>Razon social</label>
            <input
              type="text"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-dark"
            />
          </div>
          <div className="md:col-span-2">
            <label>CUIT</label>
            <input
              type="text"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-dark"
            />
          </div>

          <div className="md:col-span-3">
            <label>Direccion / Calle</label>
            <input
              type="text"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-dark"
            />
          </div>

          <div className="md:col-span-2">
            <label>Ciudad</label>
            <input
              type="text"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-dark"
            />
          </div>

          <div className="md:col-span-2">
            <label>Pais / Region</label>
            <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
              <input
                placeholder="Country"
                className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
              />
              <button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                <svg
                  className="w-4 h-4 mx-2 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <button className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                <svg
                  className="w-4 h-4 mx-2 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <div className="md:col-span-2">
            <label>Estado / Provincia</label>
            <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
              <input
                placeholder="State"
                className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
              />
              <button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                <svg
                  className="w-4 h-4 mx-2 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <button className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                <svg
                  className="w-4 h-4 mx-2 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <div className="md:col-span-1">
            <label>Codigo postal</label>
            <input
              type="text"
              className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-dark"
            />
          </div>

          <div className="md:col-span-5">
            <div className="inline-flex items-center">
              <input
                type="checkbox"
                name="billing_same"
                id="billing_same"
                className="form-checkbox"
              />
              <label className="ml-2">
                Acepto todos los terminos y condiciones.
              </label>
            </div>
          </div>

          <div className="md:col-span-5 text-right">
            <div className="inline-flex items-end">
              <button
                type="submit"
                className="btn btn-secondary btn-sm btn-wide"
              >
                {createStoreMutation.isPending ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Enviar"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddStore;
