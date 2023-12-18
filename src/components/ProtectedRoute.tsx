import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { setUid, setUser } from "../redux/actions/userSlice";
// Helpers
import { getCurrent } from "../utils/helpersFetch/user/current";

const ProtectedRoute = ({ redirectTo = "/login", children }: any) => {
  const dispatch = useAppDispatch();

  const token = localStorage.getItem("jwt");

  const { data: queryData } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrent,
    enabled: !!token, // Habilita la solicitud solo si existe un token en localStorage
  });

  if (!token) {
    // Si no hay token, redirigir a la página de inicio de sesión
    return <Navigate to={redirectTo} replace />;
  }

  if (queryData?.data?.user) {
    if (typeof queryData.data.user === "number") {
      dispatch(setUid(queryData.data.user));
    } else {
      dispatch(setUser(queryData.data.user));
    }
  }

  return queryData?.data?.token ? children ? children : <Outlet /> : null;
};

export default ProtectedRoute;
