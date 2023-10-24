import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// Components
import LoginForm from "../components/LoginForm";
// Images
import Logo from "../assets/RestoSync-logos_transparent.png";
// Helpers
import { getCurrent } from "../utils/helpersFetch/current";
// Images
function Login() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrent,
  });
  if (isLoading) {
    return (
      <>
        <div className="hero bg-base-200">
          <div className="hero-content">
            <img className="w-6/12" src={Logo} alt="Logo RestoSync" />
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="navbar bg-base-100">
        <Link to={"/"} className="btn btn-ghost normal-case text-xl">
          <button className="text-2l font-bold">{"<"}</button>
        </Link>
      </div>
      <LoginForm />
    </>
  );
}

export default Login;
