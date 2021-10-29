import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.settingLocalStorage();
  }

  settingLocalStorage = () => {
    const userCart = JSON.parse(localStorage.getItem("userCart"));
    // const purchaseTotalValue = JSON.parse(localStorage.getItem("purchaseTotalValue"));

    if (userCart === null || userCart.length === 0) {
      localStorage.setItem('userCart', JSON.stringify([]));
      localStorage.setItem('totalItemsOnCart', JSON.stringify(0));
      localStorage.setItem('purchaseTotalValue', JSON.stringify(0));
    } 
  }

  render() {
    const { loading } = this.props;
    const totalItemsOnCart = JSON.parse(localStorage.getItem("totalItemsOnCart"));
    const purchaseTotalValue = JSON.parse(localStorage.getItem("purchaseTotalValue"));

    return (
      <header data-testid="header-component">
        <div id="logoAndUserBar">
          {/* <img src={logo} alt="trybetunes-logo" /> */}
          <h1>Logo</h1>
        </div>
        <div id="linksBar">
          <Link to="/">Pesquisa</Link>
          <Link to="/cart">{`Carrinho - ${totalItemsOnCart} produto(s) - R$ ${purchaseTotalValue.toFixed(2)}`} </Link>
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
