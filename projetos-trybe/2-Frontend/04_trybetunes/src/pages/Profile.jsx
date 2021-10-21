import React from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI'
import illustration from '../images/ilustracaoProfile.svg'
import '../styles/Profile.css';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      userInfo: {},
    }
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => { // Engloba, entre outras coisas, a função assíncrona getUser(). Essa última, capta as informações do usuário no local storage. Por esse motivo, é importante que seja chamada assim que o componente for montado.
    this.setState({ loading: true });

    const response = await getUser();

    this.setState({
      loading: false,
      userInfo: response,
    });
  }

  render() {
    const { loading, userInfo: { name } } = this.state;

    return (
      <div id="profilePage" data-testid="page-profile">
        <Header />
        <main id="profilePageMain">
          { !loading && <h3 id="profilePageMsg">{`${name}, tudo certo com sua conta! Aproveite o Trybe Tunes!`}</h3> }
          { !loading && <img src={illustration} alt="Ilustração SVG" id="profilePageIllust" /> }
        </main>
      </div>
    );
  }
}

export default Profile;
