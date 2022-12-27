import React from "react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import "./Dashboard.css";
import url_img from"./../../images/1.jpg";
const DashboardHeader = () => {
    return (
        <div class="web-header">
        <div class="element">
          <NotificationsOutlinedIcon class="m2-icon" />
          <ChatBubbleOutlineOutlinedIcon class="m2-icon" />
          <ShoppingCartOutlinedIcon class="m2-icon" />
          <img src={url_img} alt="profile-user" class="avatar"></img>
        </div>
      </div>
    );
  };
  
  export default DashboardHeader;