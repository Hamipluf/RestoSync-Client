import React from "react";
import { useQuery } from "@tanstack/react-query";
// Components
import SideBar from "../components/layout/SideBar";
import Footer from "../components/layout/Footer";
import Notes from "../components/Notes";
// Helpers
import { getCurrent } from "../utils/helpersFetch/current";

function Home() {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrent,
  });
  return (
    <>
      <SideBar />
      <div className="text-white flex items-end m-4 ml-24 justify-start bg-secondary p-4 rounded-md shadow-big">
        <h1 className="text-5xl font-bold ">Hola! {data?.data.name}</h1>
        <p className="mx-2 text-center ">Sincroniza tu éxito culinario.</p>
      </div>
      <Notes />
      <Footer />
    </>
  );
}

export default Home;
