import React from 'react'
import FoodCard from './FoodCard'

function FoodList({foods }) {
  return (
    <div className="card-list container">
      {foods.map((food) => (
        <FoodCard key={food.id} food={food} />
      ))}
    </div>
  )
}

export default FoodList
