import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/actions/userSlice";

const ProtectedRoute = ({ data, redirectTo = "/login", children }: any) => {
  console.log("DATA", data);
  const dispatch = useAppDispatch();

  if (!data.success) {
    return <Navigate to={redirectTo} replace />;
  } 
  dispatch(setUser(data.data.user));
  return children ? children : <Outlet />;
};
export default ProtectedRoute;
