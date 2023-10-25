import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// Components
import LoginForm from "../components/LoginForm";
// Images
import Logo from "../assets/RestoSync-logos_transparent.png";
// Helpers
import { getCurrent } from "../utils/helpersFetch/user/current";
// Interfaces
function Login() {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrent,
  });

  useEffect(() => {
    if (data?.success) {
      navigate("/home");
    }
  }, [data, navigate]);
  return (
    <div>
      {isLoading ? (
        <div className="hero bg-base-200">
          <div className="hero-content">
            <img className="w-6/12" src={Logo} alt="Logo RestoSync" />
          </div>
        </div>
      ) : (
        <div className="navbar bg-base-100">
          <Link to={"/"} className="btn btn-ghost normal-case text-xl">
            <button className="text-2xl font-bold">{"<"}</button>
          </Link>
          <LoginForm />
        </div>
      )}
    </div>
  );
}

export default Login;
