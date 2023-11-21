import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
// Helpers fetchers
import getTaskOfUser from "../../utils/helpersFetch/tasks/getTaskUser.ts";
// Components
import TaskDetails from "./TaskDetails.tsx";
import CreateTask from "./CreateTask.tsx";
// Redux
import Notes from "../notes/Notes.tsx";
import { RootState } from "../../redux/store.ts";
import { useSelector } from "react-redux";
import { selectNote } from "../../redux/actions/noteSlice.ts";
import { useAppDispatch } from "../../redux/hooks.ts";
import { setTask } from "../../redux/actions/taskSlice.ts";
// Intefaces
import { note, responseTaskOfUser, task } from "../../utils/interfaces.ts";

function Tasks() {
  const dispatch = useAppDispatch();

  const task = useSelector((state: RootState) => state.taskReducer.task);
  const note = useSelector((state: RootState) => state.noteReducer.note);
  const {
    data,
    isError,
  }: { data: responseTaskOfUser | undefined; isError: ConstrainBoolean } =
    useQuery<responseTaskOfUser, Error>({
      queryKey: ["tasks"],
      queryFn: getTaskOfUser,
    });

  return (
    <>
      <div className="grid grid-cols-1 justify-items-center">
        <div className="text-xl text-light grid grid-cols-3 gap-x-5 ">
          <h3 className="text-xl font-semibold text-light bg-slate-950 px-4 rounded-md col-span-2">
            Tareas
          </h3>
          <CreateTask />
        </div>
        {isError && (
          <>
            <div className="alert alert-error w-10/12 text-sm m-5 text-dark">
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
              <span>Error... {isError}</span>
            </div>
          </>
        )}
        <div className="carousel rounded-box w-10/12 bg-slate-700 my-4 shadow-xl ">
          {data &&
            data.data?.map((tk: task) => {
              return (
                <>
                  <div key={tk.id} className="carousel-item m-4 ">
                    <div className="card card-compact w-96 bg-primary ">
                      <div className="card-body">
                        <h2 className="card-title text-light">{tk.name}</h2>
                        <div
                          onClick={() => {
                            //@ts-ignore
                            document.getElementById("my_modal_2").showModal();
                          }}
                          className="bg-neutral p-5 rounded-xl hover:rounded-none transition-all duration-300 shadow-xl hover:cursor-pointer hover:bg-opacity-80"
                        >
                          <p className="text-midLigth">ID: {tk.id}</p>
                          <p className="text-midLigth">
                            Creado: {tk.created_at?.toString()}
                          </p>
                          <p className="text-midLigth">
                            Completed: {tk.is_completed ? "✔" : "❌"}
                          </p>
                        </div>
                        <button
                          onClick={() => dispatch(setTask(tk))}
                          className="btn btn-square btn-info hover:btn-success self-end hover:rounded-none transition-all duration-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-info-square-rounded"
                            width="35"
                            height="35"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <path d="M12 9h.01"></path>
                            <path d="M11 12h1v4h1"></path>
                            <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          {isError && (
            <>
              <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="card-actions justify-end"></div>
                  <p className="text-2xl text-light">
                    Error en cargar las tareas.
                    <span className="loading loading-spinner text-primary ml-4"></span>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-row-reverse min-h-[43vh] justify-between">
        <div className="basis-1/2 ">{task?.id && <TaskDetails task={task} />}</div>
        <div className="mx-auto">{note?.note_id && <Notes />}</div>
      </div>
    </>
  );
}

export default Tasks;
