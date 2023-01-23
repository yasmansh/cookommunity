import React from "react";
import { Container} from "./DashboardElements";
import "./Dashboard.css";
import DashboardSidebar from "./Dash-sidebar";
import DashboardHeader from "./Dash-header";
const DashboardForm = ({removeAuth}) => {
  return (
    <Container>
      <DashboardSidebar/>
      <DashboardHeader removeAuth={removeAuth}/>
    </Container>
  );
};

export default DashboardForm;
