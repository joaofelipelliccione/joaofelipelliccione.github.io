import React from 'react';

class Footer extends React.Component { // Componente responsável pelo rodapé da página. Será chamado dentro do Componente React de classe 'App'.
  render() {
    return (
      <footer className='pageFooter'>
        <span>
        Developed by <a href="https://github.com/joaofelipelliccione" rel="noopener noreferrer" target="_blank">João Felipe Pelliccione</a>
        </span>
      </footer>
    );
  }
}

export default Footer;