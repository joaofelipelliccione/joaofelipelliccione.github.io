import React from 'react';
import PropTypes from 'prop-types';
import Review from '../components/Review';
import Header from '../components/Header';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      cartItems: [],
    };
  }

  componentDidMount() {
    this.insertItensInTheCart();
  }

  componentWillUnmount() {
    const { cartItems } = this.state;
    localStorage.setItem('userCart', JSON.stringify(cartItems));
  }

  insertItensInTheCart = () => { // Função que capta os itens do carrinho salvos no local storage, sempre que a página Cart for montada.
    const cartItems = JSON.parse(localStorage.getItem('userCart'));
    this.setState({ cartItems });
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
    const { cartItems } = this.state;

    return (
      <div>
        <Header cartItems={ cartItems } />
        <div>
          <h3 data-testid="product-detail-name">{title}</h3>
          <img src={ thumbnail } alt={ title } />
          <span>{price}</span>
        </div>
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
