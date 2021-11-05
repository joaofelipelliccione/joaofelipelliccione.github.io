import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data'; // Array de objetos onde, cada objeto, contém informações de um determinado Pokémon.

describe('Testes relacionados ao componente React de classe Pokemon.', () => {
  it('A página deve exibir um card com as informações contidas em pokemons[0].', () => {
    renderWithRouter(<App />);

    // Testando se o pokemons[0].name é o primeiro Pokemon a ser renderizado, logo quando a aplicação abre.
    const pokemonNameTagP = screen.getByTestId('pokemon-name');
    expect(pokemonNameTagP.innerHTML).toMatch(pokemons[0].name);

    // Testando se pokemons[0].type é o tipo exibido, quando pokemons[0].name está sendo renderizado.
    const pokemonTypeTagP = screen.getByTestId('pokemon-type');
    expect(pokemonTypeTagP.innerHTML).toMatch(pokemons[0].type);

    // Testando se o peso médio correto é exibido, quando pokemons[0].name está sendo renderizado.
    const pokemonWeightTagP = screen.getByTestId('pokemon-weight');
    expect(pokemonWeightTagP.innerHTML).toMatch(
      `Average weight: ${pokemons[0]
        .averageWeight.value} ${pokemons[0]
        .averageWeight.measurementUnit}`,
    );

    // Testando se o GIF do pokemons[0].name está sendo renderizado.
    const pageImgElement = screen.getByRole('img'); // Estou captando a única <img /> presente na tela, que é o GIF do pokemons[0].name.
    const pageImgElementAlt = pageImgElement.alt; // Estou extraindo o alt da <img /> acima.
    const pageImgElementSrc = pageImgElement.src; // Estou extraindo a fonte (src) da <img /> acima.

    expect(pageImgElement).toBeInTheDocument();
    expect(pageImgElementAlt).toMatch(`${pokemons[0].name} sprite`);
    expect(pageImgElementSrc).toMatch(pokemons[0].image);
    // REF: https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
  });

  it('A página deve renderizar um link de navegação'
    + 'que exibi detalhes do pokemons[0].name.', () => {
    const { history } = renderWithRouter(<App />);

    // Testando se o pokemons[0].name é o primeiro Pokemon a ser renderizado, logo quando a aplicação abre.
    const pokemonNameTagP = screen.getByTestId('pokemon-name');
    expect(pokemonNameTagP.innerHTML).toMatch(pokemons[0].name);

    // Testando se o href do Link 'More Details' possui a URL "/pokemons/id", quando pokemons[0].name está sendo renderizado.
    const pokemonMoreDetails = screen.getByRole('link', { name: /more details/i });
    const pokemonMoreDetailsHref = pokemonMoreDetails.href;
    expect(pokemonMoreDetails).toBeInTheDocument();
    expect(pokemonMoreDetailsHref).toMatch(`/pokemons/${pokemons[0].id}`);

    // Testando se a página é redirecionada para URL "/pokemons/id", quando o usuário clica no link 'More Details'.
    userEvent.click(pokemonMoreDetails);
    const { pathname } = history.location;
    const pokemonDetailsH2 = screen.getByRole('heading', {
      level: 2,
      name: `${pokemons[0].name} Details`,
    });

    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
    expect(pokemonDetailsH2).toBeInTheDocument();
  });

  it('A página deve renderizar um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pokemons[0].id}`); // "Forçando" o redirecionamento para a página "More Details" de pokemons[0].name.

    const toFavoriteCheckbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(toFavoriteCheckbox).toBeInTheDocument();
    userEvent.click(toFavoriteCheckbox); // Simulando o clique do usuário em cima da checkbox para favoritar o pokemons[0].name.

    const favoriteIcon = screen.getByRole('img', {
      name: `${pokemons[0].name} is marked as favorite`,
    });
    expect(favoriteIcon).toBeInTheDocument(); // Assegurando que a estrelinha de favoritado esta presente na página, após o clique do usuário.
    expect(favoriteIcon.src).toMatch('/star-icon.svg');
    expect(favoriteIcon.alt).toMatch(`${pokemons[0].name} is marked as favorite`);
  });
});
