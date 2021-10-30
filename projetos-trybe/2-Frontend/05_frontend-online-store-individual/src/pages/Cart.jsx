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
    this.setState({ cartItems });
  }

  updateLocStUserCart = () => { // Função que atualiza as keys "userCart", "totalItemsOnCart" e "purchaseTotalValue", contidas no local storage, sempre que algum estado da página Cart for atualizado (ou seja, quando há adição, subtração ou deleção de produto).
    const { cartItems } = this.state;

    if (cartItems.length === 0) {
      localStorage.setItem('userCart', JSON.stringify([]));
      localStorage.setItem("totalItemsOnCart", JSON.stringify(0));
      localStorage.setItem("purchaseTotalValue", JSON.stringify(0));
    }

    if (cartItems.length !== 0) {
      // Atualização do carrinho:
      localStorage.setItem('userCart', JSON.stringify(cartItems));

      // Atualização da quantidade de itens no carrinho:
      const quantitiesArray = cartItems.map((microObj) => microObj.quantity);
      const totalQuant = quantitiesArray.reduce((result, value) => result + value);
      localStorage.setItem("totalItemsOnCart", JSON.stringify(totalQuant));

      // Atualização do atual valor total (R$) do carrinho:
      const totalValuesArray = cartItems.map((microObj) => microObj.totalValue);
      const totalValue = totalValuesArray.reduce((result, value) => result + value);
      localStorage.setItem("purchaseTotalValue", JSON.stringify(totalValue));
    }
  }

  deleteCartItem = ({ target }) => { // Função que deleta produtos do carrinho.
    const { cartItems } = this.state;
    const productIndex = cartItems.findIndex((product) => product.productId === target.id); // REF: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
    // OBS: Todos os botões de deletar, possuem Id igual à ID do produto. Isso possibilita o funcionamento do target acima.

    this.setState({
      cartItems: cartItems.filter((_product, index) => index !== productIndex), // Retorna todos os produtos contidos no estado 'cartItems', menos o produto excluído.
    });
  }

  render() {
    const { cartItems } = this.state;

    return (
      <div id="cartPage">
        <Header cartItems={ cartItems } />

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
                />
              </div>
            ))}
        </main>
      </div>
    );
  }
}

export default Cart;
