import React from "react";
import { Link } from "react-router-dom";
function FoodCard({ food }) {
  return (
    <div className="food-card">
      <img className="card-img" src={food.imageUrl} alt="" />
      <div className="card-body">
        <Link to={`/foods/${food.id}`}>
          <h2 className="card-title">{food.title}</h2>
        </Link>
        <p className="card-description">{food.short_description}</p>
      </div>
    </div>
  );
}

export default FoodCard;
