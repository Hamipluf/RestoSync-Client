import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// Interfaces
import {
  dataStore,
  store,
  updateStore as updateStoreInterface,
} from "../../utils/interfaces";
// Helpers
import updateStore from "../../utils/helpersFetch/stores/updateStore";

const UpdateStore: React.FC<{
  store: store;
}> = ({ store }) => {
  const queryClient = useQueryClient();
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
      <button
        onClick={() =>
          //   @ts-ignore
          document.getElementById("my_modal_update_store").showModal()
        }
        className="btn btn-info btn-xs"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-edit"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width={2}
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
          <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
          <path d="M16 5l3 3" />
        </svg>
      </button>
      <dialog id="my_modal_update_store" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div>
            <h1 className=" font-bold text-3xl flex gap-1 items-baseline font-mono">
              Actualizar Datos
              <span className="text-sm text-accent">{store.name}</span>
            </h1>
            <span className="text-xs font-semibold text-midLigth opacity-40 ">Complete solo los campos a actualizar.</span>
            <form
              onSubmit={(e) => handleSubmtit(e)}
              className="w-full mt-1 grid grid-cols-1 rounded-md border-t-4 border-info"
            >
              <div className="flex gap-4">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Nombre del local</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Razon Social</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
              </div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Direccion</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">CUIT</span>
                </div>
                <input
                  type="text"
                  placeholder="12-12345678-9"
                  onChange={(e) => handleInputChange(e)}
                  className={`input w-full max-w-xs ${
                    validCuit ? "input-bordered" : "input-error"
                  }`}
                />
              </label>

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
      </dialog>
    </>
  );
};

export default UpdateStore;
