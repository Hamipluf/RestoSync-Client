import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// Intefaces
import { dataStore, store } from "../../utils/interfaces";
// Helpers
import createStore from "../../utils/helpersFetch/stores/createStore";

const AddStore = () => {
  const queryClient: any = useQueryClient();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const createStoreMutation = useMutation({
    mutationKey: ["create_store"],
    mutationFn: createStore,
    onSuccess(data) {
      if (!data.success) {
        setError(data.message);
        setTimeout(() => setError(undefined), 3000);
      }
      if (data.success) {
        setSuccess(data.message);
        queryClient.invalidateQueries("stores-owner")
        setTimeout(() => setSuccess(undefined), 3000);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    const uid: string | null = localStorage.getItem("uid");
    if (!uid) {
      setError("Falta el id del usuario.");
    }
    e.preventDefault();
    const newStore: dataStore = {
      // @ts-ignore
      company_name: e.target[0].value,
      // @ts-ignore

      name: e.target[1].value,
      // @ts-ignore

      address: e.target[2].value,
      // @ts-ignore

      cuit: e.target[3].value,

      owner_id: uid,
    };
    console.log(newStore);
    createStoreMutation.mutate(newStore);
  };
  return (
    <>
      <div className="flex gap-4 ">
        <button
          className="btn btn-wide btn-primary mt-4 "
          // @ts-ignore
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Create Store
        </button>
        {error && (
          <>
            <div className="alert alert-error w-10/12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          </>
        )}
        {success && (
          <>
            <div className="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{success}</span>
            </div>
          </>
        )}
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box m-4">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <form
            className="grid grid-cols-1 items-center justify-items-center"
            onSubmit={(e) => {
              // @ts-ignore
              handleSubmit(e), document.getElementById("my_modal_1").close();
            }}
          >
            {/* company_name */}
            <div className="form-control w-full max-w-xs text-light">
              <label className="label">
                <span className="label-text text-lg">Razon Social</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs text-sm"
              />
            </div>
            {/* name */}
            <div className="form-control w-full max-w-xs text-light">
              <label className="label">
                <span className="label-text text-lg">Nombre de la tienda</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs text-sm"
              />
            </div>
            {/* address */}
            <div className="form-control w-full max-w-xs text-light">
              <label className="label">
                <span className="label-text text-lg">Direccion</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs text-sm"
              />
            </div>
            {/* cuit */}
            <div className="form-control w-full max-w-xs text-light">
              <label className="label">
                <span className="label-text text-lg">CUIT</span>
              </label>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs text-sm"
              />
            </div>
            <button type="submit" className="btn btn-wide btn-primary my-4">
              Crear
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AddStore;
