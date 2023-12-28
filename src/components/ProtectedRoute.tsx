import { Navigate, Outlet } from "react-router-dom";


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
