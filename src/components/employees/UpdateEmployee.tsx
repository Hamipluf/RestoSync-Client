import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// Interface
import { dataUpdateEmployee, employee } from "../../utils/interfaces/employees";
// Helpers
import updateEmployee from "../../utils/helpersFetch/employees/updateEmployee";
// Toast notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateEmployee: React.FC<{ employee: employee }> = ({ employee }) => {
  const queryClient = useQueryClient();

  const updateEmployeeMutation = useMutation({
    mutationFn: updateEmployee,

    onSettled: (data) => {
      if (!data?.success) {
        console.error(data?.message);

        toast.error(data?.message);
      } else {
        //@ts-ignore
        queryClient.invalidateQueries("employee-store");
        //@ts-ignore
        queryClient.refetchQueries("employee-store");
        // @ts-ignore
        document.getElementById("my_modal_update_employee").close();
      }
    },
  });
  const handleSubmtit = (e: React.FormEvent) => {
    e.preventDefault();
    const updateDataEmployee: dataUpdateEmployee = {
      eid: employee.id,
      // @ts-ignore
      name: e.target[0].value ? e.target[0].value : employee.name,
      // @ts-ignore
      role: e.target[1].value ? e.target[1].value : employee.role,
      // @ts-ignore
      disponibility: e.target[2].value
        ? // @ts-ignore
          e.target[2].value
        : employee.disponibility,
      // @ts-ignore
      store_id: employee.store_id,
    };
    updateEmployeeMutation.mutate(updateDataEmployee);
  };
  return (
    <>
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <div>
        <h1 className=" font-bold text-3xl flex gap-1 items-baseline font-mono">
          Actualizar empleado
          <span className="text-sm text-accent">{employee.name}</span>
        </h1>
        <span className="text-xs font-semibold text-midLigth opacity-40 ">
          Complete solo los campos a actualizar.
        </span>
        <form
          onSubmit={(e) => handleSubmtit(e)}
          className="w-full mt-1 grid grid-cols-1 justify-items-center rounded-md border-t-4 border-info"
        >
          <div className="flex gap-4">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Nombre</span>
              </div>
              <input
                type="text"
                placeholder="..."
                className="input input-bordered w-full input-sm"
              />
            </label>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Rol</span>
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
            disabled={updateEmployeeMutation.isPending}
            className="mt-4 btn btn-success btn-wide text-lg justify-self-center"
          >
            {updateEmployeeMutation.isPending ? (
              <>
                <span className="loading loading-ring loading-lg"></span>
              </>
            ) : (
              <>Actualizar</>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateEmployee;
