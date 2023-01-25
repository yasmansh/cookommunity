// import { response } from "express";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function FoodDetail() {
  const [food, setFood] = useState({});
  // const { MovieID } = useParams();
  // useEffect(() => {
  //   // fetch("http://localhost:9000/movies")
  //   //   .then((res) => res.json())
  //   //   .then((movie) => console.log(movie));
  // }, []);
  return (
    <div className="food-detail container">
      <div className="detail-body">
        <div>
          <h2 className="card-title">
            {food.title}
            <span className="release-year"> {food.release_year}</span>
          </h2>
          <div className="detail-description">
            <p className="card-description">{food.description}</p>
          </div>
        </div>
        <div className="images">
          <img className="detail-img" src={food.image} alt="" />
        </div>
      </div>
    </div>
  );
}

export default FoodDetail;
