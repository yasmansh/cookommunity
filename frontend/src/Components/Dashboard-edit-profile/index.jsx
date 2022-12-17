import React from "react";
import { Container, Sidebar, Image,Mbutton } from "./EditProfile";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Logo from "../../images/logo-3.png";
import ItemAccordion from "../Items";
import { accordion1 } from "../Items/Data";
import "./EditProfile.css";
const EditProfile = () => {
  return (
    <Container>
      <Sidebar>
        <Image src={Logo} alt="logo" />
        <ul>
          <li>
            <ItemAccordion {...accordion1} />
          </li>
          <li>
          <Mbutton  to="/dashboard-edit-profile">ویرایش اطلاعات</Mbutton>
          </li>
          <li>
          <Mbutton  to="/Signin">درخواست ارتقا</Mbutton>
          </li>
        </ul>
      </Sidebar>
      <div class="web-header">Hello word</div>
    </Container>
  );
};

export default EditProfile;
