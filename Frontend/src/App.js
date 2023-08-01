import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Home from "./Components/Home/Home";
import ShowRecipe from "./Components/ShowRecipe/ShowRecipe";
import UserProfile from "./Components/UserProfile/UserProfile";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminPage from "./Components/Admin/AdminPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/" />
          <Route element={<Signup />} path="/signup" />
          <Route element={<ForgotPassword />} path="/change-password" />
          <Route element={<Home />} path="/home" />
          <Route element={<ShowRecipe />} path="/recipe" />
          <Route element={<UserProfile />} path="/profile" />
          <Route element={<AdminLogin />} path="/admin-login" />
          <Route element={<AdminPage />} path="/admin" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
