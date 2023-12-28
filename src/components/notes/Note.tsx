import React from "react";
// Helpers
import updateNote from "../../utils/helpersFetch/notes/updateNote";
// Components
import UpdateNote from "./UpdateNote";
// Redux
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/hooks";
import { invalidateNote, setNote } from "../../redux/actions/noteSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// Interfaces
import { dataUpdateNote } from "../../utils/interfaces/note";
// Toast Nosification
import { toast } from "react-toastify";
const Note = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const note = useSelector((state: RootState) => state.noteReducer.note);
  const fromatedCreated =
    note.created_at && new Date(note.created_at).toLocaleDateString();
  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: (data) => {
      if (!data.success) {
        console.error(data.message);
        toast.error(data.message);
      }
      if (data.success) {
        toast.success(data.message);
        dispatch(setNote(data.data));
        //@ts-ignore
        queryClient.invalidateQueries("noteByTask");
        //@ts-ignore
        queryClient.refetchQueries("noteByTask");
      }
    },
  });
  const handleOnchange = (e: React.FormEvent) => {
    e.preventDefault();
    if (note.description && note.title && note.id) {
      const updateNote: dataUpdateNote = {
        nid: note?.id,
        title: note?.title,
        description: note?.description,
        // @ts-ignore
        is_completed: e.target.checked,
      };
      updateNoteMutation.mutate(updateNote);
    } else {
      console.error("Falta el ID de la nota");
      toast("Falta la nota.");
    }
  };
  return (
    <>
      {note.id && (
        <>
          <div className="card">
            <button
              onClick={() => dispatch(invalidateNote())}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <div className="card-body">
              <div className="flex">
                <h2 className="card-title text-light mx-5">{note.title}</h2>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Completado</span>
                    {updateNoteMutation.isPending ? (
                      <>
                        <span className="loading loading-spinner loading-sm mx-4"></span>
                      </>
                    ) : (
                      <input
                        type="checkbox"
                        checked={note.is_completed}
                        className="checkbox mx-4"
                        onChange={handleOnchange}
                      />
                    )}
                  </label>
                </div>
                <UpdateNote />
              </div>
              <div className="bg-primary  p-3 overflow-hidden">
                <p className="whitespace-normal break-words">
                  {note.description}
                </p>
              </div>
              <p className="text-midLigth font-light text-sm">
                Creado: {fromatedCreated}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Note;
