import React from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const Note = () => {
  // Selecciono el valor del estado de noteReducer
  const note = useSelector((state: RootState) => state.noteReducer.note)

  return (<>
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{note.title}</h2>
        <p>{note.description}</p>
        <p>Completed: {note.is_completed ? "✔️" : "✖️"}</p>
        <div className="card-actions justify-end">
          <p>Creado: {note.created_at}</p>
        </div>
      </div>
    </div>
  </>)
};

export default Note;
