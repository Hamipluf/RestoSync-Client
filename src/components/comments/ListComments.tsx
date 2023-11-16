import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Interfaces
import { dataNote, notes } from "../../utils/interfaces";
const ListComments: React.FC<{
  nid: number;
}> = ({ nid }) => {
  const getNoteByTask = async (): Promise<notes> => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.get(
        `https://restosync-api.onrender.com/api/tasks/all/notes/${nid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes"],
    queryFn: getNoteByTask,
  });

  if (isLoading) {
    return (
      <>
        <div className="skeleton w-full h-32"></div>
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
                    <>
                      <tr onClick={()=>document.getElementById('my_modal_5').showModal()} className="hover:bg-slate-700 hover:cursor-pointer" key={note.owner_id}>
                        <th>{note.title}</th>
                        <td>{note.description}</td>
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

export default ListComments;
