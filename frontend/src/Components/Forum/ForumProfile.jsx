import React, { useState, useEffect } from "react";
import ForumCard from "./ForumCard";
import Grid from "@mui/material/Grid";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar-second";
import chief_profile_img from "../../images/chief_profile.jpg";
import { DataGrid } from "@mui/x-data-grid";

import "./Forum.css";
import {
  ChiefCard,
  ChiefContainer,
  ChiefH1,
  ChiefH2,
  ChiefImage,
  ChiefP,
  ChiefWrapper,
} from "./ForumStyle";

function ForumProfile({ Forums }) {
  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];
  const [chiefDetail, setChiefDetail] = useState({ username: "first" });
  let chief = "ysh"; //localStorage.getItem("chief");
  useEffect(() => {
    const url = `http://127.0.0.1:8000/api/accounts/${chief}/profile/`;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setChiefDetail(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);
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
              </ChiefCard>
            </ChiefWrapper>
          </ChiefContainer>
        </Grid>
        <Grid container item spacing={2} xs={12} sm={12} md={9}>
          <Grid item xs={12} sm={12} md={12}>
            <div className="forum_body_area">
              <input
                type="text"
                class="form-control"
                placeholder="Your work email"
              ></input>
              <button class="btn btn-outline-secondary"></button>
              <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={100}
                rowsPerPageOptions={[50]}
                checkboxSelection={false}
              />
            </div>
            </div>
           
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default ForumProfile;
