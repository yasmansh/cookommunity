import React, { useState, useEffect  } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar-second";
//import axios from "axios";
import chief_profile_img from "../../images/chief_profile.jpg";
import {
  ChiefCard,
  ChiefContainer,
  ChiefH1,
  ChiefH2,
  ChiefImage,
  ChiefP,
  ChiefWrapper,
} from "./chief_profile";

const ChiefProfile = () => {
    let chief = "ysh";//localStorage.getItem("chief");
    var chiefDetail={};
    // useEffect(() => {
    //     axios
    //       .get(`http://127.0.0.1:8000/api/accounts/${chief}/profile/`)
    //       .then((response) => {
    //         chiefDetail = response.data;
    //       })
    //       .catch((error) => {
    //         console.log("error - ChiefProfile");
    //       });
    //   },[]);
    return (
        <>
        <Sidebar/>
        <Navbar />
        <ChiefContainer>
        <ChiefH1>پروفایل آشپز</ChiefH1>
        <ChiefWrapper>
          <ChiefCard>
            <ChiefImage src={chief_profile_img}></ChiefImage>
            <ChiefH2>اسم فامیل</ChiefH2>
            <ChiefP>
              بیوی اشپز
              cccccccccccccccccccccccccccccccccccccc
              cccccccccccccccccccccccccccccccccccccccc
              <br/>
              cccccccccccccccccccccccccccccccccccc
            </ChiefP>
          </ChiefCard>
        </ChiefWrapper>
      </ChiefContainer>
        
        </>
    );
};

export default ChiefProfile;
