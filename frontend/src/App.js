import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages";
import Signin from "./pages/signin";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import DashEditProfile from "./pages/editProfile";
import DashPromotion from "./pages/dashPromotion";
import { useEffect, useState } from "react";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (value) => {
    // console.log(value);
    localStorage.setItem("username", value);
    localStorage.setItem("isLogin", true);
  };
  const removeAuth = (value) => {
    console.log("@@##@");
  };
  //atom globally
  const isLogin=localStorage.getItem("isLogin");
  return (
    <Router className="App">
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Signin setAuth={setAuth}/>} exact />
        <Route path="/register" element={<Register />} exact />
        {isLogin && <><Route path="/dashboard" element={<Dashboard removeAuth={removeAuth}/>} exact />
        <Route path="/dashboard/edit-profile" element={<DashEditProfile />} exact />
        <Route path="/dashboard/promotion" element={<DashPromotion />} exact /></>}
        <Route path="*" element={<p>404</p>} exact />
      </Routes>
    </Router>
  );
}

export default App;
