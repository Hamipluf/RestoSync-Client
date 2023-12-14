import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// Helpers fetchers
import getTaskOfUser from "../../utils/helpersFetch/tasks/getTaskUser.ts";
// Components
import CreateTask from "./CreateTask.tsx";
// Redux
import { useAppDispatch } from "../../redux/hooks.ts";
import { setTask } from "../../redux/actions/taskSlice.ts";
import { RootState } from "../../redux/store.ts";
// Intefaces
import { responseTaskOfUser, task } from "../../utils/interfaces/tasks.ts";
import { useSelector } from "react-redux";

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();
  const uid = useSelector((state: RootState) => state.userReducer.user.id);
  // Tareas
  const {
    data,
    isError,
    isLoading,
  }: {
    data: responseTaskOfUser | undefined;
    isError: ConstrainBoolean;
    isLoading: ConstrainBoolean;
  } = useQuery<responseTaskOfUser, Error>({
    queryKey: ["tasks", uid],
    queryFn: getTaskOfUser,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredTasks = data?.data.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-row-reverse m-4 justify-between">
        <input
          type="text"
          placeholder="Buscar tarea 🔎"
          onChange={handleInputChange}
          className="input input-bordered input-sm max-w-xs"
        />
        <h2 className="text-light text-2xl font-bold drop-shadow-xl">
          Bienvenido User
        </h2>
      </div>
      <div className="divider m-0 font-semibold text-light ">
        <CreateTask />
      </div>
      <div className="carousel my-4 gap-5 w-full ">
        {isLoading ? (
          <>
            <div className="carousel-item">
              <div className="flex flex-col gap-4 w-52 m-4">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="flex flex-col gap-4 w-52 m-4">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="flex flex-col gap-4 w-52 m-4">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="flex flex-col gap-4 w-52 m-4">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            </div>
          </>
        ) : (
          <>
            {data &&
              filteredTasks &&
              filteredTasks.map((tk: task) => {
                const dayCreated = new Date(tk.created_at).toLocaleDateString();
                const hourCreated = new Date(
                  tk.created_at
                ).toLocaleTimeString();
                const dayUpdated =
                  tk.updated_at && new Date(tk.updated_at).toLocaleDateString();
                const HourUpdated =
                  tk.updated_at && new Date(tk.updated_at).toLocaleTimeString();
                return (
                  <>
                    <div key={tk.id} className="carousel-item">
                      <div className="flex items-start bg-secondary p-4 shadow-lg m-4">
                        <div className="mr-4">
                          <h2 className="font-semibold text-light">
                            {tk.name}
                          </h2>
                          <p className="mt-2 text-sm text-midLigth">
                            Creado: {`${dayCreated}-${hourCreated}`}
                          </p>
                          {tk.updated_at && (
                            <p className="mt-2 text-sm text-midLigth">
                              Actualizado: {`${dayUpdated}-${HourUpdated}`}
                            </p>
                          )}
                        </div>
                        <div
                          onClick={() => dispatch(setTask(tk))}
                          className="flex h-12 w-12 items-center justify-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-info-square-rounded bg-primary rounded-xl hover:rounded-none hover:cursor-pointer hover:bg-opacity-60 transition-all ease-in duration-200 active:scale-110 text-light"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 9h.01" />
                            <path d="M11 12h1v4h1" />
                            <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </>
        )}
        {isError && (
          <>
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="card-actions justify-end"></div>
                <p className="text-2xl text-light">
                  Error en cargar las tareas.
                  <span className="loading loading-spinner text-primary ml-4"></span>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Tasks;
