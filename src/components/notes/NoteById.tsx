import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
// Interfaces
import { dataNote, note, notes } from "../../utils/interfaces";
import getNoteByTask from "../../utils/helpersFetch/tasks/getNoteByTask";
// redux
import { useAppDispatch } from "../../redux/hooks";
import { setNote} from "../../redux/actions/noteSlice";

const NoteById: React.FC<{
  nid: number;
}> = ({ nid }) => {
  const dispatch = useAppDispatch();
  const { data, isError, isFetching } = useQuery<notes, Error>({
    queryKey: ["noteById", nid],
    queryFn: getNoteByTask,
  });

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
          <div className="overflow-x-auto bg-slate-800 p-4 rounded-md">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((note: dataNote) => {
                  // console.log(note);
                  return (
                    <tr
                      key={note.owner_id}
                      onClick={() => dispatch(setNote(note))}
                      className="hover:bg-slate-700 hover:cursor-pointer"
                    >
                      <th>{note.title}</th>
                      <td>{note.description}</td>
                    </tr>
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
