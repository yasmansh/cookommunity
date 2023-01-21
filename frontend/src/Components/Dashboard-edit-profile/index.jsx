import React from "react";
import { useState, useEffect } from "react";
import { Container } from "./EditProfile";
import DashboardSidebar from "../Dashboard/Dash-sidebar";
import DashboardHeader from "../Dashboard/Dash-header";
import "./edit-profile.css";
import url_img from "./../../images/1.jpg";
import { useForm } from "react-hook-form";
import axios from "axios";
const EditProfile = () => {
  const { register, handleSubmit } = useForm();
  let username = localStorage.getItem("isLogin");
  const onSubmit = (data) => {
    axios
      .post(
        "http://127.0.0.1:8000/api/accounts/`{username}`/profile/",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        console.log("DD");
      })
      .catch((error) => {
        console.log("NDD");
      });
  };
  useEffect(() => {
    axios
    .get('http://127.0.0.1:8000/api/accounts/`{username}`/profile/')
    .then((response) => {
      // handle success
      console.log(response.data)
    })
    .catch((error) => {
      // handle error
    })
  });
  return (
    <Container>
      <DashboardSidebar />
      <DashboardHeader />
      <div class="content-edit">
        <p> سلام علی به سایت ما خوش آمدی</p>
        <div class="form-edit">
          <img src={url_img} alt="profile-user" class="avatar2"></img>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="row">
              <div class="col1">
                <label for="fname">نام</label>
                <br />
                <input
                  type="text"
                  placeholder="علی"
                  class="f-input"
                  {...register("first_name")}
                />
              </div>
              <div class="col1">
                <label for="lname">نام خانوادگی</label>
                <br />
                <input
                  type="text"
                  placeholder="جوان"
                  class="f-input"
                  {...register("last_name")}
                />
              </div>
            </div>
            <div class="row">
              <div class="col1">
                <label for="fname">بایو</label>
                <br />
                <input
                  type="text"
                  placeholder="yourbio"
                  class="f-input"
                  {...register("bio")}
                />
              </div>
              <div class="col1">
                <label for="lname">ایمیل</label>
                <br />
                <input
                  type="email"
                  placeholder="yourmail@gmail.com"
                  class="f-input"
                  {...register("email")}
                />
              </div>
            </div>
            <div class="col1">
              <label for="lname">نقش کاربری</label>
              <br />
              <input
                type="text"
                placeholder="user"
                class="f-input"
                {...register("role")}
              />
            </div>
            <input type="submit" class="f-button" />
          </form>
        </div>
      </div>
    </Container>
  );
};

export default EditProfile;
