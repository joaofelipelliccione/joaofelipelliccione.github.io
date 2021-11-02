import React from 'react';
import PropTypes from 'prop-types';
import '../styles/CartCard.css';

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

  initialProductQuant = () => { // Função que pega, do local storage, a quantidade de unidades do produto. É acionada na montagem do componente.
    const { productId } = this.props;
    const userCartFromLocSt = JSON.parse(localStorage.getItem("userCart"));
    const quantOnMount = userCartFromLocSt.find((microObj) => microObj.productId === productId).quantity;

    this.setState({ productQuant: quantOnMount });
  }

  itemsOnCartCalculator = () => { // Função que realiza o cálculo de quantos produtos há no carrinho e, feito isso, atualiza a chave "totalItemsOnCart" do local storage. É chamada nas funções addItem() e subItem() abaixo.
    const userCartFromLocSt = JSON.parse(localStorage.getItem("userCart"));

    const quantitiesArray = userCartFromLocSt.map((microObj) => microObj.quantity);

    const total = quantitiesArray.reduce((result, value) => result + value);

    localStorage.setItem("totalItemsOnCart", JSON.stringify(total));
  }

  purchaseTVCalculator = () => { // Função que realiza o cálculo do valor total (R$) do carrinho e, feito isso, atualiza a chave "purchaseTotalValue" do local storage. É chamada nas funções addItem() e subItem() abaixo.
    const userCartFromLocSt = JSON.parse(localStorage.getItem("userCart"));

    const totalValuesArray = userCartFromLocSt.map((microObj) => microObj.totalValue);

    const total = totalValuesArray.reduce((result, value) => result + value);

    localStorage.setItem("purchaseTotalValue", JSON.stringify(total));
  }

  addItem = ({ target }) => { // Função que atualiza, no local storage, as chaves "userCart", "totalItemsOnCart" e "purchaseTotalValue" quando o usuário aumenta o número de unidades que deseja comprar, do produto. A chave "productQuant", do estado, também é atualizada com a nova quantidade.
    const userCartFromLocSt = JSON.parse(localStorage.getItem("userCart"));

    userCartFromLocSt.forEach((microObj) => {
      if (microObj.productId === target.id) {
        if (microObj.quantity < microObj.availableQuantity) { // Condicional que limita o número de unidades dependendo de quantas estão disponíveis em estoque.
          microObj.quantity += 1;
          microObj.totalValue = microObj.price * microObj.quantity;
        } else {
          window.alert(`Sentimos muito, só temos ${microObj.availableQuantity} unidades disponíveis em estoque.`)
        }
      }
    });

    const newQuantity = userCartFromLocSt.find(({ productId }) => productId === target.id).quantity;

    this.setState({ productQuant: newQuantity });
    localStorage.setItem("userCart", JSON.stringify(userCartFromLocSt));
    this.itemsOnCartCalculator()
    this.purchaseTVCalculator();
    window.location.reload(); // Necessário para que o cabeçalho mostre a quantidade e o valor total da compra, a cada nova adição.
  }

  subItem = ({ target }) => { // Função que atualiza, no local storage, as chaves "userCart", "totalItemsOnCart" e "purchaseTotalValue" quando o usuário reduz o número de unidades que deseja comprar, do produto. A chave "productQuant", do estado, também é atualizada com a nova quantidade.
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
      this.itemsOnCartCalculator();
      this.purchaseTVCalculator();
      window.location.reload(); // Necessário para que o cabeçalho mostre a quantidade e o valor total da compra, a cada nova subtração..
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
        <div id="cartCardBtnsContainer">
          <button
            className="deleteBtn"
            id={ productId }
            type="button"
            onClick={ deleteCartItem }
          >
            X
          </button>
          <button
            className="quantityBtn"
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
            className="quantityBtn"
            id={ productId }
            type="button"
            onClick={ this.addItem }
            data-testid="product-increase-quantity"
          >
            +
          </button>
        </div>
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
