import React from "react";
// Interface

// Componentes
import NoteById from "../notes/NoteById";
import CreateNote from "../notes/AddNoteToTask";
// Redux
import { useAppDispatch } from "../../redux/hooks";
import { invalidateNote } from "../../redux/actions/noteSlice";
import DeleteTask from "./DeleteTask";
import { invalidateTask } from "../../redux/actions/taskSlice";
import UpdateTask from "./UpdateTask";

interface taskDetailInterface {
  id?: number;
  name?: string;
  created_at?: Date;
  user_id?: number;
  is_completed?: boolean;
  updated_at?: Date;
}

const taskDetails: React.FC<{
  task: taskDetailInterface | undefined;
}> = ({ task }) => {
  const dispatch = useAppDispatch();
  console.log(task);
  return (
    <>
      <div className="modal-box">
        <form onSubmit={() => dispatch(invalidateTask())} method="dialog">
          <button
            onClick={() => dispatch(invalidateNote())}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <div className="card card-compact ">
          <div className="card-body">
            <div className="grid grid-cols-2 items-start">
              <div className="grid grid-cols-1">
                <h2 className="card-title text-2xl p-2 text-dark font-bold bg-slate-300 max-w-max rounded-md">
                  {task?.name}
                </h2>
                <div className="form-control mx-4">
                  <span className="label-text">Terminada</span>
                  {task?.is_completed ? "✔" : "❌"}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-y-5 mx-4">
                {/* Agregar nota */}
                {task?.id && <CreateNote tid={task?.id} />}
              </div>
            </div>
            {task?.id && <NoteById tid={task?.id} />}
            <div className="grid grid-cols-2">
              <div>
                <p className="text-midLigth opacity-50">
                  Creado:{" "}
                  <span className="text-light">
                    {task?.created_at?.toString()}
                  </span>
                </p>
                <p className="text-midLigth opacity-50">
                  Editado:
                  <span className="text-light">
                    {task?.updated_at?.toString()}
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-x-2 mx-4">
                {task?.id && <UpdateTask tid={task?.id} />}
                {/* Eliminar la nota */}
                {task?.id && <DeleteTask tid={task?.id} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default taskDetails;
