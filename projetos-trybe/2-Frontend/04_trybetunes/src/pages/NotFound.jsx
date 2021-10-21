import React from 'react';
import Header from '../components/Header'
import notFoundMessage from '../images/notFoundMsg.png'
import '../styles/NotFound.css';

class NotFound extends React.Component {
  render() {
    return (
      <div id="notFoundPage" data-testid="page-not-found">
        <Header />
        <img id="notFoundImg" src={notFoundMessage} alt="Página não encontrada."/>
      </div>
    );
  }
}

export default NotFound;
