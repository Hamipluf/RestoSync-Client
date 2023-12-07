import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// Components
import LoginForm from "../components/LoginForm";
// Helpers
import { getCurrent } from "../utils/helpersFetch/user/current";
// Interfaces
function Login() {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrent,
  });

  useEffect(() => {
    if (data?.success) {
      navigate("/home");
    }
  }, [data]);

  return <LoginForm />;
}

export default Login;
