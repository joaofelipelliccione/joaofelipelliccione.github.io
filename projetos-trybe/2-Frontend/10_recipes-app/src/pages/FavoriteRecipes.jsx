import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import MealCard from '../components/FavoriteRecipes/MealCard';
import DrinkCard from '../components/FavoriteRecipes/DrinkCard';
import FavoriteRecipesFilters from '../components/FavoriteRecipes/FavoriteRecipesFilters';

function FavoriteRecipes() {
  const favoriteRecipesArr = useSelector((state) => state.user.favoriteRecipes);
  const [favoriteRecipesArray, setfavoriteRecipesArray] = useState(favoriteRecipesArr);

  const isThereSomeMealRecipe = favoriteRecipesArray
    .some(({ type }) => type === 'comida');
  const isThereSomeDrinkRecipe = favoriteRecipesArray
    .some(({ type }) => type === 'bebida');

  const [selectFilter, setSelectFilter] = useState('All');

  // ================================
  React.useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesArr));
  }, [favoriteRecipesArr]);

  React.useEffect(() => {
    setfavoriteRecipesArray(favoriteRecipesArr);
  }, [favoriteRecipesArr]);
  // ==========================
  const onSelectFilter = () => {
    if (selectFilter === 'All') {
      setfavoriteRecipesArray(favoriteRecipesArr);
    }
    if (selectFilter === 'Food') {
      setfavoriteRecipesArray(favoriteRecipesArr
        .filter(({ type }) => type === 'comida'));
    }
    if (selectFilter === 'Drinks') {
      setfavoriteRecipesArray(favoriteRecipesArr
        .filter(({ type }) => type === 'bebida'));
    }
  };

  React.useEffect(() => {
    onSelectFilter();
  }, [selectFilter]);

  return (
    <div>
      <header>
        <Header />
        <FavoriteRecipesFilters
          setSelectFilter={ setSelectFilter }
        />
      </header>
      <section>
        { isThereSomeMealRecipe
        && <MealCard
          favoriteRecipesArray={ favoriteRecipesArray }
        />}
        { isThereSomeDrinkRecipe
        && <DrinkCard
          favoriteRecipesArray={ favoriteRecipesArray }
        />}
      </section>
    </div>
  );
}

export default FavoriteRecipes;
