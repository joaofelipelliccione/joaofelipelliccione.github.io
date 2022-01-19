import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import RecipesMadeFilters from '../components/RecipesMadeComponents/RecipesMadeFilters';
import MealMadeCard from '../components/RecipesMadeComponents/MealMadeCard';
import DrinkMadeCard from '../components/RecipesMadeComponents/DrinkMadeCard';

function RecipesMade() {
  const inProgressRecipesObj = useSelector((state) => state.user.inProgressRecipes);

  const doneRecipesArrayFromRedux = useSelector((state) => state.user.doneRecipes);
  const [doneRecipesArray, setDoneRecipesArray] = React
    .useState(doneRecipesArrayFromRedux);

  const isThereSomeMealRecipe = doneRecipesArray.some(({ type }) => type === 'comida');
  const isThereSomeDrinkRecipe = doneRecipesArray.some(({ type }) => type === 'bebida');

  const [selectFilter, setSelectFilter] = React.useState('All');

  // ==========================IN-PROGRESS-RECIPES-LS // DONE-RECIPES-LS=======================
  React.useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesArray));
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipesObj));
  }, [doneRecipesArray]);
  // =========================================================================================

  // ==========================LÓGICA-FILTROS================================================
  const onSelectFilter = () => {
    if (selectFilter === 'All') {
      setDoneRecipesArray(doneRecipesArrayFromRedux);
    }
    if (selectFilter === 'Food') {
      setDoneRecipesArray(doneRecipesArrayFromRedux
        .filter(({ type }) => type === 'comida'));
    }
    if (selectFilter === 'Drinks') {
      setDoneRecipesArray(doneRecipesArrayFromRedux
        .filter(({ type }) => type === 'bebida'));
    }
  };

  React.useEffect(() => {
    onSelectFilter();
  }, [selectFilter]);
  // =========================================================================================

  return (
    <div>
      <header>
        <Header />
        <RecipesMadeFilters
          setSelectFilter={ setSelectFilter }
        />
      </header>
      <section>
        {isThereSomeMealRecipe
        && <MealMadeCard
          doneRecipesArray={ doneRecipesArray }
        />}
        {isThereSomeDrinkRecipe
        && <DrinkMadeCard
          doneRecipesArray={ doneRecipesArray }
        />}
      </section>
    </div>
  );
}

export default RecipesMade;
