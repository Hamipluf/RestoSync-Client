import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { json, useNavigate } from "react-router-dom";

// Intefaces
import { dataLogin } from "../utils/interfaces";
// Helpers
import { loginPost } from "../utils/helpersFetch/user/login";
// Interfaces
import { responseLogin } from "../utils/interfaces";
function LoginForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const loginMutation = useMutation({
    mutationFn: loginPost,
    onSuccess: (data: responseLogin) => {
      !data.success && setError(true);
      if (data.success) {
        setSuccess(true);
        localStorage.setItem("jwt", data.data.token);
        localStorage.setItem("uid", JSON.stringify(data.data.userResponse.id));
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user: dataLogin = {
      // @ts-ignore
      email: e.target[0].value,
      // @ts-ignore
      password: e.target[1].value,
    };
    loginMutation.mutate(user);
  };

  loginMutation.isPending && (
    <>
      <span className="loading loading-ball loading-xs"></span>
      <span className="loading loading-ball loading-sm"></span>
      <span className="loading loading-ball loading-md"></span>
      <span className="loading loading-ball loading-lg"></span>
    </>
  );
  if (loginMutation.error) {
    console.error(
      "An error occurred while submitting the form.",
      loginMutation.error
    );
    return <>...Error</>;
  }
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            {error && (
              <>
                <div className="alert alert-error">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Email o Contraseña incorrecta.</span>
                </div>
              </>
            )}
            {success && (
              <>
                <div className="alert alert-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    <div className="flex">
                      Redirigiendo
                      <span className="loading loading-dots loading-sm mx-4"></span>
                    </div>
                  </span>
                </div>
              </>
            )}
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={(e) => handleSubmit(e)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  onChange={() => {
                    setError(false), setSuccess(false);
                  }}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                  {visible ? (
                    <>
                      <div
                        onClick={() => setVisible(!visible)}
                        className="cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-eye"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                          <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path>
                        </svg>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        onClick={() => setVisible(!visible)}
                        className="cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-eye-closed"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path d="M21 9c-2.4 2.667 -5.4 4 -9 4c-3.6 0 -6.6 -1.333 -9 -4"></path>
                          <path d="M3 15l2.5 -3.8"></path>
                          <path d="M21 14.976l-2.492 -3.776"></path>
                          <path d="M9 17l.5 -4"></path>
                          <path d="M15 17l-.5 -4"></path>
                        </svg>
                      </div>
                    </>
                  )}
                </label>
                <input
                  type={`${visible ? "text" : "password"}`}
                  placeholder="password"
                  className="input input-bordered"
                  onChange={() => {
                    setError(false), setSuccess(false);
                  }}
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  disabled={loginMutation.isPending || loginMutation.isIdle || loginMutation.isSuccess}
                >
                  {loginMutation.isPending ? (
                    <>
                      <span className="loading loading-ring loading-lg"></span>
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
