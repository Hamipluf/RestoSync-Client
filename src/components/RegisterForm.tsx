import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
// Helpers
import { registerPost } from "../utils/helpersFetch/user/register";
import { dataRegister, responseRegister } from "../utils/interfaces";
// Interfaces

function RegisterForm() {
  const navigate = useNavigate();
  const [error, setError] = useState<boolean | string>(false);
  const [visible, setVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const registerMutation = useMutation({
    mutationFn: registerPost,
    onSuccess: (data: responseRegister) => {
      if (data.success) {
        setSuccess(true);
        localStorage.setItem("jwt", data.data.token);
        localStorage.setItem("uid", JSON.stringify(data.data.user.id));

        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    const password: any = e.target[4].value;
    // @ts-ignore
    const confirmPassword: any = e.target[5].value;
    if (password !== confirmPassword) {
      setError("Las contraseñas no son iguales.");
      return;
    }
    const newUser: dataRegister = {
      // @ts-ignore
      name: e.target[0].value, // @ts-ignore
      last_name: e.target[1].value, // @ts-ignore
      email: e.target[2].value, // @ts-ignore
      username: e.target[3].value, // @ts-ignore
      password: e.target[4].value,
      role: "user",
    };
    registerMutation.mutate(newUser);
  };

  registerMutation.isPending && (
    <>
      <span className="loading loading-ball loading-xs"></span>
      <span className="loading loading-ball loading-sm"></span>
      <span className="loading loading-ball loading-md"></span>
      <span className="loading loading-ball loading-lg"></span>
    </>
  );
  if (registerMutation.error) {
    console.error(
      "An error occurred while submitting the form.",
      registerMutation.error
    );
    return <>...Error</>;
  }
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
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
                  <span>{error}</span>
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
          <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
            <form onSubmit={(e) => handleSubmit(e)} className="card-body">
              {/* Name and lastname */}
              <div className="flex flex-1 w-10/12 gap-3">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ramiro"
                    className="input input-bordered"
                    onChange={() => {
                      setError(false), setSuccess(false);
                    }}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Gumma"
                    className="input input-bordered"
                    onChange={() => {
                      setError(false), setSuccess(false);
                    }}
                    required
                  />
                </div>
              </div>
              {/* Email and Username */}
              <div className="flex gap-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="example@hotmail.com"
                    className="input input-bordered"
                    onChange={() => {
                      setError(false), setSuccess(false);
                    }}
                    required
                  />
                </div>
                <div className="form-control ">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input
                    type="Username"
                    placeholder="Hamipluf"
                    className="input input-bordered"
                    onChange={() => {
                      setError(false), setSuccess(false);
                    }}
                    required
                  />
                </div>
              </div>

              {/* Password */}
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
                  placeholder="*****"
                  className="input input-bordered"
                  onChange={() => {
                    setError(false), setSuccess(false);
                  }}
                  required
                />
              </div>
              {/* Confirm Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="******"
                  className="input input-bordered"
                  onChange={() => {
                    setError(false), setSuccess(false);
                  }}
                  required
                />
              </div>

              <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? (
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

export default RegisterForm;
