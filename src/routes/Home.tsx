import React from "react";
import { useQuery } from "@tanstack/react-query";
// Components
import SideBar from "../components/layout/SideBar";
import Footer from "../components/layout/Footer";
import Notes from "../components/tasks/Tasks";
// Helpers
import { getCurrent } from "../utils/helpersFetch/user/current";

function Home() {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrent,
  });

console.log(data)
  return (
    <>
      <SideBar />
      <div className="text-white flex items-end m-4 ml-24 justify-start bg-primary p-4 rounded-md shadow-big">
        <div className="form-control ml-5">
          <input
            type="text"
            placeholder="Search                         🔎"
            className="input input-bordered"
          />
        </div>
      </div>
      <div className="w-10/12 mx-auto bg-secondary p-4 rounded-sm">
        <h2 className="text-xl font-bold text-light">
          Bienvenido de vuelta
          <span className="text-2xl font-extrabold">{data?.data.name}</span>
        </h2>
      </div>
      <div className="">
        <div className="card-body">
          <Notes />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
