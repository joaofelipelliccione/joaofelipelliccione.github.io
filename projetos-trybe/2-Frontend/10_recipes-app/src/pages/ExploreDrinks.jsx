import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreDrinks() {
  const history = useHistory();
  const [randomDrink, setRandomDrink] = React.useState('');

  const getRandomDrink = async () => {
    const END_POINT = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const response = await fetch(END_POINT);
    const jsonFormat = await response.json();
    setRandomDrink(jsonFormat.drinks);
  };

  React.useEffect(() => {
    getRandomDrink();
  }, []);

  return (
    <div>
      <Header />
      <section id="exploreFoodsBtnsContainer">
        <button
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ () => history.push('/explorar/bebidas/ingredientes') }
        >
          Por Ingredientes
        </button>
        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ () => history.push(`/bebidas/${randomDrink[0].idDrink}`) }
        >
          Me Surpreenda!
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
