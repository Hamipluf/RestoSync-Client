import React from "react";
import { useQuery } from "@tanstack/react-query";
// Components
import SideBar from "../components/layout/SideBar";
import Footer from "../components/layout/Footer";
import Notes from "../components/notes/Notes";
// Helpers
import { getCurrent } from "../utils/helpersFetch/user/current";

function Home() {
  const uid = 6
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrent,
  });
  console.log(data);
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
      <Notes />
      <Footer />
    </>
  );
}

export default Home;
