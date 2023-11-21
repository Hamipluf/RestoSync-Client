import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
// Interfaces
import { responseGetNoteByTaskId, noteByTaskId } from "../../utils/interfaces";
import getNoteByTask from "../../utils/helpersFetch/tasks/getNoteByTask";
// redux
import { useAppDispatch } from "../../redux/hooks";
import { setNote } from "../../redux/actions/noteSlice";
// Components
import DeleteNote from "./DeleteNote";

const NoteById: React.FC<{
  tid: number;
}> = ({ tid }) => {
  const dispatch = useAppDispatch();
  const { data, isError, isFetching } = useQuery<
    responseGetNoteByTaskId,
    Error
  >({
    queryKey: ["noteByTask", tid],
    queryFn: getNoteByTask,
  });
  // console.log(data)
  if (isFetching) {
    return (
      <>
        <div className="skeleton w-full h-32"></div>
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
  return (
    <>
      {data && (
        <>
          <div className="overflow-auto bg-slate-800 p-4 rounded-md h-52">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((note: noteByTaskId) => {
                  // console.log(note);
                  return (
                    <>
                      <tr key={note.note_id}>
                        <th
                          className="hover:bg-slate-700 hover:cursor-pointer"
                          onClick={() => dispatch(setNote(note))}
                        >
                          {note.title}
                        </th>
                        <td>{note.description}</td>
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

export default NoteById;
