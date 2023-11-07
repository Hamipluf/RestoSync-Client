import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

// Helpers fetchers
import getUserNote from "../../utils/helpersFetch/notes/getUsersNotes.ts";
import addNote from "../../utils/helpersFetch/notes/addNote.ts";
import deleteNote from "../../utils/helpersFetch/notes/deleteNotes.ts";
// Interfaces
import { notes, note, dataNote } from "../../utils/interfaces.ts";

function Notes() {
  const uid = localStorage.getItem("uid");
  const queryClient: any = useQueryClient();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [note, setNote] = useState<note | undefined>();
  console.log(note);
  const {
    data,
    isError,
  }: { data: notes | undefined; isError: ConstrainBoolean } = useQuery<
    notes,
    Error
  >({
    queryKey: ["notes"],
    queryFn: getUserNote,
  });
  const createNoteMutation = useMutation({
    mutationFn: addNote,
    onSuccess: (data) => {
      if (!data.success) {
        setError(data.message);
        setTimeout(() => setError(undefined), 3000);
      }
      if (data.success) {
        queryClient.invalidateQueries("notes");
        //@ts-ignore
        document.getElementById("my_modal_3").close();
        setTimeout(() => setSuccess(undefined), 3000);
      }
    },
  });
  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess(data) {
      if (!data.success) {
        setError(data.message);
        setTimeout(() => setError(undefined), 3000);
      }
      if (data.success) {
        setSuccess(data.message);
        queryClient.invalidateQueries("notes");
        setTimeout(() => setSuccess(undefined), 3000);
      }
    },
  });

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    const note: dataNote = {
      // @ts-ignore
      title: e.target[0].value,
      // @ts-ignore
      description: e.target[1].value,
      // @ts-ignore
      owner_id: uid,
    };
    createNoteMutation.mutate(note);
  };

  const handleDeleteNote = (nid: number): void => {
    deleteNoteMutation.mutate(nid);
  };

  return (
    <>
      <div className="m-4 ml-24">
        <div className="text-xl text-ligth flex">
          <button
            onClick={() => {
              //@ts-ignore
              document.getElementById("my_modal_3").showModal();
            }}
            className="btn btn-neutral"
          >
            Note
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
          {error && (
            <>
              <div className="alert alert-error mx-5 w-10/12 text-sm text-dark">
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
              <div className="alert alert-success mx-5 w-10/12 text-sm text-dark">
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
        </div>
        <div className="carousel rounded-box w-full">
          {data &&
            data.data?.map((nt: note) => {
              return (
                <>
                  <div key={nt.id} className="carousel-item m-4 ">
                    <div className="card card-compact w-96 bg-primary ">
                      <div className="card-body">
                        <h2 className="card-title text-ligth">{nt.title}</h2>
                        <div
                          onClick={() => {
                            //@ts-ignore
                            document.getElementById("my_modal_2").showModal();
                            setNote(nt);
                          }}
                          className="bg-neutral p-5 rounded-xl hover:rounded-none transition-all duration-300 shadow-xl hover:cursor-pointer hover:bg-opacity-80"
                        >
                          <p className="text-midLigth">{nt.description}</p>
                          <p className="text-midLigth">
                            Creado: {nt.created_at?.toString()}
                          </p>
                          <p className="text-midLigth">
                            Completed: {nt.is_completed ? "✔" : "❌"}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteNote(nt.id)}
                          className="btn btn-square btn-warning hover:btn-error self-end hover:rounded-none transition-all duration-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-trash-x"
                            width="24"
                            height="24"
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
                            <path d="M4 7h16"></path>
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                            <path d="M10 12l4 4m0 -4l-4 4"></path>
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
                  <p className="text-2xl text-ligth">
                    Error en cargar las notas
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
            onSubmit={(e) => handleAddNote(e)}
          >
            <div className="form-control max-w-xs">
              <label className="label">
                <span className="label-text">Titulo de la nota</span>
              </label>
              <input
                type="text"
                placeholder="Titulo"
                className="input input-bordered w-full max-w-xs text-ligth"
              />
            </div>
            <div className="form-control w-full mx-2">
              <label className="label">
                <span className="label-text">Descripcion</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24  text-ligth"
                placeholder="Bio"
              ></textarea>
            </div>
            <button className="btn btn-primary btn-wide mt-4">
              Agregar nota
            </button>
          </form>
        </div>
      </dialog>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <form onSubmit={() => setNote(undefined)} method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="card card-compact ">
            <div className="card-body">
              <h2 className="card-title text-2xl mx-2 text-ligth">
                {note?.title}
              </h2>
              <div className="bg-neutral p-5 rounded-md ">
                <p className="text-midLigth">{note?.description}</p>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Completed</span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                  />
                </label>
              </div>
              <p className="text-midLigth">
                Creado: {note?.created_at.toString()}
              </p>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Notes;
