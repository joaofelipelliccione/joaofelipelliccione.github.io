import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ToExplore() {
  const history = useHistory();

  return (
    <div>
      <Header />
      <section id="explorePageBtnsContainer">
        <button
          data-testid="explore-food"
          type="button"
          onClick={ () => history.push('/explorar/comidas') }
        >
          Explorar Comidas
        </button>
        <button
          data-testid="explore-drinks"
          type="button"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          Explorar Bebidas
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default ToExplore;
