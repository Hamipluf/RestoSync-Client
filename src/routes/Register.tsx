import React from "react";
import { Link } from "react-router-dom";
// Components
import RegisterForm from "../components/RegisterForm";

function Register() {
  return (
    <>
      <div className="navbar bg-base-100">
        <Link to={"/"} className="btn btn-ghost normal-case text-xl">
          <button className="text-2l font-bold">{"<"}</button>
        </Link>
      </div>
      <RegisterForm />
    </>
  );
}

export default Register;
