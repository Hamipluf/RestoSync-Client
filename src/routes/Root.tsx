import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// Component
import Onboarding from "../components/layout/Onboarding";
// Layout
import SideBar from "../components/layout/SideBar";
import Footer from "../components/layout/Footer";


function Root() {
  return (
    <>
      <Onboarding />
      <Footer />
    
    </>
  );
}

export default Root;
