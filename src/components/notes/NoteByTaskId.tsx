import React from "react";
import { useQuery } from "@tanstack/react-query";
// Interfaces
import { responseGetNoteByTaskId, noteByTaskId } from "../../utils/interfaces";
import getNoteByTask from "../../utils/helpersFetch/tasks/getNoteByTask";
// redux
import { useAppDispatch } from "../../redux/hooks";
import { setNote } from "../../redux/actions/noteSlice";
// Components
import DeleteNote from "./DeleteNote";
// Style
import "../../styles/index.css";

const NoteByTaskId: React.FC<{
  tid: number;
}> = ({ tid }) => {
  const dispatch = useAppDispatch();
  const { data, isError, isLoading } = useQuery<responseGetNoteByTaskId, Error>(
    {
      queryKey: ["noteByTask", tid],
      queryFn: getNoteByTask,
    }
  );
  if (isLoading) {
    return (
      <>
        <div className="skeleton h-44 m-4"></div>
      </>
    );
  }
  if (isError) {
    return (
      <>
        <div className="bg-slate-950 w-full h-32">
          Error en cargar los datos... {isError}
        </div>
      </>
    );
  }
  const truncate = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
      return text; // Si la longitud del texto es menor o igual que maxLength, devuelve el texto original sin cambios
    } else {
      return text.slice(0, maxLength) + "..."; // Trunca el texto y agrega "..." al final para indicar que fue truncado
    }
  };
  const notes = data?.data.slice().reverse();

  return (
    <>
      {data && notes && (
        <>
          <div className="overflow-auto bg-secondary rounded-md h-44 m-4 p-2 scroll-bar">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                {notes.map((note: noteByTaskId) => {
                  return (
                    <>
                      <tr key={note.note_id}>
                        <th
                          className="hover:bg-slate-700 hover:cursor-pointer"
                          onClick={() => dispatch(setNote(note))}
                        >
                          {truncate(note.title, 15)}
                        </th>
                        <td className="w-14">
                          {note.is_completed ? "✔" : "❌"}
                        </td>
                        <td>
                          <DeleteNote nid={note.note_id} />
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default NoteByTaskId;
