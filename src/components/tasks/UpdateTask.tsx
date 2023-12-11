import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
// Helpers
import updatedTask from "../../utils/helpersFetch/tasks/updateTask";
// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setTask } from "../../redux/actions/taskSlice";
import { useAppDispatch } from "../../redux/hooks";
// Toast
import { toast } from "react-toastify";

const UpdateTask: React.FC<{
  tid: number;
}> = ({ tid }) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const task = useSelector((state: RootState) => state.taskReducer.task);
  const [nameState, setName] = useState<string | undefined>(task?.name);
  const [is_completedState, setIs_completed] = useState<boolean | undefined>(
    task?.is_completed
  );
  const updateTaskMutation = useMutation({
    mutationFn: updatedTask,
    onSuccess: (data) => {
      if (!data.success) {
        console.error(data.message);
        toast.error(data.message);
      }
      toast.success(data.message);
      dispatch(setTask(data?.data));
      //@ts-ignore
      queryClient.invalidateQueries("tasks");
      // @ts-ignore
      queryClient.refetchQueries("tasks");
      // @ts-ignore
      document.getElementById("my_modal_update_task").close();
    },
  });
  const handleUpdateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameState && is_completedState !== undefined) {
      const updateData = {
        task_id: tid,
        name: nameState,
        is_completed: is_completedState,
      };
      updateTaskMutation.mutate(updateData);
    } else {
      toast.error("Faltan campos a completar.");
    }
  };
  return (
    <>
      <button
        onClick={() =>
          // @ts-ignore
          document.getElementById("my_modal_update_task").showModal()
        }
        className="btn btn-success font-semibold btn-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-edit-circle"
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
          <path d="M12 15l8.385 -8.415a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3z" />
          <path d="M16 5l3 3" />
          <path d="M9 7.07a7 7 0 0 0 1 13.93a7 7 0 0 0 6.929 -6" />
        </svg>
      </button>
      <dialog id="my_modal_update_task" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={(e) => handleUpdateTask(e)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Nombre</span>
              </label>
              <input
                type="text"
                placeholder={task?.name}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Completada</span>
                <input
                  type="checkbox"
                  checked={is_completedState}
                  className="checkbox"
                  onChange={(e) => setIs_completed(e.target.checked)}
                />
              </label>
            </div>
            <button
              disabled={updateTaskMutation.isPending}
              type="submit"
              className="btn btn-wide btn-primary"
            >
              {updateTaskMutation.isPending ? (
                <>
                  <span className="loading loading-ring loading-md"></span>
                </>
              ) : (
                <>Actualizar</>
              )}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default UpdateTask;
