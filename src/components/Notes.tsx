import { useQuery } from "@tanstack/react-query";
import React from "react";

// Helpers fetchers
import { getNote } from "../utils/helpersFetch/notes/getNotes";

// Interfaces
import { notes, note } from "../utils/interfaces.ts";

function Notes() {
  const { data }: { data: notes } = useQuery({
    queryKey: ["note"],
    queryFn: getNote,
  });

  return (
    <>
      <div className="m-4 ml-24">
        <div className="carousel rounded-box">
          {data &&
            data.data?.map((nt: note) => {
              return (
                <>
                  <div key={nt.id} className="carousel-item mx-4 ">
                    <div className="card w-full bg-primary shadow-xl">
                      <div className="card-body">
                        <h2 className="card-title">{nt.title}</h2>
                        <p>{nt.description}</p>
                        {/* <p>Creado: {nt.createdAt.toString()}</p> */}
                        <div className="form-control">
                          <label className="label cursor-pointer ">
                            <span className="label-text mx-2">Completed</span>
                            <input
                              type="checkbox"
                              checked={nt.isCompleted}
                              className="checkbox checkbox-secondary"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Notes;
