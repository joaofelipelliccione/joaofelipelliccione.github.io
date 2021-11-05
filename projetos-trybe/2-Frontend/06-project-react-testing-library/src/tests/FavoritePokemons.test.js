import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testes relacionados ao componente React de classe FavoritePokemons.', () => {
  it('A página deve exibir a mensagem No favorite pokemon found,'
    + 'se a pessoa não tiver pokémons favoritos.', () => {
    render(<FavoritePokemons />);
    const message = screen.getByText(/No favorite pokemon found/i);

    expect(message).toBeInTheDocument();
  });

  it('A página deve exibir todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25'); // "Forçando" o redirecionamento para a URL "/pokemons/25", que é a página "More Details" do Pikachu.

    const toFavoriteCheckbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(toFavoriteCheckbox).toBeInTheDocument();
    userEvent.click(toFavoriteCheckbox); // Simulando o clique do usuário em cima da checkbox para favoritar o Pikachu.

    const pikachuFavorite = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(pikachuFavorite).toBeInTheDocument(); // Assegurando que a estrelinha de favoritado esta presente na página, após o clique do usuário.

    history.push('/favorites'); // "Forçando" o redirecionamento para a URL "/favorites", para ver se o Pikachu esta presente.
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites'); // Assegurando que estamos na página Favorite Pokémons.

    const pikachuGif = screen.getByAltText(/Pikachu sprite/i);
    expect(pikachuGif).toBeInTheDocument();
  });
});
