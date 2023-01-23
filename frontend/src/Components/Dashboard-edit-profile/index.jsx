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
  let username = localStorage.getItem("username");
  var userDetail={};
  const onSubmit = (data) => {
    axios
      .post(
        `http://127.0.0.1:8000/api/accounts/${username}/profile/`,
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
      .get(`http://127.0.0.1:8000/api/accounts/${username}/profile/`)
      .then((response) => {
        userDetail = response.data;
        // console.log(userDetail.first_name);
        //todo
      })
      .catch((error) => {
        // handle error
      });
  },[]);
  return (
    <Container>
      <DashboardSidebar />
      <DashboardHeader />
      <div className="content-edit">
        <p> سلام علی به سایت ما خوش آمدی</p>
        <div className="form-edit">
          <img src={url_img} alt="profile-user" className="avatar2"></img>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col1">
                <label htmlFor="fname">نام</label>
                <br />
                <input
                  type="text"
                  // placeholder={JSON.stringify(userDetail.first_name)}
                  className="f-input"
                  {...register("first_name")}
                />
              </div>
              <div className="col1">
                <label htmlFor="lname">نام خانوادگی</label>
                <br />
                <input
                  type="text"
                  // placeholder="جوان"
                  className="f-input"
                  {...register("last_name")}
                />
              </div>
            </div>
            <div className="row">
              <div className="col1">
                <label htmlFor="fname">بایو</label>
                <br />
                <input
                  type="text"
                  // placeholder="yourbio"
                  className="f-input"
                  {...register("bio")}
                />
              </div>
              <div className="col1">
                <label htmlFor="lname">ایمیل</label>
                <br />
                <input
                  type="email"
                  // placeholder="yourmail@gmail.com"
                  className="f-input"
                  {...register("email")}
                />
              </div>
            </div>
            <div className="col1">
              <label htmlFor="lname">نقش کاربری</label>
              <br />
              <input
                type="text"
                placeholder="user"
                className="f-input"
                {...register("role")}
              />
            </div>
            <input type="submit" className="f-button" />
          </form>
        </div>
      </div>
    </Container>
  );
};

export default EditProfile;
