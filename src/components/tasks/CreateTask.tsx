import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// Helpers
import createTask from "../../utils/helpersFetch/tasks/createTask";
// Interfaces
import { createTask as createTaskInterface } from "../../utils/interfaces/tasks";

const CreateTask = () => {
  const queryClient: any = useQueryClient();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      if (!data.success) {
        setError(data.message);
        console.error(data.message);
        setTimeout(() => {
          setError(undefined);
        }, 2000);
      }
      if (data.success) {
        setSuccess(data.message);
        //@ts-ignore
        queryClient.invalidateQueries("tasks");
        setTimeout(() => {
          setSuccess(undefined);
          // @ts-ignore
          document.getElementById("my_modal_create_task").close();
        }, 2000);
      }
    },
  });
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const uid = localStorage.getItem("uid");
    if (uid) {
      const task: createTaskInterface = {
        // @ts-ignore
        name: e.target[0].value,
        user_id: parseInt(uid),
      };

      createTaskMutation.mutate(task);
    } else {
      console.error("user_id is required");
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
          {createTaskMutation.isError && (
            <>
              <div className="alert alert-error w-10/12 text-sm text-dark">
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
            {error && (
              <>
                <div role="alert" className="alert alert-error">
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
                <div role="alert" className="alert alert-success">
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
          </form>
        </div>
      </dialog>
    </>
  );
};

export default CreateTask;
