import React from "react";
import { useNavigate } from "react-router-dom";
function Onboarding() {
  const navigate = useNavigate();
  return (
    <>
      <div className="hero min-h-screen bg-onboard">
        <div className="hero-content flex-col w-9/12 items-start">
          <div className="text-white ">
            <h1 className="text-5xl font-bold ">Bienvenidos a RestoSync</h1>
            <p className="py-6">Sincroniza tu éxito culinario.</p>
            <button
              className="btn btn-primary mx-4"
              onClick={() => navigate("/login")}
            >
              LogIn
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Onboarding;
