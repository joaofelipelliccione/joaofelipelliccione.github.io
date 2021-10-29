import React from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Card from '../components/Card';
import Categories from '../components/Categories';
import Header from '../components/Header';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      userSearchedItem: '',
      categoryId: '',
      results: [],
      didSearch: false,
      cartItems: [],
    };
  }

  componentDidMount() {
    this.getLocStUserCart();
  }

  handleClick = async () => { // Função que realiza a requisição para API getProductsFromCategoryAndQuery(), baseada no termo pesquisado. Será chamada no onClick do botão de pesquisar.
    this.setState({ loading: true });
    const { categoryId, userSearchedItem } = this.state;

    const response = await getProductsFromCategoryAndQuery(categoryId, userSearchedItem);

    this.setState({
      didSearch: true,
      results: response.results,
      loading: false,
    });
  }

  onInputChange = ({ target }) => { // Função que altera o estado 'userSearchedItem', no momento que o usuário realiza uma busca. Será chamada no onChange de #searchBar.
    const { name } = target;
    const formElementValue = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ [name]: formElementValue });
  }

  categoryChecked = async ({ target }) => { // Função que realiza a requisição para API getProductsFromCategoryAndQuery(), baseada na categoria clicada. Será chamada no onChange de cada radio, de cada categoria.
    const { userSearchedItem } = this.state;
    this.setState({ loading: true, categoryId: target.id });

    const response = await getProductsFromCategoryAndQuery(target.id, userSearchedItem);
    this.setState({ results: response.results, didSearch: true, loading: false });
  }

  getLocStUserCart = () => { // Função que capta os itens do carrinho salvos no local storage, sempre que a página Home for montada. Tal função evita que o carrinho do usuário seja restaurado.
    const cartItemsFromLocSt = JSON.parse(localStorage.getItem('userCart'));

    if (Array.isArray(cartItemsFromLocSt)) { // Caso a key "userCart", de local storage, NÃO seja um array vazio...
      this.setState({ cartItems: cartItemsFromLocSt });
    }
  }

  setLocStOnAddToCart = (updatedCartItems) => { // Função que aloca, no local storage, importantes informações, sempre que um novo item for adicionado ao carrinho. É chamada dentro da addToCart(), abaixo.
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

  addToCart = ({ target }) => { // Função que permite a adição de um determinado produto ao carrinho de compras. Será passada para o componente Card, via props, e chamada no OnClick do botão "Adicionar ao Carrinho". || OBS: O Id do botão "Adicionar ao Carrinho", de cada Card, é igual ao índice do produto no array results.
    const { id } = target;
    const { results, cartItems } = this.state;
    const objProduct = {
      productId: results[id].id,
      title: results[id].title,
      thumbnail: results[id].thumbnail,
      price: results[id].price,
      address: results[id].address,
      quantity: 1,
      totalValue: results[id].price,
    };

    if (!cartItems.some((item) => item.title === objProduct.title)) { // Condicional que evita a adição de 2 produtos iguais ao carrinho.
      this.setState((prevState) => ({
        cartItems: [...prevState.cartItems, objProduct],
      }), () => this.setLocStOnAddToCart(this.state.cartItems));
    }
  }

  render() {
    const { loading, userSearchedItem, results, didSearch } = this.state;

    return (
      <div id="homepage">
        <Header loading={ loading } />

        <section id="homepageCenter">
          <div id="searchContainer">
            <label htmlFor="search">
              <input
                id="searchBar"
                data-testid="query-input"
                name="userSearchedItem"
                value={ userSearchedItem }
                onChange={ this.onInputChange }
              />
            </label>
            <button
              type="button"
              onClick={ this.handleClick }
              data-testid="query-button"
            >
              <span role="img" aria-label="emoji-lupa">🔎</span>
            </button>
          </div>
          <div id="productsDisplay">
            { !didSearch
              ? (
                <p data-testid="home-initial-message">
                  Busque um produto ou escolha uma categoria!
                </p>)
              : results.map((item, index) => (
                <div className="cardContainer1" key={ item.id } data-testid="product">
                  <Card
                    productId={ item.id }
                    title={ item.title }
                    thumbnail={ item.thumbnail }
                    price={ item.price }
                    address={ item.address }
                    productIndex={ index }
                    addToCart={ this.addToCart }
                  />
                </div>
              ))}
          </div>
          <aside id="categoriesContainer1">
            <Categories categoryChecked={ this.categoryChecked } />
          </aside>
        </section>
      </div>
    );
  }
}

export default Home;
