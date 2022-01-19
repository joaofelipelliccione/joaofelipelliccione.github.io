import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoods() {
  const history = useHistory();
  const [randomMeal, setRandomMeal] = React.useState('');

  const getRandomMeal = async () => {
    const END_POINT = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const response = await fetch(END_POINT);
    const jsonFormat = await response.json();
    setRandomMeal(jsonFormat.meals);
  };

  React.useEffect(() => {
    getRandomMeal();
  }, []);

  return (
    <div>
      <Header />
      <section id="exploreFoodsBtnsContainer">
        <button
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ () => history.push('/explorar/comidas/ingredientes') }
        >
          Por Ingredientes
        </button>
        <button
          data-testid="explore-by-area"
          type="button"
          onClick={ () => history.push('/explorar/comidas/area') }
        >
          Por Local de Origem
        </button>
        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ () => history.push(`/comidas/${randomMeal[0].idMeal}`) }
        >
          Me Surpreenda!
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
