import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import element from "../../images/nodel-ba-panir.jpg";
import author from "../../images/author.jpg";
import Rating from "@mui/material/Rating";
import PageBanner from "../Banner/PageBanner.js";
function ForumDetail() {
  const [Forum, setForum] = useState({});
  const { ForumID } = useParams();
  // useEffect(() => {
  //   // fetch("http://localhost:9000/movies")
  //   //   .then((res) => res.json())
  //   //   .then((movie) => console.log(movie));
  // }, []);
  return (
    <>
    <PageBanner pageName={"Product Details"} />
    <div className="Forum-detail container">
      <div className="detail-body">
        <div className="Forum-details-content">
          <h2 className="card-title">
            Forum.title
            <span className="release-year"> Forum.release_year</span>
          </h2>
          <div className="author">
            <img src={author} alt="author" />
            <h6>Somala D. Silva</h6>
          </div>
          <div className="rating">
            <Rating name="read-only" value={4} readOnly />
            <span className="price">59.58</span>
          </div>
          <div className="detail-description">
            <p className="card-description">
              {" "}
              Sed ut perspiciatis unde omnis iste natus error silupt atem
              accusantium doloremque laudantium rem riams eaque quae abillo
              inventore quasi architecto beatae vitae dicta sunt explicabo. Nemo
              enim psaml uptatem quia voluptas sit aspernatur aut odit aut fugit
              sedes quia consequuntur magni dolores eos
            </p>
          </div>
          <ul className="category-tags pt-10 pb-5">
            <li>
              <b>Category</b>
              <span>:</span>
              <a href="#">Book</a>
              <a href="#">Cover</a>
              <a href="#">Course</a>
            </li>
            <li>
              <b>Tags</b>
              <span>:</span>
              <a href="#">Learn</a>
              <a href="#">Teach</a>
              <a href="#">Videos</a>
            </li>
          </ul>
        </div>
        <div className="images preview-images">
          <img className="detail-img" src={element} alt="" />
        </div>
      </div>
    
    </div>
    </>
  );
}

export default ForumDetail;
