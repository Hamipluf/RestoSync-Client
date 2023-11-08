import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// Helpers
import addEmployeesToStore from "../../utils/helpersFetch/stores/addEmployeesToStore";

const AddEmployeesOfStore = (store_id: number) => {
  const [error, setError] = useState<string | undefined>();
  const addEmployeeMutation = useMutation({
    mutationKey: ["add_employee"],
    mutationFn: addEmployeesToStore,
  });
  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    const user_id = parseInt(e.target[0].value);
    if (!user_id || !store_id) {
      setError("Faltan datos.");
    }
    const newEmployee = {
      user_id,
      store_id,
    };
    addEmployeeMutation.mutate(newEmployee);
  };
  return (
    <>
      <button
        className="btn btn-info"
        // @ts-ignore
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        Asignar empleados
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <form onSubmit={() => handleAddEmployee(e)}>
            <div className="form-control w-full max-w-xs text-light font-bold">
              <label className="label">
                <span className="label-text text-lg">
                  Id del user a asignar
                </span>
              </label>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AddEmployeesOfStore;
