import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FoodList from "./FoodList";
import element from "../../images/image_(1).svg";
import Rating from "@mui/material/Rating";
import Grid from "@mui/material/Grid";
import "./Food.css";
function Foods() {
  const [foods, setFoods] = useState([]);

  //   useEffect(() => {
  //     fetch("http://localhost:9000/movies")
  //       .then((res) => res.json())
  //       .then((movies) => setMovies(movies));
  //   }, []);

  return (
    <>
      {/* <FoodList foods={foods} /> */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <div className="product-item">
            <div className="product-image">
              <img id="m-product-image" src={element} alt="Products" />
              <br />
              <Link href="/contact">
                <a className="cart-btn">add to cart</a>
              </Link>
            </div>
            <div className="product-content">
              <h6>
                <Link href="/product-details">PSD Book Mockup</Link>
              </h6>
              <span className="category">Medical Equipment</span>
              <div className="ratting">
                <Rating name="read-only" value={4} readOnly />
              </div>
              <span className="price">
                <span>53.56</span>
              </span>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div className="product-item">
            <div className="product-image">
              <img id="m-product-image" src={element} alt="Products" />
              <Link href="/contact">
                <a className="cart-btn">add to cart</a>
              </Link>
            </div>
            <div className="product-content">
              <h6>
                <Link href="/product-details">PSD Book Mockup</Link>
              </h6>
              <span className="category">Medical Equipment</span>
              <div className="ratting">
                <Rating name="read-only" value={4} readOnly />
              </div>
              <span className="price">
                <span>53.56</span>
              </span>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div className="product-item">
            <div className="product-image">
              <img id="m-product-image" src={element} alt="Products" />
              <br />
              <Link href="/contact">
                <a className="cart-btn">add to cart</a>
              </Link>
            </div>
            <div className="product-content">
              <h6>
                <Link href="/product-details">PSD Book Mockup</Link>
              </h6>
              <span className="category">Medical Equipment</span>
              <div className="ratting">
                <Rating name="read-only" value={4} readOnly />
              </div>
              <span className="price">
                <span>53.56</span>
              </span>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default Foods;
