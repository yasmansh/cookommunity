import React from "react";
import { useState, useEffect } from "react";
import { Container } from "./EditProfile";
import DashboardSidebar from "../Dashboard/Dash-sidebar";
import DashboardHeader from "../Dashboard/Dash-header";
import "./edit-profile.css";
import url_img from "./../../images/1.jpg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_API, check_error, ROLES } from "../../App";
import Grid from "@mui/material/Grid";
const EditProfile = ({ removeAuth }) => {
  const { register, handleSubmit } = useForm();
  let username = JSON.parse(localStorage.getItem("username"));
  const [user, setUser] = useState(null);
  const onSubmit = (data) => {
    if (data.email === "") data.email = user.email;
    if (data.first_name === "") data.first_name = user.first_name;
    if (data.last_name === "") data.last_name = user.last_name;
    console.log(data);
    axios
      .patch(
        BASE_API + `accounts/${username}/profile/?username=${username}`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (check_error(response.data)) alert(response.data.err_msg);
        else setUser(response.data);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    axios
      .get(BASE_API + `accounts/${username}/profile/?username=${username}`)
      .then((response) => {
        if (check_error(response.data)) alert(response.data.err_msg);
        else setUser(response.data);
      })
      .catch((error) => {});
  }, []);
  return (
    <Grid container spacing={2}>
      <Container>
        <Grid container item spacing={2} xs={12} sm={12} md={3}>
        <Grid item xs={12} sm={12} md={12}>
          <DashboardSidebar />
        </Grid>
        </Grid>
        <Grid container item spacing={2} xs={12} sm={12} md={9}>
          <Grid item xs={12} sm={12} md={12}>
            <DashboardHeader />
            {user && (
              <div className="content-edit2">
                <p> سلام {user.first_name} به سایت ما خوش آمدی</p>
                <div className="form-edit2">
                  <form
                    className="edit_profile2"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="row2">
                      <div className="col12">
                        <label htmlFor="fname">نام</label>
                        <br />
                        <input
                          type="text"
                          placeholder={user.first_name}
                          className="f-input"
                          {...register("first_name")}
                        />
                      </div>
                      <div className="col12">
                        <label htmlFor="lname">نام خانوادگی</label>
                        <br />
                        <input
                          type="text"
                          placeholder={user.last_name}
                          className="f-input2"
                          {...register("last_name")}
                        />
                      </div>
                    </div>
                    <div className="row2">
                      <div className="col12">
                        <label htmlFor="lname">ایمیل</label>
                        <br />
                        <input
                          type="email"
                          placeholder={user.email}
                          className="f-input"
                          {...register("email")}
                        />
                      </div>
                    </div>
                    <div className="col12">
                      <label htmlFor="lname">نقش کاربری</label>
                      <br />
                      <input
                        type="text"
                        value={ROLES[user.role]}
                        className="f-input"
                        readOnly={true}
                      />
                    </div>
                    <div className="d-button2">
                      <button type="submit" className="f-button">
                        ویرایش
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default EditProfile;
