import React from 'react';

class Header extends React.Component { // Componente responsável pelo cabeçalho da página. Será chamado dentro do Componente React de classe 'App'.
  render() {
    return (
      <header className='movie-card-header'>
        <h1 className='page-title'>Movie Cards Library</h1>
      </header>
    );
  }
}

export default Header;
