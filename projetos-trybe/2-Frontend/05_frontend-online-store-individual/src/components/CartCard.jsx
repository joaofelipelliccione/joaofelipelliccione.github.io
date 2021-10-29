import React from 'react';
import PropTypes from 'prop-types';

class CartCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productQuant: 1,
    };
  }

  componentDidMount() {
    this.initialProductQuant();
  }

  initialProductQuant = () => {
    const { productId } = this.props;
    const userCartFromLocSt = JSON.parse(localStorage.getItem("userCart"));
    const quantOnMount = userCartFromLocSt.find((microObj) => microObj.productId === productId).quantity;

    this.setState({ productQuant: quantOnMount });
  }

  addItem = ({ target }) => {
    const { itemsOnCartCalculator, purchaseTVCalculator } = this.props
    const userCartFromLocSt = JSON.parse(localStorage.getItem("userCart"));

    userCartFromLocSt.forEach((microObj) => {
      if (microObj.productId === target.id) {
        microObj.quantity += 1;
        microObj.totalValue = microObj.price * microObj.quantity;
      }
    });

    const newQuantity = userCartFromLocSt.find(({ productId }) => productId === target.id).quantity;

    this.setState({ productQuant: newQuantity });
    localStorage.setItem("userCart", JSON.stringify(userCartFromLocSt));
    itemsOnCartCalculator()
    purchaseTVCalculator();
    window.location.reload();
  }

  subItem = ({ target }) => {
    const { itemsOnCartCalculator, purchaseTVCalculator } = this.props
    const userCartFromLocSt = JSON.parse(localStorage.getItem("userCart"));

    userCartFromLocSt.forEach((microObj) => {
      if (microObj.productId === target.id) {
        microObj.quantity -= 1
        microObj.totalValue = microObj.price * microObj.quantity;
      }
    });

    const newQuantity = userCartFromLocSt.find((microObj) => microObj.productId === target.id).quantity;

    if (newQuantity > 0) { // A respectiva condicional evita que o <output> contido entre "-" e "+" mostre um número menor que 1.
      this.setState({ productQuant: newQuantity });
      localStorage.setItem("userCart", JSON.stringify(userCartFromLocSt));
      itemsOnCartCalculator();
      purchaseTVCalculator();
      window.location.reload();
    }
  }

  render() {
    const { thumbnail, title, productPrice, productId, deleteCartItem } = this.props;
    const { productQuant } = this.state;

    return (
      <div className="eachCartCard" data-testid="shopping-cart-product-name">
        <h3>{ title }</h3>
        <img src={ thumbnail } alt={ title } width="170px" />
        <p>{ `R$ ${ productPrice.toFixed(2) }` }</p>
        <button
          id={ productId }
          type="button"
          onClick={ deleteCartItem }
        >
          X
        </button>
        <button
          id={ productId }
          type="button"
          onClick={ this.subItem }
          data-testid="product-decrease-quantity"
        >
          -
        </button>
        <output
          data-testid="shopping-cart-product-quantity"
        >
          {productQuant}
        </output>
        <button
          id={ productId }
          type="button"
          onClick={ this.addItem }
          data-testid="product-increase-quantity"
        >
          +
        </button>
      </div>
    );
  }
}

CartCard.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
  deleteCartItem: PropTypes.func.isRequired,
};

export default CartCard;
