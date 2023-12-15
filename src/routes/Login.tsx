import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// Components
import LoginForm from "../components/LoginForm";
// Helpers
import { getCurrent } from "../utils/helpersFetch/user/current";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrent,
  });
  useEffect(() => {
    if (data?.success) {
      navigate("/home");
    } else if (data?.code === 307 || data?.code === 308) {
      navigate("/create-store");
    }
  }, [data, navigate]);

  return (
    <>
      <LoginForm loading={isLoading} />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default Login;
