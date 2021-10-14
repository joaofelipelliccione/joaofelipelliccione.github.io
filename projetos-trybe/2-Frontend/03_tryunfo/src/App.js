import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import './App.css';

const INITIAL_STATE = { // Resolvi declarar o Estado da aplicação no respectivo arquivo pois os componentes filhos <Form /> e <Card /> também irão utilizá-los.
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
};

class App extends React.Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
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
      return this.setState(({
        isSaveButtonDisabled: false,
      }));
    }
    return this.setState(({
      isSaveButtonDisabled: true,
    }));
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
      this.setState({ hasTrunfo: true });
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
    }));
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
      });
    }
    this.setState({ savedCards: newSC });
    // OBS: Caso a carta 'Super Trunfo' seja excluída, além de atualizar o estado 'savedCards' com o novo array de objetos 'newSC', o estado 'hasTrunfo' voltará a ser igual a False. Isso é importante para que o usuário seja capaz de criar uma nova carta do tipo 'Super Trunfo'.
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
    } = this.state;

    return (
      <div className="app">
        <header>
          <h1>Tryufo</h1>
        </header>
        <main>
          <section id="cardDevelopmentContainer">
            <div id="formContainer">
              <h3>Estruturar Nova Carta</h3>
              <Form
                cardName={ cardName }
                cardDescription={ cardDescription }
                cardAttr1={ cardAttr1 }
                cardAttr2={ cardAttr2 }
                cardAttr3={ cardAttr3 }
                cardImage={ cardImage }
                cardRare={ cardRare }
                cardTrunfo={ cardTrunfo }
                hasTrunfo={ hasTrunfo }
                isSaveButtonDisabled={ isSaveButtonDisabled }
                onInputChange={ this.onInputChange }
                onCardTrunfoClick={ this.onCardTrunfoClick }
                onSaveButtonClick={ this.onSaveButtonClick }
              />
            </div>
            <div id="cardPreviewContainer">
              <h3>Preview da Nova Carta</h3>
              <Card
                cardName={ cardName }
                cardDescription={ cardDescription }
                cardAttr1={ cardAttr1 }
                cardAttr2={ cardAttr2 }
                cardAttr3={ cardAttr3 }
                cardImage={ cardImage }
                cardRare={ cardRare }
                cardTrunfo={ cardTrunfo }
              />
            </div>
          </section>
          <section id="savedCardsContainer">
            <div id="filters">
              <h3>Filtros</h3>
            </div>
            <div id="cardsDisplay">
              { savedCards.map((cardInfo) => (
                <div key={ cardInfo.cardName } id="eachDisplayedCard">
                  <Card
                    cardName={ cardInfo.cardName }
                    cardDescription={ cardInfo.cardDescription }
                    cardAttr1={ cardInfo.cardAttr1 }
                    cardAttr2={ cardInfo.cardAttr2 }
                    cardAttr3={ cardInfo.cardAttr3 }
                    cardImage={ cardInfo.cardImage }
                    cardRare={ cardInfo.cardRare }
                    cardTrunfo={ cardInfo.cardTrunfo }
                  />
                  <button
                    id={ cardInfo.cardName }
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
        <footer>
          <h3>Developed By JF</h3>
        </footer>
      </div>
    );
  }
}

export default App;