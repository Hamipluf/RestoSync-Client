import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Interfaces
import { dataNote, note, notes } from "../../utils/interfaces";
import getNoteByTask from "../../utils/helpersFetch/tasks/getNoteByTask";
// Helpers

const ListComments: React.FC<{
  nid: number;
}> = ({ nid }) => {

  const { data, isError, isFetching } = useQuery<notes, Error>({
    queryKey: ["notes", nid],
    queryFn: getNoteByTask,
  });


  if (isFetching ) {
    return (
      <>
        <div className="skeleton w-full h-32"></div>
      </>
    );
  }
  if (isError) {
    return (
      <>
        <div className="bg-slate-950 w-full h-32">Error en cargar los datos... {isError}</div>
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
                        onClick={
                          () =>
                            // @ts-ignore
                            console.log(note.id)
                          // document.getElementById("my_modal_5").showModal()
                        }
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

export default ListComments;
