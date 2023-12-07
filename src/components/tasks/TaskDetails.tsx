import React from "react";
// Interface
import { RootState } from "../../redux/store";
// Componentes
import NoteByTaskId from "../notes/NoteByTaskId";
import CreateNote from "../notes/AddNoteToTask";
import DeleteTask from "./DeleteTask";
import UpdateTask from "./UpdateTask";
// Redux
import { useAppDispatch } from "../../redux/hooks";
import { invalidateTask } from "../../redux/actions/taskSlice";
import { useSelector } from "react-redux";

const taskDetails: React.FC = () => {
  const task = useSelector((state: RootState) => state.taskReducer.task);
  const dispatch = useAppDispatch();
  const formatedCreated =
    task.created_at && new Date(task.created_at).toLocaleString();
  const formatedUpdated =
    task.updated_at && new Date(task.updated_at).toLocaleString();

  return (
    <>
      {task.id && (
        <>
          <div className="m-2 flex  gap-4">
            <h2 className="text-2xl text-dark font-bold bg-slate-300 p-1 rounded-lg ">
              {task?.name}
            </h2>
            {/* Agregar nota */}
            {task?.id && <CreateNote tid={task?.id} />}
          </div>
          {task?.id && <NoteByTaskId tid={task?.id} />}
          <div className="grid grid-cols-2">
            <div className="">
              <p className="text-midLigth opacity-50">
                Creado: {formatedCreated}
              </p>
              {task.updated_at && (
                <p className="text-midLigth opacity-50">
                  Creado:{formatedUpdated}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-x-2 mx-4">
              {task?.id && <UpdateTask tid={task?.id} />}
              {/* Eliminar la nota */}
              {task?.id && <DeleteTask tid={task?.id} />}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default taskDetails;
