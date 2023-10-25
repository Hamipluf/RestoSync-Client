import { Navigate, Outlet } from "react-router-dom";
import { getCurrent } from "../utils/helpersFetch/user/current";
import { useQuery } from "@tanstack/react-query";

const ProtectedRoute = ({ redirectTo = "/", children }: any) => {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrent,
  });
  if (!data) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};
export default ProtectedRoute;
