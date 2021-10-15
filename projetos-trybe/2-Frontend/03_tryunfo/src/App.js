import React from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Filters from './components/Filters';
import Card from './components/Card';
import Footer from './components/Footer';
import './App.css';

const INITIAL_STATE = {
  cardName: '',
  cardDescription: '',
  cardAttr1: '0',
  cardAttr2: '0',
  cardAttr3: '0',
  cardImage: '',
  cardRare: 'Normal',
  cardTrunfo: false,
  hasTrunfo: false,
  isSaveButtonDisabled: true,
  savedCards: [],
  searchBoxData: '',
  rarityFilter: 'Todas'
};

class App extends React.Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    const userSavedCards = localStorage.getItem('savedCards');
    const userHasTrunfo = localStorage.getItem('hasTrunfo');

    if (userSavedCards !== null) {
      this.setState({ savedCards: JSON.parse(userSavedCards) });
    }
    if (userSavedCards !== null) {
      this.setState({ hasTrunfo: JSON.parse(userHasTrunfo) });
    }
  }

  verifyAllInputs = () => { // Função que habilita o botão 'salvar', quando todos os campos do formulário forem preenchidos corretamente. Será chamada dentro da função onInputChange(), que é chamada dentro de escutadores do tipo 'onChange'.
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
    } = this.state;

    const attrSum = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);
    const attrSumMaxValue = 210;
    const attrMin = 0;
    const attrMax = 90;

    if ((cardName.length >= 1)
    && (cardDescription.length >= 1)
    && (cardImage.length >= 1)
    && (cardRare.length >= 1)
    && (Number(cardAttr1) >= attrMin && Number(cardAttr1) <= attrMax)
    && (Number(cardAttr2) >= attrMin && Number(cardAttr2) <= attrMax)
    && (Number(cardAttr3) >= attrMin && Number(cardAttr3) <= attrMax)
    && (attrSum <= attrSumMaxValue)) {
      return this.setState({
        isSaveButtonDisabled: false,
      });
    }
    return this.setState({
      isSaveButtonDisabled: true,
    });
  }

  onInputChange = ({ target }) => { // Função que altera o valor de qualquer estado, sempre que um input for realizado no elemento onde ela está sendo chamada. || OBS: Para que tal função funcione, os 'name' de cada um dos elementos do Forms devem ser iguais ao nome dos estados.
    const { name } = target;
    const formElementValue = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ // Aprendi a utilizar o 2° parâmetro da setState() na matéria "Ciclo de Vida dos Componentes", ainda não dada. Em suma, assim que o estado for atualizado, a callback passada como argumento, será rodada.
      [name]: formElementValue,
    }, this.verifyAllInputs);
  }

  onSaveButtonClick = () => {
    // Função que altera o estado 'hasTrunfo', de false para true, quando uma carta do tipo trunfo é salva.
    // Função que salva as informações de uma respectiva carta, como um objeto dentro do array contido no estado 'savedCards'.
    // Função que limpa os campos do formulário e o preview da carta.
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;

    const savedCardInfo = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };

    if (cardTrunfo === true) {
      this.setState({ hasTrunfo: true }, () => localStorage.setItem('hasTrunfo', true));
    }

    this.setState((prevState) => ({
      savedCards: [...prevState.savedCards, savedCardInfo],
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'Normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    }), () => localStorage.setItem('savedCards', JSON.stringify(this.state.savedCards))); // Salvando o estado 'savedCards', no Local Storage.
  }

  deleteDisplayedCard = ({ target }) => { // Função que possibilita a exclusão de uma carta criada anteriormente.
    const { savedCards } = this.state;
    const displayedCardId = target.id;

    const toBeDel = savedCards.find((cardInfo) => cardInfo.cardName === displayedCardId); // Retorna o objeto com as informações da carta recém-excluída.
    const newSC = savedCards.filter((cardInfo) => cardInfo.cardName !== displayedCardId); // Retorna o array contido no estado 'savedCards', porém sem o objeto referente à carta que foi excluída.

    if (toBeDel.cardTrunfo === true) {
      this.setState({
        savedCards: newSC,
        hasTrunfo: false,
      }, () => {
        localStorage.setItem('savedCards', JSON.stringify(newSC));
        localStorage.setItem('hasTrunfo', false)
      }); // Salvando o estado 'savedCards', após a deleção, no Local Storage.
    }
    this.setState({ savedCards: newSC }, localStorage.setItem('savedCards', JSON.stringify(newSC)));
    // OBS: Caso a carta 'Super Trunfo' seja excluída, além de atualizar o estado 'savedCards' com o novo array de objetos 'newSC', o estado 'hasTrunfo' voltará a ser igual a False. Isso é importante para que o usuário seja capaz de criar uma nova carta do tipo 'Super Trunfo'.
  }

  filtersFunction = () => { // Tal função sempre retornará um array de objetos, que acumula informações de cada uma das cartas. Por outro lado, dependendo dos filtros aplicados pelo usuário, o respectivo array apresentará uma quantidade reduzida de objetos.
    const { savedCards, searchBoxData, rarityFilter } = this.state;

    if (searchBoxData.length >= 1) {
      return savedCards.filter(({ cardName }) =>
        cardName.toLowerCase().includes(searchBoxData.toLowerCase())); // Retornado quando o usuário pesquisar por uma determinada carta na searchbox.
    }
    if (rarityFilter === 'Normal') {
      return savedCards.filter(({ cardRare }) => cardRare === 'Normal'); // Retornado quando o usuário selecionar 'Normal', no dropdown.
    }
    if (rarityFilter === 'Raro') {
      return savedCards.filter(({ cardRare }) => cardRare === 'Raro'); // Retornado quando o usuário selecionar 'Raro', no dropdown.
    }
    if (rarityFilter === 'Muito Raro') {
      return savedCards.filter(({ cardRare }) => cardRare === 'Muito Raro'); // Retornado quando o usuário selecionar 'Muito Raro', no dropdown.
    }
    return savedCards; // Retornado quando o usuário não aplicar nenhum filtro.

    // OBS: A função filtersFunction() será chamada dentro da <div><div /> "cardsDisplay", acompanhada de um .map().
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      savedCards,
      searchBoxData,
      rarityFilter,
    } = this.state;

    return (
      <div className="app">
        <Header />
        <main>
          <section id="cardDevelopmentContainer">
            <div id="formContainer">
              <h3>Estruturar Nova Carta</h3>
              <Form
                cardName={ cardName } cardDescription={ cardDescription }
                cardAttr1={ cardAttr1 } cardAttr2={ cardAttr2 }
                cardAttr3={ cardAttr3 } cardImage={ cardImage }
                cardRare={ cardRare } cardTrunfo={ cardTrunfo }
                hasTrunfo={ hasTrunfo } isSaveButtonDisabled={ isSaveButtonDisabled }
                onInputChange={ this.onInputChange } onCardTrunfoClick={ this.onCardTrunfoClick }
                onSaveButtonClick={ this.onSaveButtonClick }
              />
            </div>
            <div id="cardPreviewContainer">
              <h3>Preview da Nova Carta</h3>
              <div id="cardPrevOutsideBorder">
                <Card
                  cardName={ cardName } cardDescription={ cardDescription }
                  cardAttr1={ cardAttr1 } cardAttr2={ cardAttr2 }
                  cardAttr3={ cardAttr3 } cardImage={ cardImage }
                  cardRare={ cardRare } cardTrunfo={ cardTrunfo }
                />
              </div>
            </div>
          </section>
          <section id="savedCardsContainer">
            <Filters 
              searchBoxData={ searchBoxData } onInputChange={ this.onInputChange }
              rarityFilter={ rarityFilter }
            />
            <div id="cardsDisplay">
              { savedCards !== undefined 
                && this.filtersFunction().map((cardInfo) => (
                <div key={ cardInfo.cardName } className="eachDisplayedCard">
                  <Card
                    cardName={ cardInfo.cardName } cardDescription={ cardInfo.cardDescription }
                    cardAttr1={ cardInfo.cardAttr1 } cardAttr2={ cardInfo.cardAttr2 }
                    cardAttr3={ cardInfo.cardAttr3 } cardImage={ cardInfo.cardImage }
                    cardRare={ cardInfo.cardRare } cardTrunfo={ cardInfo.cardTrunfo }
                  />
                  <button
                    id={ cardInfo.cardName }
                    className="deleteBtn"
                    data-testid="delete-button"
                    type="button"
                    onClick={ this.deleteDisplayedCard }
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>
          <Footer />
      </div>
    );
  }
}

export default App;

