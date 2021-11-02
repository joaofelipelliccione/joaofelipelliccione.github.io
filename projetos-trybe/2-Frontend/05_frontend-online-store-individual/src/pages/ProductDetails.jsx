import React from 'react';
import PropTypes from 'prop-types';
import Review from '../components/Review';
import Header from '../components/Header';
import '../styles/ProductDetails.css';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    const cartItems = JSON.parse(localStorage.getItem('userCart'));
    const searchResults = JSON.parse(localStorage.getItem("searchResults"));

    this.state = {
      results: searchResults,
      cartItems,
    };
  }

  setLocStOnAddToCart = (updatedCartItems) => { // Função que aloca, no local storage, importantes informações, sempre que um novo item for adicionado ao carrinho. É chamada dentro da addToCart() abaixo, após a atualização do estado cuja key é "cartItems".

    // Atualização do carrinho, que passa a ter um novo item:
    localStorage.setItem('userCart', JSON.stringify(updatedCartItems));

    // Atualização da quantidade de itens no carrinho:
    const quantitiesArray = updatedCartItems.map((microObj) => microObj.quantity);
    const totalQuant = quantitiesArray.reduce((result, value) => result + value);
    localStorage.setItem("totalItemsOnCart", JSON.stringify(totalQuant));

    // Atualização do atual valor total (R$) do carrinho:
    const totalValuesArray = updatedCartItems.map((microObj) => microObj.totalValue);
    const totalValue = totalValuesArray.reduce((result, value) => result + value);
    localStorage.setItem("purchaseTotalValue", JSON.stringify(totalValue));

  }

  addToCart = ({ target }) => { // Função que permite a adição de um determinado produto ao carrinho de compras. Será chamada no OnClick do botão "Adicionar ao Carrinho". || OBS: O Id do botão "Adicionar ao Carrinho" é igual ao índice do produto no array results.
    const { id } = target;
    const { results, cartItems } = this.state;
    const objProduct = {
      productId: results[id].id,
      title: results[id].title,
      thumbnail: results[id].thumbnail,
      price: results[id].price,
      availableQuantity: results[id].available_quantity, // Quantidade disponível daquele produto.
      address: results[id].address,
      quantity: 1, // Quantidade adquirida pelo usuário
      totalValue: results[id].price,
    };

    if (!cartItems.some((item) => item.title === objProduct.title)) { // Condicional que evita a adição de 2 produtos iguais ao carrinho.
      this.setState((prevState) => ({
        cartItems: [...prevState.cartItems, objProduct],
      }), () => this.setLocStOnAddToCart(this.state.cartItems)); // Após atualização do estado de key igual à cartItems, atualiza-se o local storage.
    }
  }

  render() {
    const { location: { state: { productId, title, thumbnail, price, address, productIndex } } } = this.props;
    const { cartItems } = this.state;

    return (
      <div id="productDetailsPage">
        <Header cartItems={ cartItems } />
        <main id="productDetailsMain">
          <div className="eachProductDetailCard">
            <h3 data-testid="product-detail-name">{ title }</h3>
            <img src={ thumbnail } alt={ title } />
            <p>{ `R$ ${price.toFixed(2)}` }</p>
            <p>{ `${address.city_name}, ${address.state_name}` }</p>
            <button
              className="addToCartBtn"
              data-testid="product-detail-add-to-cart"
              type="button"
              id={ productIndex }
              onClick={ this.addToCart }
            >
              Adicionar ao Carrinho
            </button>
          </div>
          <Review productId={ productId } />
        </main>
      </div>

    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      productId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      productIndex: PropTypes.number.isRequired,
      address: PropTypes.shape({
        city_id: PropTypes.string.isRequired,
        city_name: PropTypes.string.isRequired,
        state_id: PropTypes.string.isRequired,
        state_name: PropTypes.string.isRequired,
      }),
    })
  }),
};

export default ProductDetails;
