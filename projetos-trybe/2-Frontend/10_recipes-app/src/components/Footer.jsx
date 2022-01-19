import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="websiteFooter">
      <div>
        <Link to="/bebidas">
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="Ícone default de perfil"
          />
        </Link>
        <Link to="/explorar">
          <img
            data-testid="explore-bottom-btn"
            src={ exploreIcon }
            alt="Ícone default de perfil"
          />
        </Link>
        <Link to="/comidas">
          <img
            data-testid="food-bottom-btn"
            src={ mealIcon }
            alt="Ícone default de perfil"
          />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
