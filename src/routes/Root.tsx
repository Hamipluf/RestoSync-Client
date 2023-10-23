import React from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";
import SideBar from "../components/SideBar";

function Root() {
  const user: null = null;
  const navigate = useNavigate();
  return (
    <>
      {user ? (
        <Home />
      ) : (
        <>
          <SideBar />
        </>
      )}
    </>
  );
}

export default Root;
