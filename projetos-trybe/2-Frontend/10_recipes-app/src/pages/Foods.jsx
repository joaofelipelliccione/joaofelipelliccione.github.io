import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchCategoriesMeals as fetchFoodCategories,
  fetchMeals as fetchMealsThunk } from '../redux/actions/apiAC';
import Header from '../components/Header';
import FoodCategoriesFilter from '../components/FoodCategoriesFilter';
import FoodCard from '../components/FoodCard';
import Footer from '../components/Footer';

function Foods() {
  const MEALS_CAT_END_POINT = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const mealsArray = useSelector((state) => state.foodsAndDrinks.meals);
  const history = useHistory();
  const dispatch = useDispatch();
  const [isCategoryPressed, setIsCategoryPressed] = React.useState(false);

  React.useEffect(() => {
    if (mealsArray.length === 1 && !isCategoryPressed) {
      history.push(`/comidas/${mealsArray[0].idMeal}`);
    }
  }, [mealsArray, history]);

  React.useEffect(() => {
    const lastMealIngExploredLs = localStorage.getItem('lastMealIngExplored');

    dispatch(fetchFoodCategories(MEALS_CAT_END_POINT));
    dispatch(fetchMealsThunk('https://www.themealdb.com/api/json/v1/1/search.php?s='));

    if (lastMealIngExploredLs !== null && lastMealIngExploredLs !== '') {
      dispatch(fetchMealsThunk(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${lastMealIngExploredLs}`));
      localStorage.setItem('lastMealIngExplored', '');
    }
  }, []);

  return (
    <div>
      <Header />
      <FoodCategoriesFilter
        setIsCategoryPressed={ setIsCategoryPressed }
      />
      <FoodCard
        mealsArray={ mealsArray }
      />
      <Footer />
    </div>
  );
}

export default Foods;
