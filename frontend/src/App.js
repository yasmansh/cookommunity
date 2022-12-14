import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages";
import Signin from "./pages/signin";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
function App() {
  return (
    <Router className="App">
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/signin" element={<Signin />} exact />
        <Route path="/register" element={<Register />} exact />
        <Route path="/dashboard" element={<Dashboard />} exact />
      </Routes>
    </Router>
  );
}

export default App;
