import React from "react";
import {Sidebar, Image, Mbutton } from "./DashboardElements";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Logo from "../../images/logo-3.png";
import ItemAccordion from "../Items";
import { accordion1 } from "../Items/Data";
import "./Dashboard.css";
const DashboardSidebar = () => {
    return (
        <Sidebar>
          <Image src={Logo} alt="logo" />
          <ul>
            <li>
              <ItemAccordion {...accordion1} />
            </li>
            <li className="div-icon">
              <EditOutlinedIcon class="m-icon" />
              <Mbutton to="/dashboard/edit-profile">ویرایش اطلاعات</Mbutton>
            </li>
            <li className="div-icon">
              <NotificationsOutlinedIcon class="m-icon" />
              <Mbutton  to="/dashboard/promotion">درخواست ارتقا</Mbutton>
            </li>
          </ul>
        </Sidebar>
    );
  };
  
  export default DashboardSidebar;