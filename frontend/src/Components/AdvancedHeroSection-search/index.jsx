import React, { useState, useEffect  } from "react";
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
  HeroLabel,
  ImageBg,
  Searchcontainer,
  ArrowForward,
  ArrowRight,
} from "./AdvancedHeroElements";
import axios from "axios";
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MultiSelect } from "react-multi-select-component";


// Enum: FoodCategory
const FoodCategoryOptions = [
  {
    value: "",
    label: "همه",
  },
  {
    value: "1",
    label: "آسیایی",
  },
  {
    value: "2",
    label: "دریایی",
  },
  {
    value: "3",
    label: "گیاهی",
  },
  {
    value: "4",
    label: "کباب",
  },
  {
    value: "5",
    label: "ایرانی",
  },
  {
    value: "6",
    label: "فست فود",
  },
];
// selected value:  {category}
const FoodCategoryMultipleCheckBoxComponent = () => {
  const [category, setCategory] = useState("");
  function handleChange(event) {
    setCategory(event.target.value);
  }
  return (
    <div>
      <HeroLabel for="category">دسته‌ی غذایی: &emsp;   </HeroLabel>
      <select 
        value={category} 
        onChange={handleChange}
        name="category"
        id="category"
        style={{borderRadius: '25px', textAlign: 'center', width: '55%',  fontSize: '16px'}}>
            {FoodCategoryOptions.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
      </select>
    </div>
  );
};

// Enum: DifficultyType
//selected value: {difficulty}
const Difficulty = () => {
  const [difficulty, setDifficulty] = useState("");
  function onChangeValue(event) {
    setDifficulty(event.target.value);
  }

  return (
    <div>
      <HeroLabel>درجه‌ی سختی: </HeroLabel>
      <br/>
      <div onChange={onChangeValue}>
        <input type="radio" value="" name="difficulty" checked={difficulty === ""} /> همه &emsp;
        <input type="radio" value="1" name="difficulty" checked={difficulty === "1"} /> آسان &emsp;
        <input type="radio" value="2" name="difficulty" checked={difficulty === "2"}/> متوسط &emsp;
        <input type="radio" value="3" name="difficulty" checked={difficulty === "3"} /> سخت 
      </div>
    </div>
  );
};

// Enum: DurationType
//selected value: {preparation_time}
const PreparationTime = () => {
  const [preparation_time, setPreparation_time] = useState("");
  function onChangeValue(event) {
    setPreparation_time(event.target.value);
  }

  return (
    <div>
      <HeroLabel>مدت زمان آماده شدن: </HeroLabel>
      <br/>
      <div onChange={onChangeValue}>
        <input type="radio" value="" name="preparation_time" checked={preparation_time === ""} /> همه &emsp;
        <input type="radio" value="1" name="preparation_time" checked={preparation_time === "1"} /> زمان‌بر &emsp;
        <input type="radio" value="2" name="preparation_time" checked={preparation_time === "2"}/> معمولی &emsp;
        <input type="radio" value="3" name="preparation_time" checked={preparation_time === "3"} /> سریع! 
      </div>
    </div>
  );
};


//Selected Ingredients : {JSON.stringify(selectedIngredients)}
const Ingredients = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
 
  const url = 'http://127.0.0.1:8000/api/foodstuffs/';  //View Foodstuffs
  const [ingredientList, setingredientList] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setingredientList([...data]))
      .then(setisLoading(false));
  }, []);
 

  return (
    <div>
      {isLoading ? (
        <div className='spinner-border text-primary' role='status'>
          {' '}
          <span className='sr-only'>در حال دریافت اطلاعات...</span>{' '}
        </div>
        ) : (
          <div></div>
        )
      }

      <HeroLabel>مواد غذایی: </HeroLabel>
      <br/>
      <div style={{maxWidth: '330px', margin: 'auto'}}>
        <MultiSelect
          value={selectedIngredients}
          onChange={setSelectedIngredients}
          options={ingredientList}
          labelledBy="انتخاب کنید"
          hasSelectAll={false}
          style={{borderRadius: '35px', textAlign: 'center', fontSize: '16px'}}
        />
      </div>
      {/* <DropdownButton
      alignRight
      Multiselect
      title="مواد غذایی"
      id="Ingredients"
      name="Ingredients"
      onSelect={handleSelect}
        >
              <Dropdown.Item eventKey="" active>همه</Dropdown.Item>
              <Dropdown.Divider />
              {ingredientList.map((data, key) => {
                return(
                  <Dropdown.Item eventKey={data.name}>{data.name}</Dropdown.Item>
                );
              })}
      </DropdownButton>
      <p>You selected {value}</p> */}

      {/* <Select
        id="Ingredients"
        name="Ingredients"
        placeholder="انتخاب کنید"
        value={selectedIngredients}
        onChange={handleChange}
        options=
          {ingredientList.map((data, key) => {
            return(
              <option value="{data.name}">{data.name}</option>
            );
          })}
        isSearchable
        isMulti 
      /> */}
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
                  placeholder="شامل چه تگ‌هایی باشد؟  مثلا: #صبحانه"
                  id="meal_tags"
                  class="f-input"
                  style={{textAlign: 'center', width: '100%',  fontSize: '14px'}}
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
