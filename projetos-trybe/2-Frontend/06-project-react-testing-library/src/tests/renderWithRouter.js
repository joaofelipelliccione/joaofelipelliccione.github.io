import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();

  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

export default renderWithRouter;

// Observações Pessoais:
// A renderWithRouter() é uma função customizada (helper) para fazer testes com rotas. Ela substitui a tradicional função render da RTL, que não dá suporte ao router.
// A renderWithRouter() usa o createMemoryHistory para embutir, no componente passado como argumento, o history oriundo de <BrowserRouter></BrowserRouter>.
// A renderWithRouter() retorna um objeto com tudo o que a função render(), nativa do RTL engloba, mais um history "novo em folha".
