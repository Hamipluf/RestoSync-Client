import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";

// Pages
import Root from "./routes/Root";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Dashboard from "./routes/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./routes/Profile";
import CreateStore from "./routes/CreateStore";
// Redux
import { useQuery } from "@tanstack/react-query";
import { getCurrent } from "./utils/helpersFetch/user/current";
import { useAppDispatch } from "./redux/hooks";
import { setUid, setUser } from "./redux/actions/userSlice";

// Styles
const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("jwt");
  const { data: queryData } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrent,
    enabled: !!token, // Habilita la solicitud solo si existe un token en localStorage
  });

  if (queryData?.data?.user) {
    if (typeof queryData.data.user === "number") {
      dispatch(setUid(queryData.data.user));
    } else {
      dispatch(setUser(queryData.data.user));
    }
  }
  useEffect(() => {
    if (queryData?.data?.user) {
      if (typeof queryData.data.user === "number") {
        dispatch(setUid(queryData.data.user));
      } else {
        dispatch(setUser(queryData.data.user));
      }
    }
  }, [dispatch, queryData]);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          element={<ProtectedRoute redirectTo="/login" queryData={queryData} />}
        >
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-store" element={<CreateStore />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
