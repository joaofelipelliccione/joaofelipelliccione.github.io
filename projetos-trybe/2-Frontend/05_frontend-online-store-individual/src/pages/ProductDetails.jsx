import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Review from '../components/Review';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      cartItems: [],
    };
  }

  componentDidMount() {
    this.insertResults();
  }

  componentWillUnmount() {
    const { cartItems } = this.state;
    localStorage.setItem('userCart', JSON.stringify(cartItems));
  }

  insertResults = () => {
    const results = JSON.parse(localStorage.getItem('results'));
    this.setState({ results });
  }

  addToCart = ({ target }) => {
    const { id } = target;
    const { results } = this.state;
    const objProduct = {
      title: results[id].title,
      thumbnail: results[id].thumbnail,
      price: results[id].price,
      address: results[id].address,
      productId: results[id].id,
    };

    this.setState((prevState) => ({
      cartItems: [...prevState.cartItems, objProduct],
    }));
  }

  render() {
    const { location: { state: { title, thumbnail, price, productIndex, productId } } } = this.props;
    const { match } = this.props;
    const { id } = match.params;
    return (
      <div>
        <Link to="/">Voltar</Link>
        <div>
          <h3 data-testid="product-detail-name">{title}</h3>
          <img src={ thumbnail } alt={ title } />
          <span>{price}</span>
        </div>
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          id={ productIndex }
          onClick={ this.addToCart }
        >
          Adicionar ao Carrinho
        </button>
        <Review id={ productId } />
      </div>

    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.objectOf().isRequired,
  match: PropTypes.objectOf().isRequired,
};

export default ProductDetails;
