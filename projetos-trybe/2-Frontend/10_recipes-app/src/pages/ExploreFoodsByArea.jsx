import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodCard from '../components/FoodCard';

function ExploreFoodsByArea() {
  const [allMealAreas, setAllMealAreas] = React.useState([]);
  const [chosenArea, setChosenArea] = React.useState('All');
  const [mealsArray, setMealsArray] = React.useState([]);

  const getAllMealAreas = async () => {
    const END_POINT = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const response = await fetch(END_POINT);
    const jsonFormat = await response.json();
    setAllMealAreas(jsonFormat.meals);
  };

  const getAllMeals = async () => {
    const END_POINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(END_POINT);
    const jsonFormat = await response.json();
    setMealsArray(jsonFormat.meals);
  };

  const getAllMealsByArea = async () => {
    const END_POINT = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${chosenArea}`;
    const response = await fetch(END_POINT);
    const jsonFormat = await response.json();
    setMealsArray(jsonFormat.meals);
  };

  React.useEffect(() => {
    getAllMealAreas();
    getAllMeals();
  }, []);

  React.useEffect(() => {
    if (chosenArea === 'All') {
      getAllMeals();
    }
    if (chosenArea !== 'All') {
      getAllMealsByArea();
    }
  }, [chosenArea]);

  return (
    <div>
      <Header />
      <section>
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ ({ target }) => setChosenArea(target.value) }
        >
          <option data-testid="All-option">All</option>
          {allMealAreas.map(({ strArea }) => (
            <option
              key={ strArea }
              data-testid={ `${strArea}-option` }
            >
              {strArea}
            </option>
          ))}
        </select>
      </section>
      <FoodCard
        mealsArray={ mealsArray }
      />
      <Footer />
    </div>
  );
}

export default ExploreFoodsByArea;
