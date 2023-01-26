import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FoodList from "./FoodList";
import element from "../../images/logo-3.png";
import Rating from "@mui/material/Rating";
import Grid from "@mui/material/Grid";
import "./Food.css";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Footer from "../Footer";
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
      <Sidebar />
      <Navbar />
      <Grid container spacing={2}>
        <Grid container item spacing={2} xs={12} sm={12} md={3}>
          <Grid item xs={12} sm={12} md={12}>
            <div className="widget widget-menu wow fadeInUp delay-0-4s">
              <h4 className="widget-title">Category</h4>
              <ul>
                <li>
                  <Link href="/course-list">
                    <a>Business Coach </a>
                  </Link>{" "}
                  <span>(25)</span>
                </li>
                <li>
                  <Link href="/course-list">
                    <a>Life Coach </a>
                  </Link>{" "}
                  <span>(07)</span>
                </li>
                <li>
                  <Link href="/course-list">
                    <a>Health Coach </a>
                  </Link>{" "}
                  <span>(12)</span>
                </li>
                <li>
                  <Link href="/course-list">
                    <a>Web Design </a>
                  </Link>{" "}
                  <span>(55)</span>
                </li>
                <li>
                  <Link href="/course-list">
                    <a>Web Development </a>
                  </Link>{" "}
                  <span>(14)</span>
                </li>
                <li>
                  <Link href="/course-list">
                    <a>SEO Optimizations </a>
                  </Link>{" "}
                  <span>(30)</span>
                </li>
                <li>
                  <Link href="/course-list">
                    <a>Digital Analysis </a>
                  </Link>{" "}
                  <span>(18)</span>
                </li>
              </ul>
            </div>
          </Grid>
        </Grid>
        <Grid container item spacing={2} xs={12} sm={12} md={9}>
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
      </Grid>
    </>
  );
}

export default Foods;
