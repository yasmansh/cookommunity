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
  return (
    <HeroContainer>
      <HeroBg>
        <ImageBg src={Hero}></ImageBg>
      </HeroBg>
      <HeroContent>
        <HeroH1>غذای مورد علاقت رو سرچ کن!</HeroH1>
        <Searchcontainer>
          <form onSubmit={console.log("A")}>
            <div>
              <div>
                <input
                  type="text"
                  placeholder="اسم غذا"
                  class="f-input"
                  {...register("first_name")}
                />
              </div>
            </div>
            <div className="d-button">
              <button type="button" className="f-button">
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
