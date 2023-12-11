import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ data, redirectTo = "/login", children }: any) => {
  if (!data?.success) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};
export default ProtectedRoute;
