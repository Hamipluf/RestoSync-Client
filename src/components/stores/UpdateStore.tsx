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
  const handleSubmit = (e: React.FormEvent) => {
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
            <div className="flex justify-between gap-x-4">
              <div className="flex items-end gap-x-4">
                <h4 className="text-xl text-gray-900 font-bold">
                  Informacion de la empresa
                </h4>
                {edit && (
                  <span className="text-xs font-semibold  text-dark opacity-40 ">
                    Complete solo los campos a actualizar.
                  </span>
                )}
              </div>
              {!edit ? (
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
              ) : (
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
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="mt-2 text-gray-700"
            >
              <div className="flex border-y py-2">
                <span className="font-bold w-24">Nombre:</span>
                {edit ? (
                  <input
                    type="text"
                    placeholder={store?.name}
                    className="input input-bordered input-xs text-light"
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
              <div className="flex justify-end">
                {edit && (
                  <button
                    type="submit"
                    disabled={updateStoreMutation.isPending}
                    className="mt-4 btn btn-success btn-sm"
                  >
                    {updateStoreMutation.isPending ? (
                      <>
                        <span className="loading loading-ring loading-lg"></span>
                      </>
                    ) : (
                      <>Actualizar</>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateStore;
