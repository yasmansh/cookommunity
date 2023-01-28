import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import element from "../../images/nodel-ba-panir.jpg";
import author from "../../images/author.jpg";
import Rating from "@mui/material/Rating";
import PageBanner from "../Banner/PageBanner.js";
import chief_profile_img from "../../images/chief_profile.jpg";
import {
  ChiefCard,
  ChiefContainer,
  ChiefH1,
  ChiefH2,
  ChiefImage,
  ChiefP,
  ChiefWrapper,
} from "./ForumStyle";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar-second";
import Grid from "@mui/material/Grid";
function ForumDetail() {
  const [Forum, setForum] = useState({});
  const [chiefDetail, setChiefDetail] = useState({});
  const { ForumID } = useParams();
  // useEffect(() => {
  //   // fetch("http://localhost:9000/movies")
  //   //   .then((res) => res.json())
  //   //   .then((movie) => console.log(movie));
  // }, []);
  return (
    <>
       <Sidebar />
      <Navbar />
      <Grid container spacing={2}>
        <Grid container item spacing={2} xs={12} sm={12} md={3}>
          <Grid item xs={12} sm={12} md={12}></Grid>
          <ChiefContainer>
            <ChiefH1>پروفایل آشپز {chiefDetail.username}</ChiefH1>
            <ChiefWrapper>
              <ChiefCard>
                <ChiefImage src={chief_profile_img}></ChiefImage>
                <ChiefH2>
                  {chiefDetail.first_name} {chiefDetail.last_name}
                </ChiefH2>
                <ChiefP>{chiefDetail.bio}</ChiefP>

                <a
                  href={
                    "mailto: " +
                    chiefDetail.email +
                    "?subject=Mail from Cookommunity"
                  }
                >
                  سوالات خود را بپرسید!
                </a>
                <button class="mbtn">دنبال کن !</button>
                <button class="mbtn2">دنبال نکن :(</button>
              </ChiefCard>
            </ChiefWrapper>
          </ChiefContainer>
        </Grid>
        <Grid container item spacing={2} xs={12} sm={12} md={9}>
          <Grid item xs={12} sm={12} md={12}>
            <div className="forum_body_area">
              <div style={{ height: 400, width: "100%" }}>
                {/* <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={100}
                  rowsPerPageOptions={[50]}
                  checkboxSelection={false}
                /> */}
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default ForumDetail;
