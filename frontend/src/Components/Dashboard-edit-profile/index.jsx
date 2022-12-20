import React from "react";
import { Container } from "./EditProfile";
import DashboardSidebar from "../Dashboard/Dash-sidebar";
import DashboardHeader from "../Dashboard/Dash-header";
import "./edit-profile.css";
import url_img from "./../../images/1.jpg";
const EditProfile = () => {
  return (
    <Container>
      <DashboardSidebar />
      <DashboardHeader />
      <div class="content-edit">
        <p> سلام علی به سایت ما خوش آمدی</p>
        <div class="form-edit">
          <img src={url_img} alt="profile-user" class="avatar2"></img>
          <form>
            <div class="row">
              <div class="col1">
                <label for="fname">نام</label>
                <br />
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  value="John"
                  class="f-input"
                />
              </div>
              <div class="col1">
                <label for="lname">نام خانوادگی</label>
                <br />
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  value="Doe"
                  class="f-input"
                />
              </div>
            </div>
            <div class="row">
              <div class="col1">
                <label for="fname">نام</label>
                <br />
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  value="John"
                  class="f-input"
                />
              </div>
              <div class="col1">
                <label for="lname">نام خانوادگی</label>
                <br />
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  value="Doe"
                  class="f-input"
                />
              </div>
            </div>
            <input type="submit" value="Submit" class="f-button" />
          </form>
        </div>
      </div>
    </Container>
  );
};

export default EditProfile;
