import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/actions/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
// Helpers
import { getCurrent } from "../utils/helpersFetch/user/current";

const ProtectedRoute = ({ redirectTo = "/login", children }: any) => {
  const dispatch = useAppDispatch();

  const { data: queryData, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrent,
  });
  useEffect(() => {
    refetch(); // Realiza un refetch al montar el componente
  }, [refetch]); // Dependencia refetch para ejecutar cuando cambie

  useEffect(() => {
    if (queryData && queryData.success && queryData.data.user) {
      dispatch(setUser(queryData.data.user));
    }
  }, [queryData, dispatch]);

  if (!queryData?.data.token) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};
export default ProtectedRoute;
