import React from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import { createUser } from '../services/userAPI';
import logo from '../images/trybetunesLogo.png'
import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      loading: false,
      redirectToSearch: false,
    };
  }

  onInputChange = ({ target }) => { // Função que altera o valor de qualquer estado, sempre que um input for realizado no elemento onde ela está sendo chamada. || OBS: Para que tal função funcione, os 'name' de cada um dos elementos do Forms devem ser iguais ao nome dos estados.
    const { name } = target;
    const formElementValue = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ [name]: formElementValue });
  }

  onRegisterClick = async () => { // Engloba, entre outras coisas, a função assíncrona createUser(). Essa última, simula uma requisição de criação de cadastro.
    const { username } = this.state;
    this.setState({ loading: true });

    await createUser({ name: username }); // Salva as informações do usuário, no local storage.

    this.setState({
      loading: false,
      redirectToSearch: true,
    });
  }

  registerWithEnter = (e) => { // Permite fazer o login pressionando a tecla Enter.
    e.preventDefault();
    this.onRegisterClick();
  }

  render() {
    const { username, loading, redirectToSearch } = this.state;
    const numOfCharacters = 3; // O React pede para que declare uma constante, ao invés de utilizar o número na condicional.

    // A mensagem "Carregando", contida no componente React de classe Loading, será renderizada quando o estado "loading" for true.
    if (loading) {
      return (<span id="enteringMessage">Entrando...</span>);
    }

    // O usuário será redirecionado para o path "/search" após se cadastrar na plataforma, ou seja, quando o estado "redirectToSearch" for true.
    if (redirectToSearch) {
      return (<Redirect to="/search" />);
    }

    return (
      <div>
        <main data-testid="page-login">
          <img src={logo} alt="trybetunes-logo" />
          <form>
            <label htmlFor="login-name-input">
              <input
                id="login-name-input"
                data-testid="login-name-input"
                type="text"
                name="username"
                value={ username }
                onChange={ this.onInputChange }
                onKeyPress={ (event) => event.key === 'Enter' && this.registerWithEnter(event) }
                placeholder="Nome"
              />
            </label>
            <br />
            <button
              id="login-button"
              data-testid="login-submit-button"
              type="button"
              disabled={ username.length < numOfCharacters } // O botão só será habilitado quando o estado 'username' tiver 3 caracteres ou mais.
              onClick={ this.onRegisterClick }
            >
              Entrar
            </button>
          </form>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Login;
