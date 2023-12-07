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
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrent,
  });

  useEffect(() => {
    if (data?.success) {
      navigate("/home");
    }
  }, [data]);
  return (
    <div>
      {isLoading ? (
        <div className="hero bg-base-200">
          <div className="hero-content">
            <img className="w-6/12" src={Logo} alt="Logo RestoSync" />
          </div>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default Login;
