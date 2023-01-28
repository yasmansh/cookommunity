import React from "react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import axios from "axios";
import url_img from "./../../images/1.jpg";
const DashboardHeader = ({ removeAuth }) => {
  const navigate = useNavigate();
  const logout = () => {
    let username = localStorage.getItem("username")
    let useObject={"username":username}
    axios
      .put(
        "http://127.0.0.1:8000/api/accounts/logout/",
        JSON.stringify(useObject),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        removeAuth();
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="web-header">
      <div className="element">
        <NotificationsOutlinedIcon className="m2-icon" />
        <ChatBubbleOutlineOutlinedIcon className="m2-icon" />
        <ShoppingCartOutlinedIcon className="m2-icon" />
        <div className="logout" onClick={logout}>
          <LogoutIcon className="m2-icon" />
        </div>
        <img src={url_img} alt="profile-user" className="avatar"></img>
      </div>
    </div>
  );
};

export default DashboardHeader;
