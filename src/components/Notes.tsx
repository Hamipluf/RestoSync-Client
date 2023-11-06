import { useQuery, useMutation } from "@tanstack/react-query";
import React from "react";

// Helpers fetchers
import { getNote, addNote } from "../utils/helpersFetch/notes/getUsersNotes.ts";

// Interfaces
import { notes, note } from "../utils/interfaces.ts";

function Notes() {
  const {
    data,
    isError,
  }: { data: notes | undefined; isError: boolean; isLoading: boolean } =
    useQuery<notes, Error>({
      queryKey: ["note"],
      queryFn: getNote,
    });
  const noteMutation = useMutation({
    mutationFn: addNote,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    const note = {
      // @ts-ignore
      title: e.target[0].value,
      // @ts-ignore
      description: e.target[1].value,
      // @ts-ignore
      owner_id: 2, // colocar el oid
      
    };
    noteMutation.mutate(note);
  };

  return (
    <>
      <div className="m-4 ml-24">
        <div className="text-xl text-ligth ">
          <button onClick={() => handleAddNote()} className="btn btn-neutral">
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
        </div>
        <div className="carousel rounded-box">
          {data &&
            data.data?.map((nt: note) => {
              return (
                <>
                  <div key={nt.id} className="carousel-item m-4 ">
                    <div
                      onClick={() => {
                        //@ts-ignore
                        document.getElementById("my_modal_2").showModal();
                      }}
                      className="card card-compact w-96 bg-primary hover:rounded-sm transition-all duration-300 shadow-xl hover:cursor-pointer"
                    >
                      <div className="card-body">
                        <h2 className="card-title text-ligth">{nt.title}</h2>
                        <div className="bg-neutral p-5 rounded-md ">
                          <p className="text-midLigth">{nt.description}</p>
                          <p className="text-midLigth">
                            Creado: {nt.created_at?.toString()}
                          </p>
                          <p className="text-midLigth">
                            Completed: {nt.is_completed ? "✔" : "❌"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                      <div className="card card-compact ">
                        <div className="card-body">
                          <h2 className="card-title text-2xl mx-2 text-ligth">
                            {nt.title}
                          </h2>
                          <div className="bg-neutral p-5 rounded-md ">
                            <p className="text-midLigth">{nt.description}</p>
                          </div>
                          <p className="text-midLigth">
                            Creado: {nt.created_at?.toString()}
                          </p>
                          <p className="text-midLigth">
                            Completed: {nt.is_completed ? "✔" : "❌"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
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
    </>
  );
}

export default Notes;
