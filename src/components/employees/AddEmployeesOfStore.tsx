import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// Helpers
import addEmployeesToStore from "../../utils/helpersFetch/employees/addEmployeesToStore";
// Interfaces
import { store } from "../../utils/interfaces/store";
// Toast
import { toast } from "react-toastify";

const AddEmployeesOfStore: React.FC<{
  store: store;
}> = ({ store }) => {
  const queryClient = useQueryClient();
  const addEmployeeMutation = useMutation({
    mutationKey: ["add_employee"],
    mutationFn: addEmployeesToStore,
    onSuccess(data) {
      if (!data.success) {
        console.error(data.message);
        toast.error(data.message);
      }
      toast.success(data.message);
      // @ts-ignore
      queryClient.invalidateQueries("employee-store");
      // @ts-ignore
      queryClient.refetchQueries("employee-store");
      // @ts-ignore
      document.getElementById("my_modal_add_employee").close();
    },
  });

  const handleSubmtit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmployee = {
      // @ts-ignore
      name: e.target[0].value,
      // @ts-ignore
      role: e.target[1].value,

      store_id: store.id,
    };
    addEmployeeMutation.mutate(newEmployee);
  };
  return (
    <>
      <button
        className="btn btn-info btn-square btn-sm"
        onClick={() =>
          // @ts-ignore
          document.getElementById("my_modal_add_employee").showModal()
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-square-rounded-plus"
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
          <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
          <path d="M15 12h-6" />
          <path d="M12 9v6" />
        </svg>
      </button>
      <dialog id="my_modal_add_employee" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div>
            <h1 className=" font-bold text-3xl flex gap-1 items-baseline font-mono">
              Agregar empleado
              <span className="text-sm text-accent">{store?.name}</span>
            </h1>

            <form
              onSubmit={(e) => handleSubmtit(e)}
              className="w-full mt-1 grid grid-cols-1 rounded-md border-t-4 border-info"
            >
              <div className="flex gap-4">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">
                      Nombre <span className="text-error text-xl">*</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="..."
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">
                      Rol <span className="text-error text-xl">*</span>
                    </span>
                  </label>
                  <select required className="select select-bordered select-sm">
                    <option disabled selected>
                      Seleccionar
                    </option>
                    <option>camarero</option>
                    <option>barista</option>
                    <option>encargado</option>
                    <option>cajero</option>
                    <option>cocina</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={addEmployeeMutation.isPending}
                className="mt-4 btn btn-success btn-wide text-lg justify-self-center"
              >
                {addEmployeeMutation.isPending ? (
                  <>
                    <span className="loading loading-ring loading-lg"></span>
                  </>
                ) : (
                  <>Agregar</>
                )}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AddEmployeesOfStore;
