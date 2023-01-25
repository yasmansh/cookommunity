import React, { useState } from "react";
import Hero from "../../images/hero2.jpg";
import { useForm } from "react-hook-form";
import { Button } from "../ButtonElements";
import {useNavigate}  from 'react-router-dom';
import {
  HeroBg,
  HeroContainer,
  HeroContent,
  HeroH1,
  ImageBg,
  Searchcontainer,
  ArrowForward,
  ArrowRight,
} from "./AdvancedHeroElements";
import axios from "axios";

const HeroSectionSearch = () => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };
  const navigate = useNavigate();
  const search = () => {
    navigate('/search');
  }
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    axios
      .post(
        `http://127.0.0.1:8000/api/recipes/advanced_filter/`,
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
//TODO
  return (
    <HeroContainer>
      <HeroBg>
        <ImageBg src={Hero}></ImageBg>
      </HeroBg>
      <HeroContent>
        <HeroH1>جست و جوی پیشرفته!</HeroH1>
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
        <br/>
        <div>
            <Button onClick={search} primary={+true} onMouseEnter={onHover} onMouseLeave={onHover} dark={+true}>
                جستجوی ساده{hover ? <ArrowForward /> : <ArrowRight />}
            </Button>
        </div>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSectionSearch;
