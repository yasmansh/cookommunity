import React from "react";
import { Container, Sidebar, Image, Mbutton } from "./DashboardElements";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Logo from "../../images/logo-3.png";
import ItemAccordion from "../Items";
import { accordion1 } from "../Items/Data";
import "./Dashboard.css";
import url_img from"./../../images/1.jpg";
const DashboardForm = () => {
  return (
    <Container>
      <Sidebar>
        <Image src={Logo} alt="logo" />
        <ul>
          <li>
            <ItemAccordion {...accordion1} />
          </li>
          <li class="div-icon">
            <EditOutlinedIcon class="m-icon" />
            <Mbutton to="/Signin">ویرایش اطلاعات</Mbutton>
          </li>
          <li class="div-icon">
            <NotificationsOutlinedIcon class="m-icon" />
            <h3>علاقه مندی ها</h3>
          </li>
        </ul>
      </Sidebar>
      <div class="web-header">
        <div>
          <NotificationsOutlinedIcon class="m2-icon" />
          <ChatBubbleOutlineOutlinedIcon class="m2-icon" />
          <ShoppingCartOutlinedIcon class="m2-icon" />
          <img src={url_img} alt="profile-user" class="avatar"></img>
        </div>
      </div>
    </Container>
  );
};

export default DashboardForm;
