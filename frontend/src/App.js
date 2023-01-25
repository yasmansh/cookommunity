import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages";
import Signin from "./pages/signin";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import DashEditProfile from "./pages/editProfile";
import DashPromotion from "./pages/dashPromotion";
import SearchPage from "./pages/search";
import TicketsPage from "./pages/ticket";
import { useState } from "react";
import axios from "axios";
import Foods from "./Components/Foods/Food";
import FoodDetail from "./Components/Foods/FoodDetail";
function App() {
  let isLogin = localStorage.getItem("isLogin") === "true";
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (value) => {
    // console.log(value);
    localStorage.setItem("username", value);
    localStorage.setItem("isLogin", true);
    isLogin = true;
  };

  const removeAuth = () => {
    let username = localStorage.getItem("username")
    let useObject={"username":username};
    //window.location.reload()
    axios
    .put("http://127.0.0.1:8000/api/accounts/logout/", JSON.stringify(useObject), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("removeAuth");
    })
    .catch((error) => {
      console.log(error);
    });
  };
  //atom globally

  return (
    //import redirect with navigate
    <Router className="App">
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/search" element={<SearchPage />} exact />
        {/* <Route path="/food" element={<Foods />} exact />
        <Route path="/movies/{movie_id}" element={<FoodDetail />} exact /> */}
        {/* <Route
          path="/login"
          element={<Dashboard removeAuth2={removeAuth1} />}
          exact
        />
        <Route
          path="/register"
          element={<Dashboard removeAuth2={removeAuth1} />}
          exact
        /> */}
        {/* {!isLogin && (
          <>
            
          </>
        )} */}
        <Route path="/login" element={<Signin setAuth={setAuth} />} exact />
        <Route path="/register" element={<Register />} exact />
        {isLogin && (
          <>
            <Route
              path="/dashboard"
              element={<Dashboard removeAuth={removeAuth} />}
              exact
            />
            <Route
              path="/dashboard/edit-profile"
              element={<DashEditProfile />}
              exact
            />
            <Route
              path="/dashboard/promotion"
              element={<DashPromotion />}
              exact
            />
            <Route path="/dashboard/tickets" element={<TicketsPage />} exact />
          </>
        )}
        <Route path="*" element={<p>404</p>} exact />
      </Routes>
    </Router>
  );
}

export default App;
