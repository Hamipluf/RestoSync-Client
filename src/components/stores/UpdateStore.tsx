import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// Interfaces
import {
  store,
  updateStore as updateStoreInterface,
} from "../../utils/interfaces/store";
// Helpers
import updateStore from "../../utils/helpersFetch/stores/updateStore";

const UpdateStore: React.FC<{
  store: store;
}> = ({ store }) => {
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(false);

  const [validCuit, setValidCuit] = useState(true);
  const handleInputChange = (e: React.FormEvent) => {
    // @ts-ignore
    const inputValue = e.target.value;
    // Expresión regular para validar un CUIT argentino
    const cuitRegex = /^\d{2}-\d{8}-\d{1}$/;

    if (cuitRegex.test(inputValue)) {
      setValidCuit(true);
      console.error("Ingrese un CUIT válido (Ejemplo: 12-34567890-1)");
    } else {
      setValidCuit(false);
    }
  };
  const updateStoreMutation = useMutation({
    mutationFn: updateStore,
    onSuccess: (data) => {
      if (!data.success) {
        console.error(data.message);
      }
      //@ts-ignore
      queryClient.invalidateQueries("stores-owner");
      //@ts-ignore
      queryClient.refetchQueries("stores-owner");
      // @ts-ignore
      document.getElementById("my_modal_update_store").close();
    },
  });
  const handleSubmtit = (e: React.FormEvent) => {
    e.preventDefault();
    const updateDataStore: updateStoreInterface = {
      // @ts-ignore
      name: e.target[0].value ? e.target[0].value : store.name,
      // @ts-ignore
      company_name: e.target[1].value ? e.target[1].value : store.company_name,
      // @ts-ignore
      address: e.target[2].value ? e.target[2].value : store.address,
      // @ts-ignore
      cuit: e.target[3].value ? e.target[3].value : store.cuit,
      owner_id: store.owner_id,
      sid: store.id,
    };
    updateStoreMutation.mutate(updateDataStore);
  };
  return (
    <>
      <div>
        <div className="w-full flex flex-col 2xl:w-1/3">
          <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
            <div className="flex items-end gap-x-4">
              <h4 className="text-xl text-gray-900 font-bold">
                Informacion de la empresa
              </h4>
              <span className="text-xs font-semibold  text-dark opacity-40 ">
                Complete solo los campos a actualizar.
              </span>
              <button
                onClick={() => setEdit(!edit)}
                className="btn btn-blue-600 btn-sm text-gray-100 text-sm space-x-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-building-store "
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 21l18 0" />
                  <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
                  <path d="M5 21l0 -10.15" />
                  <path d="M19 21l0 -10.15" />
                  <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
                </svg>
                <span>Editar Empresa</span>
              </button>
            </div>
            <form className="mt-2 text-gray-700">
              <div className="flex border-y py-2">
                <span className="font-bold w-24">Nombre:</span>
                {edit ? (
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                  />
                ) : (
                  <span className="text-gray-700">{store?.name}</span>
                )}
              </div>
              <div className="flex border-y py-3">
                <span className="font-bold w-24">Razon Social:</span>
                {edit ? (
                  <input
                    className="input input-bordered input-primary input-sm"
                    type="text"
                    placeholder={store?.company_name}
                  />
                ) : (
                  <span className="text-gray-700">{store?.company_name}</span>
                )}
              </div>

              <div className="flex border-b py-3">
                <span className="font-bold w-24">CUIT:</span>
                {edit ? (
                  <input
                    type="text"
                    placeholder="12-12345678-9"
                    onChange={(e) => handleInputChange(e)}
                    className={`input w-full max-w-xs ${
                      validCuit ? "input-bordered" : "input-error"
                    }`}
                  />
                ) : (
                  <span className="text-gray-700">{store?.cuit}</span>
                )}
              </div>
              <div className="flex flex-wrap gap-5">
                <div className="flex border-b py-3">
                  <span className="font-bold w-24">Direccion:</span>
                  {edit ? (
                    <input
                      className="input input-bordered input-primary input-sm"
                      type="text"
                      placeholder={store?.address}
                    />
                  ) : (
                    <span className="text-gray-700">{store?.address}</span>
                  )}
                </div>
                <div className="flex border-b py-3">
                  <span className="font-bold w-24">Ciudad:</span>
                  {edit ? (
                    <input
                      className="input input-bordered input-primary input-sm"
                      type="text"
                      placeholder={store?.city}
                    />
                  ) : (
                    <span className="text-gray-700">{store?.city}</span>
                  )}
                </div>
                <div className="flex border-b py-3">
                  <span className="font-bold w-24">Pais:</span>
                  {edit ? (
                    <input
                      className="input input-bordered input-primary input-sm"
                      type="text"
                      placeholder={store?.country}
                    />
                  ) : (
                    <span className="text-gray-700">{store?.country}</span>
                  )}
                </div>
                <div className="flex border-b py-3">
                  <span className="font-bold w-24">Locacion</span>
                  {edit ? (
                    <input
                      className="input input-bordered input-primary input-sm"
                      type="text"
                      placeholder={store?.state}
                    />
                  ) : (
                    <span className="text-gray-700">{store?.state}</span>
                  )}
                </div>
                <div className="flex border-b py-3">
                  <span className="font-bold w-24">Codigo postal:</span>
                  {edit ? (
                    <input
                      className="input input-bordered input-primary input-sm"
                      type="text"
                      placeholder={store?.zipcode}
                    />
                  ) : (
                    <span className="text-gray-700">{store?.zipcode}</span>
                  )}
                </div>
              </div>
              <button
                type="submit"
                disabled={updateStoreMutation.isPending}
                className="mt-4 btn btn-success btn-wide text-lg justify-self-center"
              >
                {updateStoreMutation.isPending ? (
                  <>
                    <span className="loading loading-ring loading-lg"></span>
                  </>
                ) : (
                  <>Actualizar</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateStore;
