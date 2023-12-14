import { BrowserRouter, Route, Routes } from "react-router-dom";
// Pages
import Root from "./routes/Root";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Dashboard from "./routes/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./routes/Profile";
import CreateStore from "./routes/CreateStore";


// Styles
const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
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
