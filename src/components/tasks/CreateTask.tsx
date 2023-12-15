import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
// Helpers
import createTask from "../../utils/helpersFetch/tasks/createTask";
// Interfaces
import { createTask as createTaskInterface } from "../../utils/interfaces/tasks";
// Toastify
import { toast } from "react-toastify";
const CreateTask = () => {
  const queryClient: any = useQueryClient();
  const uid = useSelector((state: RootState) => state.userReducer.user.id);

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.message);
        console.error(data.message);
      }
      if (data.success) {
        toast.success(data.message);
        //@ts-ignore
        queryClient.invalidateQueries("tasks");
        //@ts-ignore
        document.getElementById("my_modal_create_task").close();
      }
    },
  });
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (uid) {
      const task: createTaskInterface = {
        // @ts-ignore
        name: e.target[0].value,
        user_id: parseInt(uid),
      };

      createTaskMutation.mutate(task);
    } else {
      toast.error("No se pudo crear la tarea");
      console.error("No se encuantra el user_id");
    }
  };
  return (
    <>
      <button
        onClick={() => {
          //@ts-ignore
          document.getElementById("my_modal_create_task").showModal();
        }}
        className="btn btn-info btn-sm"
      >
        Tarea
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-plus my-auto"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M12 5l0 14"></path>
          <path d="M5 12l14 0"></path>
        </svg>
      </button>

      <dialog id="my_modal_create_task" className="modal">
        <div className="modal-box ">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form
            method="dialog"
            className="grid grid-cols-1 items-center justify-items-center gap-y-5 modal-backdrop"
            onSubmit={(e) => handleAddTask(e)}
          >
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Nombre de la tarea</span>
              </label>
              <input
                type="text"
                placeholder="Titulo"
                className="input input-bordered w-full text-light"
              />
            </div>

            <button
              type="submit"
              disabled={createTaskMutation.isPending}
              className="btn btn-primary btn-wide mt-4"
            >
              {createTaskMutation.isPending ? (
                <>
                  <span className="loading loading-ring loading-md"></span>
                </>
              ) : (
                <>Agregar tarea</>
              )}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default CreateTask;
