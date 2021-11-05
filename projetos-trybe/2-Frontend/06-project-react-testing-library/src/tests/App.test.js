import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes relacionados ao componente React de classe App', () => {
  it('O topo da aplicação deve conter um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: /About/i });
    expect(aboutLink).toBeInTheDocument();

    const favPokLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favPokLink).toBeInTheDocument();
  });

  it('A aplicação deve ser redirecionada para a página inicial (/)'
    + 'ao clicar no link Home da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />); // Desestruturando o history ("novo em folha") de <App />, para conseguir acessar { location: { pathname } } utilizado abaixo. O respectivo history é oriundo do objeto que a helper renderWithRouter() retorna.
    const homeLink = screen.getByRole('link', { name: /Home/i });

    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink); // Clicou no <Link>Home</Link>.
    const { pathname } = history.location; // Captando o pathname após o clique.
    expect(pathname).toBe('/');
  });

  it('A aplicação deve ser redirecionada para a página About (/about)'
    + 'ao clicar no link About da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });

    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('A aplicação deve ser redirecionada para a página Pokémons Favoritados (/favorites)'
    + 'ao clicar no link Favorite Pokémons da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const favPokLink = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(favPokLink).toBeInTheDocument();
    userEvent.click(favPokLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('A aplicação deve ser redirecionada para a página Not Found'
    + 'ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/inexistente'); // "Forçando" o redirecionamento para a URL "/pagina/inexistente", com o intuito de verificar os elementos da Not Found.

    const notFoundImg = screen.getByAltText('Pikachu crying '
      + 'because the page requested was not found');
    expect(notFoundImg).toBeInTheDocument();
  });
});
