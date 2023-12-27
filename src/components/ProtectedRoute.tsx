import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { setUid, setUser } from "../redux/actions/userSlice";
// Intefaces
import { responseCurrent } from "../utils/interfaces/user";


const ProtectedRoute = ({ redirectTo, children, queryData }: any) => {
  const token = localStorage.getItem("jwt");

  if (!token) {
    // Si no hay token, redirigir a la página de inicio de sesión
    return <Navigate to={redirectTo} replace />;
  }

  return queryData?.data?.token ? (
    children ? (
      children
    ) : (
      <Outlet />
    )
  ) : (
    <>{queryData ? <Navigate to={redirectTo} replace /> : null}</>
  );
};

export default ProtectedRoute;
