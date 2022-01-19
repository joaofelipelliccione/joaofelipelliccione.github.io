import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import ToExplore from './pages/ToExplore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreFoodIngredients from './pages/ExploreFoodIngredients';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreDrinkIngredients from './pages/ExploreDrinkIngredients';
import ExploreFoodsByArea from './pages/ExploreFoodsByArea';
import Profile from './pages/Profile';
import RecipesMade from './pages/RecipesMade';
import FoodOrDrinksDetails from './pages/FoodOrDrinksDetails';
import RecipesInProgress from './pages/RecipesInProgress';
import FavoriteRecipes from './pages/FavoriteRecipes';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/comidas/:idReceita" component={ FoodOrDrinksDetails } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/bebidas/:idReceita" component={ FoodOrDrinksDetails } />
        <Route exact path="/explorar" component={ ToExplore } />
        <Route exact path="/explorar/comidas" component={ ExploreFoods } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExploreFoodIngredients }
        />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExploreDrinkIngredients }
        />
        <Route
          exact
          path="/explorar/comidas/area"
          component={ ExploreFoodsByArea }
        />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/receitas-feitas" component={ RecipesMade } />
        <Route
          exact
          path="/comidas/:idReceita/in-progress"
          component={ RecipesInProgress }
        />
        <Route
          exact
          path="/bebidas/:idReceita/in-progress"
          component={ RecipesInProgress }
        />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route component={ NotFound } />
      </Switch>
    </div>
  );
}

export default App;
