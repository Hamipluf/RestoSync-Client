import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAppDispatch } from "../../redux/hooks";
import { setNote } from "../../redux/actions/noteSlice";
// Helpers
import updateNote from "../../utils/helpersFetch/notes/updateNote";
// Toastify
import { toast } from "react-toastify";
import { dataUpdateNote } from "../../utils/interfaces/note";

const UpdateNote = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const note = useSelector((state: RootState) => state.noteReducer.note);
  const updateProductMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: (data) => {
      if (!data.success) {
        console.error(data.message);
        toast.error(data.message);
      }
      toast.success(data.message);
      dispatch(setNote(data.data));
      //@ts-ignore
      queryClient.invalidateQueries("noteByTask");
      //@ts-ignore
      queryClient.refetchQueries("noteByTask");
      // @ts-ignore
      document.getElementById("my_modal_update_note").close();
    },
  });
  const handleSubmtit = (e: React.FormEvent) => {
    e.preventDefault();
    if (note.id) {
      const updateNote: dataUpdateNote = {
        nid: note?.id,
        // @ts-ignore
        title: e.target[0].value ? e.target[0].value : note.title,
        // @ts-ignore
        description: e.target[1].value ? e.target[1].value : note.description,
        // @ts-ignore
        is_completed: e.target[2].value ? e.target[2].value : note.is_completed,
      };
      updateProductMutation.mutate(updateNote);
    } else {
      console.error("Falta el ID de la nota");
      toast("Falta la nota.");
    }
  };
  return (
    <>
      <button
        onClick={() =>
          //   @ts-ignore
          document.getElementById("my_modal_update_note").showModal()
        }
        className="btn btn-info btn-xs"
        disabled={!note.id}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-edit"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
          <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
          <path d="M16 5l3 3" />
        </svg>
      </button>
      <dialog id="my_modal_update_note" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {note.id && (
            <div>
              <h1 className=" font-bold text-3xl flex gap-1 items-baseline font-mono">
                Actualizar Datos
                <span className="text-sm text-accent">{note.title}</span>
              </h1>
              <span className="text-xs font-semibold text-midLigth opacity-40 ">
                Complete solo los campos a actualizar.
              </span>
              <form
                onSubmit={(e) => handleSubmtit(e)}
                className="w-full mt-1 grid grid-cols-1 justify-items-center rounded-md border-t-4 border-info"
              >
                <div className="flex w-full gap-2 items-start">
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Nombre</span>
                    </div>
                    <input
                      type="text"
                      placeholder={note.title}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                </div>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Descripcion</span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered h-18 "
                    placeholder={note.description}
                  ></textarea>
                </label>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Completado</span>
                    <input
                      type="checkbox"
                      checked={note.is_completed}
                      className="checkbox mx-4"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={updateProductMutation.isPending}
                  className="mt-4 btn btn-success btn-wide text-lg justify-self-center"
                >
                  {updateProductMutation.isPending ? (
                    <>
                      <span className="loading loading-ring loading-lg"></span>
                    </>
                  ) : (
                    <>Actualizar</>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
};

export default UpdateNote;
