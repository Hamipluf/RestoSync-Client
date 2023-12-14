import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { setUid, setUser } from "../redux/actions/userSlice";
// Helpers
import { getCurrent } from "../utils/helpersFetch/user/current";

const ProtectedRoute = ({ redirectTo = "/login", children }: any) => {
  const dispatch = useAppDispatch();

  const { data: queryData, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrent,
  });
  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (queryData?.data.user) {
      if (typeof queryData.data.user === "number") {
        dispatch(setUid(queryData.data.user));
      } else {
        dispatch(setUser(queryData.data.user));
      }
    }
  }, [queryData, dispatch]);

  if (!queryData?.data.token) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};
export default ProtectedRoute;
