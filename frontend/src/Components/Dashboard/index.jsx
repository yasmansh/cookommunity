import React from "react";
import { Container} from "./DashboardElements";
import "./Dashboard.css";
import DashboardSidebar from "./Dash-sidebar";
import DashboardHeader from "./Dash-header";
const DashboardForm = ({removeAuth3}) => {
  return (
    <Container>
      <DashboardSidebar/>
      <DashboardHeader removeAuth4={removeAuth3}/>
    </Container>
  );
};

export default DashboardForm;
