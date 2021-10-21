import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import logo from '../images/trybetunesLogoWhite.png'
import '../styles/Header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      username: '',
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => { // Engloba, entre outras coisas, a função assíncrona getUser(). Essa última, capta as informações do usuário no local storage. Por esse motivo, é importante que seja chamada assim que o componente for montado.
    this.setState({ loading: true });

    const response = await getUser();
    const { name } = response;

    this.setState({
      loading: false,
      username: name,
    });
  }

  render() {
    const { loading, username } = this.state;

    // A mensagem "Carregando", contida no componente React de classe Loading, será renderizada quando o estado "loading" for true.

    return (
      <header data-testid="header-component">
        <div id="logoAndUserBar">
          <img src={logo} alt="trybetunes-logo" />
          <Link to='/' data-testid="header-user-name">Sair</Link>
        </div>
        <div id="linksBar">
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
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
