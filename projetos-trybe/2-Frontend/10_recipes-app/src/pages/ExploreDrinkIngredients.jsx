import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreDrinkIngredients() {
  const eleven = 11;
  const [allDrinkIngredientsArr, setAllDrinkIngredientsArr] = React.useState([]);

  const getAllDrinksIngredients = async () => {
    const END_POINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const response = await fetch(END_POINT);
    const jsonFormat = await response.json();
    setAllDrinkIngredientsArr(jsonFormat.drinks);
  };

  React.useEffect(() => {
    getAllDrinksIngredients();
  }, []);

  return (
    <div>
      <Header />
      <section>
        <Link
          to="/bebidas"
        >
          {allDrinkIngredientsArr.filter((_ing, index) => index <= eleven)
            .map(({ strIngredient1 }, ind) => (
              <div
                data-testid={ `${ind}-ingredient-card` }
                key={ ind }
                onClick={ () => localStorage
                  .setItem('lastDrinkIngExplored', strIngredient1) }
                onKeyPress={ () => localStorage
                  .setItem('lastDrinkIngExplored', strIngredient1) }
                role="button"
                tabIndex={ 0 }
              >
                <img
                  data-testid={ `${ind}-card-img` }
                  src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                  alt="Foto do Ingrediente"
                />
                <h4 data-testid={ `${ind}-card-name` }>{strIngredient1}</h4>
              </div>
            ))}
        </Link>
      </section>
      <Footer />
    </div>
  );
}

export default ExploreDrinkIngredients;
