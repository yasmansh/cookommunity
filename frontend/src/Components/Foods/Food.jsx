import React, { useEffect, useState } from "react";
import FoodList from "./FoodList";

function Foods() {
  const [foods, setFoods] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:9000/movies")
//       .then((res) => res.json())
//       .then((movies) => setMovies(movies));
//   }, []);

  return (
    // <p>alllllllll</p>
    <div className="container">
      {/* <p>hello</p> */}
      <FoodList foods={foods} />
    </div>
  );
}

export default Foods;
