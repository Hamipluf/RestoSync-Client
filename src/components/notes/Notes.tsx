import React from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/hooks";
import { invalidateNote } from "../../redux/actions/noteSlice";
const Note = () => {
  // Selecciono el valor del estado de noteReducer
  const note = useSelector((state: RootState) => state.noteReducer.note);
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl">
        <button
          onClick={() => dispatch(invalidateNote())}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <div className="card-body">
          <h2 className="card-title">{note.title}</h2>
          <p>{note.description}</p>
          <div className="card-actions justify-end">
            <p>Creado: {note.note_created_at}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Note;
