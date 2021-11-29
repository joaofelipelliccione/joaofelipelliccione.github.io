import React from 'react';
import { Link } from 'react-router-dom';
import settingsImg from '../images/settings-img.svg';
import '../styles/settings.css';

class Settings extends React.Component {
  render() {
    return (
      <div id="settingsPage">
        <h1>
          Página reservada para
          {' '}
          <i>features</i>
          {' '}
          futuros
        </h1>
        <Link
          to="/"
        >
          <button
            id="backToHomeFromSettings"
            type="button"
          >
            Voltar p/ Home
          </button>
        </Link>
        <img src={ settingsImg } alt="Imagem Settings" />
      </div>
    );
  }
}

export default Settings;
