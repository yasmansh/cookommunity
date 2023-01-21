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
function App() {
  let isLogin = localStorage.getItem("isLogin") === "true";
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (value) => {
    // console.log(value);
    localStorage.setItem("username", value);
    localStorage.setItem("isLogin", true);
    isLogin = true;
  };

  const removeAuth1 = () => {
    localStorage.setItem("isLogin", false);
    console.log(typeof isLogin);
  };
  //atom globally

  return (
    <Router className="App">
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/search" element={<SearchPage />} exact />
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
              element={<Dashboard removeAuth2={removeAuth1} />}
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
