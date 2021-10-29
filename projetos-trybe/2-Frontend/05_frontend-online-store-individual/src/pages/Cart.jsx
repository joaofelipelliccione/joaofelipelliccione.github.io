import React from 'react';
import CartCard from '../components/CartCard';
import Header from '../components/Header';

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: [],
    };
  }

  componentDidMount() {
    this.insertItensInTheCart();
  }

  componentDidUpdate() {
    this.updateLocStUserCart();
  }

  insertItensInTheCart = () => { // Função que capta os itens do carrinho salvos no local storage, sempre que a página Cart for montada.
    const cartItems = JSON.parse(localStorage.getItem('userCart'));

    if (Array.isArray(cartItems)) { // Caso a key "userCart", de local storage, NÃO seja um array vazio...
      this.setState({ cartItems });
    }
  }

  updateLocStUserCart = () => { // Função que atualiza a key "userCart", de local storage, sempre que algum estado da página Cart for atualizado [componentDidUpdate()].
    const { cartItems } = this.state;
    localStorage.setItem('userCart', JSON.stringify(cartItems));
  }

  deleteCartItem = ({ target }) => { // Função que deleta produtos do carrinho.
    const { cartItems } = this.state;
    const productIndex = cartItems.findIndex((product) => product.productId === target.id); // REF: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
    // OBS: Todos os botões de deletar, possuem Id igual à ID do produto. Isso possibilita o funcionamento do target acima.

    this.setState({
      cartItems: cartItems.filter((_product, index) => index !== productIndex), // Retorna todos os produtos contidos no estado 'cartItems', menos o produto excluído.
    });
  }

  itemsOnCartCalculator = () => {
    const userCartFromLocSt = JSON.parse(localStorage.getItem("userCart"));

    const quantitiesArray = userCartFromLocSt.map((microObj) => microObj.quantity);

    const total = quantitiesArray.reduce((result, value) => result + value);

    localStorage.setItem("totalItemsOnCart", JSON.stringify(total));
  }

  purchaseTVCalculator = () => {
    const userCartFromLocSt = JSON.parse(localStorage.getItem("userCart"));

    const totalValuesArray = userCartFromLocSt.map((microObj) => microObj.totalValue);

    const total = totalValuesArray.reduce((result, value) => result + value);

    localStorage.setItem("purchaseTotalValue", JSON.stringify(total));
  }

  render() {
    const { cartItems, purchaseTotalValue } = this.state;

    return (
      <div id="cartPage">
        <Header />

        <main id="cartProductsDisplay">
          {cartItems.length === 0
            ? <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h3>
            : cartItems.map((cartItem) => (
              <div className="eachCartCardContainer" key={ cartItem.title }>
                <CartCard
                  title={ cartItem.title }
                  thumbnail={ cartItem.thumbnail }
                  productPrice={ cartItem.price }
                  productId={ cartItem.productId }
                  deleteCartItem={ this.deleteCartItem }
                  itemsOnCartCalculator={ this.itemsOnCartCalculator }
                  purchaseTVCalculator={ this.purchaseTVCalculator }
                />
              </div>
            ))}
        </main>
      </div>
    );
  }
}

export default Cart;
