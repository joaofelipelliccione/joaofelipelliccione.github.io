import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

class Header extends React.Component {
  numOfCartItems = () => { // Função que capta o número de itens adicionados ao carrinho.
    const { cartItems } = this.props; // OBS: A props cartItems vêm da página Home, da página Cart ou da página ProductDetails.
    let numberOfCartItems = 0;

    if (cartItems.length > 0) {
      const quantitiesArray = cartItems.map((microObj) => microObj.quantity);
      const totalQuant = quantitiesArray.reduce((result, value) => result + value);
      numberOfCartItems = totalQuant;
    }

    return numberOfCartItems;
  }

  cartTotalValue = () => { // Função que calcula o valor total do carrinho.
    const { cartItems } = this.props; // OBS: A props cartItems vêm da página Home ou da página Cart.
    let cartTotalValueResult = 0;

    if (cartItems.length > 0) {
      const totalValuesArray = cartItems.map((microObj) => microObj.totalValue);
      const totalValue = totalValuesArray.reduce((result, value) => result + value);
      cartTotalValueResult = totalValue;
    }

    return cartTotalValueResult.toFixed(2);
  }

  render() {
    const { loading } = this.props;

    return (
      <header data-testid="header-component">
        <div id="logoAndUserBar">
          {/* <img src={logo} alt="trybetunes-logo" /> */}
          <h1>Logo</h1>
        </div>
        <div id="linksBar">
          <Link to="/">Pesquisa</Link>
          <Link to="/cart">{`Carrinho - ${this.numOfCartItems()} produto(s) - R$ ${this.cartTotalValue()}`}</Link>
        </div>
        { loading &&
          <div id="loadingContainer">
            <span>Carregando...</span>
          </div>
        }
      </header>
    );
  }
}

export default Header;
