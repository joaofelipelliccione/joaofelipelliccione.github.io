import React from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Card from '../components/Card';
import Categories from '../components/Categories';
import Header from '../components/Header';
import '../styles/Home.css';

class Home extends React.Component {
  constructor() {
    super();
    const searchResults = JSON.parse(localStorage.getItem("searchResults"));
    this.settingLocalStorage();

    if (searchResults !== null) { // Configurando o estado quando o usuário já realizou, anteriormente, buscas no website.
      this.state = {
        loading: false,
        userSearchedItem: '',
        categoryId: '',
        results: searchResults,
        didSearch: true,
        cartItems: [],
      };
    }

    if (searchResults === null || searchResults.length === 0 ) { // Configurando o estado quando o usuário acessa o website pela primeira vez.
      this.state = {
        loading: false,
        userSearchedItem: '',
        categoryId: '',
        results: [],
        didSearch: false,
        cartItems: [],
      };
    }
  }

  settingLocalStorage = () => { // Função que define o local storage do usuário, em seu primeiro acesso ao website. É chamada no Constructor(), logo, é como se estivesse sendo chamada no antigo componentWillMount().
    const userCart = JSON.parse(localStorage.getItem("userCart"));

    if (userCart === null || userCart.length === 0) {
      localStorage.setItem('userCart', JSON.stringify([]));
      localStorage.setItem('totalItemsOnCart', JSON.stringify(0));
      localStorage.setItem('purchaseTotalValue', JSON.stringify(0));
    }
  }

  componentDidMount() {
    this.getLocStUserCart();
  }

  getLocStUserCart = () => { // Função que capta os itens do carrinho salvos no local storage, sempre que a página Home for montada. Tal função evita que o carrinho do usuário seja restaurado sempre que ele vá para a página Cart ou para a ProductDetails.
    const cartItemsFromLocSt = JSON.parse(localStorage.getItem('userCart'));

    if (Array.isArray(cartItemsFromLocSt)) { // Caso a key "userCart", de local storage, NÃO seja um array vazio...
      this.setState({ cartItems: cartItemsFromLocSt }); // ...o estado é definido.
    }
  }

  handleClick = async () => { // Função que realiza a requisição para API getProductsFromCategoryAndQuery(), baseada no termo pesquisado. Será chamada no onClick do botão de pesquisar.
    this.setState({ loading: true });
    const { categoryId, userSearchedItem } = this.state;

    const response = await getProductsFromCategoryAndQuery(categoryId, userSearchedItem);

    this.setState({
      didSearch: true,
      results: response.results,
      loading: false,
    }, () => localStorage.setItem("searchResults", JSON.stringify(this.state.results))); // Salvando os resultados de pesquisa no estado "results."
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
    this.setState(
      { results: response.results,
        didSearch: true,
        loading: false,
      }, () => localStorage.setItem("searchResults", JSON.stringify(this.state.results))); // Salvando os resultados de pesquisa no estado "results."
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

  addToCart = ({ target }) => { // Função que permite a adição de um determinado produto ao carrinho de compras. Será passada para o componente Card, via props, e chamada no OnClick do botão "Adicionar ao Carrinho". || OBS: O Id do botão "Adicionar ao Carrinho", de cada Card, é igual ao índice do produto no array results.
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

  cleanSearch = () => { // Função que limpa a pesquisa realizada pelo usuário. Será chamada no onClick do botão de limpar (X).
    this.setState({
      userSearchedItem: '',
      categoryId: '',
      results: [],
      didSearch: false,
    }, () => localStorage.setItem("searchResults", JSON.stringify(this.state.results))); // Limpando os resultados de pesquisa no estado "results."
  }

  render() {
    const { loading, userSearchedItem, results, didSearch, cartItems } = this.state;

    return (
      <div id="homepage">
        <Header loading={ loading } cartItems={ cartItems } />

        <section id="homepageCenter">
          <div id="searchContainer">
            <button
              type="button"
              onClick={ this.cleanSearch }
              data-testid="query-button"
            >
              <span role="img" aria-label="emoji-lupa">❌</span>
            </button>
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
                    availableQuantity={ item.available_quantity }
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
