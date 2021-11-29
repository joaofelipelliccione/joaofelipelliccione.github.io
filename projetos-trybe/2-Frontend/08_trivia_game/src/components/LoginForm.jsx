import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { setLoginInfoAC, fetchTriviaToken, cleanScoreAC } from '../redux/action';

class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      userMail: '',
      mustRedirectToGame: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onLogIn = this.onLogIn.bind(this);
  }

  onInputChange({ target }) { // Função que altera o valor do estado local, sempre que um input for realizado no elemento onde ela está sendo chamada. || OBS: Para que tal função funcione, os 'name' de cada um dos elementos do Forms devem ser iguais ao nome dos estados.
    const { name } = target;
    this.setState({ [name]: target.value });
  }

  async onLogIn() {
    const { setLoginInfACProp, fetchTriviaTokenProp, cleanScoreACProp } = this.props;
    const { userName, userMail } = this.state;

    cleanScoreACProp();
    await fetchTriviaTokenProp();
    this.setState({ mustRedirectToGame: true });
    setLoginInfACProp(userName, userMail);
  }

  render() {
    const { userName, userMail, mustRedirectToGame } = this.state;
    const minNumOfCaracs = 0;

    if (mustRedirectToGame) {
      return (
        <Redirect to="/game" />
      );
    }

    return (
      <form id="loginForm">
        <label htmlFor="userNameInput">
          <input
            id="userNameInput"
            type="text"
            name="userName"
            value={ userName }
            onChange={ this.onInputChange }
            placeholder="Digite seu nome"
          />
        </label>
        <label htmlFor="userMailInput">
          <input
            id="userMailInput"
            type="email"
            name="userMail"
            value={ userMail }
            onChange={ this.onInputChange }
            placeholder="Digite seu email"
          />
        </label>
        <button
          id="loginBtn"
          type="button"
          disabled={ !(userName.length > minNumOfCaracs
            && userMail.length > 0) } // O botão só será habilitado quando userName e userMail apresentarem, pelo menos, 1 caractere.
          onClick={ this.onLogIn }
        >
          Jogar
        </button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  setLoginInfACProp: PropTypes.func.isRequired,
  fetchTriviaTokenProp: PropTypes.func.isRequired,
  cleanScoreACProp: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchTriviaTokenProp: () => dispatch(fetchTriviaToken()),
  setLoginInfACProp: (userName, userMail) => dispatch(setLoginInfoAC(userName, userMail)),
  cleanScoreACProp: () => dispatch(cleanScoreAC()),
});

export default connect(null, mapDispatchToProps)(LoginForm);
