import React, { useState } from "react";

import Hero from "../../images/hero-search.jpg";
import { Button } from "../ButtonElements";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  HeroBg,
  HeroContainer,
  HeroContent,
  HeroH1,
  ImageBg,
  Searchcontainer,
} from "./HeroElements";
import axios from "axios";

const HeroSectionSearch = () => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };
  const navigate = useNavigate();
  const search = () => {
    // removeAuth4();
    navigate("/search");
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    axios
      .post(
        //api/recipes/filter/?criterion=name__contains&name__contains=کباب
        `http://127.0.0.1:8000/api/recipes/filter/?criterion=name__contains&name__contains=${data.name__contains}`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data); //results
      })
      .catch((error) => {
        console.log("error in filter by name");
      });
  };

  return (
    <HeroContainer>
      <HeroBg>
        <ImageBg src={Hero}></ImageBg>
      </HeroBg>
      <HeroContent>
        <HeroH1>غذای مورد علاقت رو سرچ کن!</HeroH1>
        <Searchcontainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <input
                  type="text"
                  placeholder="اسم غذا"
                  class="f-input"
                  {...register("name__contains")}
                />
              </div>
            </div>
            <div className="d-button">
              <button type="submit" className="f-button">
              جست وجو
              </button>
            </div>
          </form>
        </Searchcontainer>
        <div>
          
        </div>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSectionSearch;
