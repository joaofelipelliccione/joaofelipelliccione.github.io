import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/Card.css';

class Card extends React.Component {
  render() {
    const { productId, title, thumbnail, price, availableQuantity, address, productIndex, addToCart } = this.props;

    return (
      <div className="cardContainer2">
        <Link // Todo o card é englobado por um componente <Link>. Tal componente permite que, quando o Card seja clicado, a página ProductDetails seja aberta.
          to={ {
            pathname: `/products/${productId}`, // É importante pontuar que, cada Card, possui sua própria página ProductDetails, cuja URL será /products/Id-do-item-clicado.
            state: { // A página ProductDetails, que é um componente, recebe informações (title, thumbnail, price...) referentes ao produto. Essas informações são passadas via <Link /> e encontradas em "const { location: { state: { title, thumbnail, price, idItem } } } = this.props".
              productId,
              title,
              thumbnail,
              price,
              availableQuantity,
              address,
              productIndex,
            },
          } }
          data-testid="product-detail-link"
        >
          <div className="eachCard">
            <h3>{ title }</h3>
            <img src={ thumbnail } alt={ title } />
            <p>{ `R$ ${price.toFixed(2)}` }</p>
            <p>{ `${address.city_name}, ${address.state_name}` }</p>
          </div>
        </Link>
        <button
          id={ productIndex }
          className="addToCartBtn"
          data-testid="product-add-to-cart"
          type="button"
          onClick={ addToCart }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

Card.propTypes = {
  productId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  availableQuantity: PropTypes.number.isRequired,
  productIndex: PropTypes.number.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default Card;
