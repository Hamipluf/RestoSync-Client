import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectNote } from "../../redux/actions/noteSlice.ts";
// Helpers fetchers
import getTaskOfUser from "../../utils/helpersFetch/tasks/getTaskUser.ts";
import { note, responseTaskOfUser, task } from "../../utils/interfaces.ts";
// Components
import TaskDetails from "./TaskDetails.tsx";
import Notes from "../notes/Note.tsx";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";

function Tasks() {
  const uid = localStorage.getItem("uid");
  const queryClient: any = useQueryClient();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [task, setTask] = useState<task | undefined>();
  const note = useAppSelector((state) => state.noteReducer.note.note);
  console.log(note);
  const {
    data,
    isError,
  }: { data: responseTaskOfUser | undefined; isError: ConstrainBoolean } =
    useQuery<responseTaskOfUser, Error>({
      queryKey: ["tasks"],
      queryFn: getTaskOfUser,
    });
  // const createNoteMutation = useMutation({
  //   mutationFn: addNote,
  //   onSuccess: (data) => {
  //     if (!data.success) {
  //       setError(data.message);
  //       setTimeout(() => setError(undefined), 3000);
  //     }
  //     if (data.success) {
  //       queryClient.invalidateQueries("notes");
  //       //@ts-ignore
  //       document.getElementById("my_modal_3").close();
  //       setTimeout(() => setSuccess(undefined), 3000);
  //     }
  //   },
  // });
  // const deleteNoteMutation = useMutation({
  //   mutationFn: deleteNote,
  //   onSuccess(data) {
  //     if (!data.success) {
  //       setError(data.message);
  //       setTimeout(() => setError(undefined), 3000);
  //     }
  //     if (data.success) {
  //       setSuccess(data.message);
  //       queryClient.invalidateQueries("notes");
  //       setTimeout(() => setSuccess(undefined), 3000);
  //     }
  //   },
  // });

  // const handleAddNote = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const note: dataNote = {
  //     // @ts-ignore
  //     title: e.target[0].value,
  //     // @ts-ignore
  //     description: e.target[1].value,
  //     // @ts-ignore
  //     owner_id: uid,
  //   };
  //   createNoteMutation.mutate(note);
  // };

  // const handleDeleteNote = (nid: number): void => {
  //   deleteNoteMutation.mutate(nid);
  // };

  return (
    <>
      <div className="grid grid-cols-1 justify-items-center">
        <div className="text-xl text-light grid grid-cols-3 gap-x-5 ">
          <h3 className="text-xl font-semibold text-light bg-slate-950 px-4 rounded-md col-span-2">
            Tareas
          </h3>
          <button
            onClick={() => {
              //@ts-ignore
              document.getElementById("my_modal_3").showModal();
            }}
            className="btn btn-neutral btn-wide btn-sm"
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
        </div>
        {error && (
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
              <span>{error}</span>
            </div>
          </>
        )}
        {success && (
          <>
            <div className="alert alert-success m-5 w-10/12 text-sm text-dark">
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
                          onClick={() => setTask(tk)}
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
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box ">
          {error && (
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
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form
            method="dialog"
            className="grid grid-cols-1 items-center justify-items-center gap-y-5 modal-backdrop"
            // onSubmit={(e) => handleAddNote(e)}
          >
            <div className="form-control max-w-xs">
              <label className="label">
                <span className="label-text">Titulo de la nota</span>
              </label>
              <input
                type="text"
                placeholder="Titulo"
                className="input input-bordered w-full max-w-xs text-light"
              />
            </div>
            <div className="form-control w-full mx-2">
              <label className="label">
                <span className="label-text">Descripcion</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24  text-light"
                placeholder="Bio"
              ></textarea>
            </div>
            <button className="btn btn-primary btn-wide mt-4">
              Agregar nota
            </button>
          </form>
        </div>
      </dialog>
      <dialog id="my_modal_5" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
      <div className="flex flex-row-reverse min-h-[43vh] justify-between">
        <div className="basis-1/2 ">
          {task && <TaskDetails task={task} setTask={setTask} />}
          {note && <Notes />}
        </div>
      </div>
    </>
  );
}

export default Tasks;
