import React from "react";
import { Container} from "./DashboardElements";
import "./Dashboard.css";
import DashboardSidebar from "./Dash-sidebar";
import DashboardHeader from "./Dash-header";
const DashboardForm = () => {
  return (
    <Container>
      <DashboardSidebar/>
      <DashboardHeader/>
    </Container>
  );
};

export default DashboardForm;
