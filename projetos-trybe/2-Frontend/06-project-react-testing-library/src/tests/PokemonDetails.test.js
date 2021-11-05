import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data'; // Array de objetos onde, cada objeto, contém informações de um determinado Pokémon.

describe('Testes relacionados ao componente React de classe PokemonDetails.', () => {
  it('A página deve exibir um card de informações detalhadas,'
    + 'oriundas de pokemons[0].', () => {
    renderWithRouter(<App />);

    // Indo em direção à página "More Details" de pokemons[0].name.
    const pokemonMoreDetails = screen.getByRole('link', { name: /more details/i });
    expect(pokemonMoreDetails).toBeInTheDocument();
    userEvent.click(pokemonMoreDetails);

    // Testando se a página "More Details" possui um <h2>pokemons[0].name Details</h2>
    const pokemonDetailsH2 = screen.getByRole('heading', {
      level: 2,
      name: `${pokemons[0].name} Details`,
    });
    expect(pokemonDetailsH2).toBeInTheDocument();

    // Testando se o link de navegação para os detalhes do Pokémon selecionado, NÃO existem quando já estamos na página "More Details".
    expect(pokemonMoreDetails).not.toBeInTheDocument();

    // Testando se a página "More Details" possui um <h2>Summary</h2>
    const SummaryH2 = screen.getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });
    expect(SummaryH2).toBeInTheDocument();

    // Testando se a página "More Details" possui um parágrafo com o resumo do Pokémon específico sendo visualizado.
    const SummaryP = screen.getByText(pokemons[0].summary);
    expect(SummaryP).toBeInTheDocument();
  });

  it('A página deve exibir uma seção'
    + 'com os mapas contendo as localizações de pokemons[0].name.', () => {
    renderWithRouter(<App />);

    // Indo em direção à página "More Details" de pokemons[0].name.
    const pokemonMoreDetails = screen.getByRole('link', { name: /more details/i });
    expect(pokemonMoreDetails).toBeInTheDocument();
    userEvent.click(pokemonMoreDetails);

    // Testando se a página "More Details" possui um <h2>Game Locations of pokemons[0].name</h2>
    const gameLocationsH2 = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${pokemons[0].name}`,
    });
    expect(gameLocationsH2).toBeInTheDocument();

    // Testando se a página "More Details" possui o número certo de mapas sendo renderizados, ou seja, quantidade igual à pokemons[0].foundAt.length.
    const locationImgsArray = screen.getAllByAltText(`${pokemons[0].name} location`);
    expect(locationImgsArray).toHaveLength(pokemons[0].foundAt.length);
    locationImgsArray.forEach((image) => {
      expect(image).toBeInTheDocument();
    });

    // Testando se cada <img /> de mapa possui um atributo src com a URL da localização.
    pokemons[0].foundAt.forEach(({ location, map }, index) => {
      const locationElementOnScreen = screen.getByText(location); // Pegando o elemento renderizado na tela cujo texto seja igual à key 'location'.
      expect(locationElementOnScreen).toBeInTheDocument();
      expect(locationImgsArray[index].src).toMatch(map); // Verificado se o src de cada imagem presente em locationImgsArray, bate com seu map "par" em pokemons[0].foundAt.
    });
  });

  it('Testa se o usuário pode favoritar pokemons[0].name,'
    + 'através da página de detalhe.', () => {
    renderWithRouter(<App />);

    // Indo em direção à página "More Details" de pokemons[0].name.
    const pokemonMoreDetails = screen.getByRole('link', { name: /more details/i });
    expect(pokemonMoreDetails).toBeInTheDocument();
    userEvent.click(pokemonMoreDetails);

    // Testando se a página "More Details" possui um checkBox para favoritar o pokemons[0].name.
    const toFavoriteCheckbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(toFavoriteCheckbox).toBeInTheDocument();

    userEvent.click(toFavoriteCheckbox); // Simulando o clique do usuário em cima da checkbox para favoritar o pokemons[0].name.

    const favoriteIcon = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(favoriteIcon).toBeInTheDocument(); // Assegurando que a estrelinha de favoritado esta presente na página, após o clique do usuário.

    userEvent.click(toFavoriteCheckbox); // Simulando o clique do usuário em cima da checkbox para DESFAVORITAR o pokemons[0].name.
    expect(favoriteIcon).not.toBeInTheDocument(); // Assegurando que a estrelinha de favoritado NÃO esta mais presente na página, após o 2° clique do usuário.

    // Testando se o label do checkbox contem o texto "Pokémon favoritado?".
    const labelText = screen.getByLabelText('Pokémon favoritado?');
    expect(labelText).toBeInTheDocument();
  });
});
