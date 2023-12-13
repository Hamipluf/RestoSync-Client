import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// Pages
import Root from "./routes/Root";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Dashboard from "./routes/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./routes/Profile";
import CreateStore from "./routes/CreateStore";
// Helpers
import { getCurrent } from "./utils/helpersFetch/user/current";

// Styles
const App = () => {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrent,
  });
const currentData = data && data
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute data={currentData} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/proile" element={<Profile />} />
          <Route path="/create-store" element={<CreateStore />} />
        </Route>
        <Route element={<Dashboard />} path="/dashboard" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
