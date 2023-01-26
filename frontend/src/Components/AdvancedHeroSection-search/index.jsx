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
  HeroLi,
  ImageBg,
  Searchcontainer,
  ArrowForward,
  ArrowRight,
} from "./AdvancedHeroElements";
import axios from "axios";
import Select from 'react-select';


interface FoodCategory {
  name: string;
  value: number;
}

const MyCheckBoxList: FoodCategory[] = [
  {
    value: 1,
    name: "آسیایی",
  },
  {
    value: 2,
    name: "دریایی",
  },
  {
    value: 3,
    name: "گیاهی",
  },
  {
    value: 4,
    name: "کباب",
  },
  {
    value: 5,
    name: "ایرانی",
  },
  {
    value: 6,
    name: "فست فود",
  },
];


const FoodCategoryMultipleCheckBoxComponent = () => {
  const [checkedFoodCategory, setFoodCategoryChecked] = useState(false);
  const handleClick = () => setFoodCategoryChecked(!checkedFoodCategory)
  return (
    <div>
      <label>دسته‌ی غذایی: </label>
      <br/>
      <ul>
        {MyCheckBoxList.map(({ name, value }, index) => {
          if(index == 3)
            return (
              <HeroLi key={index}  onClick={handleClick}>
                  <br/>
                  <input
                      type="checkbox"
                      id={`category-${index+1}`}
                      name={name}
                      value={value}
                    />
                  <label for={index}>  {name}</label>
              </HeroLi>
            );
          else
            return (
              <HeroLi key={index}  onClick={handleClick}>
                  <input
                      type="checkbox"
                      id={`category-${index+1}`}
                      name={name}
                      value={value}
                    />
                  <label for={index}>  {name}</label>
              </HeroLi>
            );
        })}
      </ul>
    </div>
  );
};

const DifficultyTypes = [
  { value: "", label: 'همه' },
  { value: "1", label: 'آسان' },
  { value: "2", label: 'متوسط' },
  { value: "3", label: 'سخت' },
];
//$('#DifficultyTypes div>div>div').textContent
const Difficulty = () => {
  const [selectedDifficultyType, setSelectedDifficultyType] = useState(null);

  return (
    <div>
      <label>میزان سختی: </label>
      <br/>
      <Select
        id="DifficultyTypes"
        placeholder="همه"
        defaultValue={selectedDifficultyType}
        onChange={setSelectedDifficultyType}
        options={DifficultyTypes}
      />
    </div>
  );
};

const DurationType = [
  { value: "", label: 'همه' },
  { value: "1", label: 'زمان‌بر' },
  { value: "2", label: 'معمولی' },
  { value: "3", label: 'سریع!' },
];
//$('#PreparationTime div>div>div').textContent
const PreparationTime = () => {
  const [selectedPreparationTime, setSelectedPreparationTime] = useState(null);

  return (
    <div>
      <label>مدت زمان آماده شدن: </label>
      <br/>
      <Select
        id="PreparationTime"
        placeholder="همه"
        defaultValue={selectedPreparationTime}
        onChange={setSelectedPreparationTime}
        options={DurationType}
        isSearchable
      />
    </div>
  );
};

const IngredientOptions = [
  { value: "beef", label: 'beef' },
  { value: "rice", label: 'برنج' },
];
//$('#Ingredients div>div>div').textContent
const Ingredients = () => {
  const [selectedIngredients, setSelectedIngredients] = useState(null);

  return (
    <div>
      <label>مواد غذایی: </label>
      <br/>
      <Select
        id="Ingredients"
        placeholder="انتخاب کنید"
        defaultValue={selectedIngredients}
        onChange={setSelectedIngredients}
        options={IngredientOptions}
        isSearchable
        isMulti 
      />
    </div>
  );
};


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
    debugger;
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
              
              <br/>
              <FoodCategoryMultipleCheckBoxComponent/>
              <br/>
              <Difficulty/>
              <br/>
              <PreparationTime/>
              <br/>
              <div> 
                <input
                  type="text"
                  placeholder="شامل چه تگ‌هایی باشد؟   "
                  id="meal_tags"
                  class="f-input"
                  {...register("meal_tags")}
                />
              </div>
              <br/>
              <Ingredients/>
            </div>

            <div className="d-button">
              <button type="submit" className="f-button">
              پیدا کن!
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
