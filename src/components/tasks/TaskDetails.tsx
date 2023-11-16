import React from "react";
// Interface
import { task } from "../../utils/interfaces";
// Componentes
import ListComments from "../comments/ListComments";

const taskDetails: React.FC<{
  task: task;
  setTask: React.Dispatch<React.SetStateAction<task | undefined>>;
}> = ({ task, setTask }) => {
  return (
    <>
      <div className="modal-box">
        <form onSubmit={() => setTask(undefined)} method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="card card-compact ">
          <div className="card-body">
            <div className="grid grid-cols-2 items-start">
              <div className="grid grid-cols-1">
                <h2 className="card-title text-2xl p-2 text-dark font-bold bg-slate-300 max-w-max  rounded-md">
                  {task?.name}
                </h2>
                <div className="form-control mx-4">
                  <label className="label cursor-pointer">
                    <span className="label-text">Terminada</span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-y-5 mx-4">
                <button className="btn btn-success font-semibold btn-xs">
                  Agregar nota
                </button>
                <button className="btn btn-warning font-semibold btn-xs">
                  Eliminar nota
                </button>
              </div>
            </div>
            <ListComments nid={task.id} />
            <div className="grid grid-cols-2">
              <p className="text-midLigth opacity-50">
                Creado: {task?.created_at.toString()}
              </p>
              <div className="grid grid-cols-2 gap-x-2 mx-4">
                <button className="btn btn-success font-semibold btn-sm">
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
                <button className="btn btn-warning font-semibold btn-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-trash"
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
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default taskDetails;
