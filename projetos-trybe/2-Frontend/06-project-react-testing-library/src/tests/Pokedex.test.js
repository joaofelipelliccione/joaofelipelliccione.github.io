import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes relacionados ao componente React de classe Pokedex.', () => {
  const NUM_OF_TYPE_FILTERS_BTNS = 7; //  Magic number exigido pelo Lint.

  it('A página deve conter um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);
    const pokedexH2 = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(pokedexH2).toBeInTheDocument();
  });

  it('Os próximos Pokémons da lista devem ser mostrados, um a um,'
    + 'ao clicar sucessivamente no botão.', () => {
    renderWithRouter(<App />);

    // Verificando se o botão para alternar entre pokemons, está sendo renderizado.
    const nextPokemonBtn = screen.getByTestId('next-pokemon');
    expect(nextPokemonBtn).toBeInTheDocument();

    // Testando se o Pikachu é o primeiro Pokemon a ser renderizado, logo quando a aplicação abre.
    const pokemonName = screen.getByTestId('pokemon-name').innerHTML;
    expect(pokemonName).toMatch('Pikachu');

    // Testando se, ao clicar no botão de próximo pokemon, o Charmander aparece.
    userEvent.click(nextPokemonBtn);
    const charmanderNameTag = screen.getByText(/Charmander/i);
    expect(charmanderNameTag).toBeInTheDocument();

    // Testando se, ao clicar no botão de próximo pokemon, o Caterpie aparece.
    userEvent.click(nextPokemonBtn);
    const caterpieNameTag = screen.getByText(/Caterpie/i);
    expect(caterpieNameTag).toBeInTheDocument();

    // Testando se, ao clicar no botão de próximo pokemon, o Ekans aparece.
    userEvent.click(nextPokemonBtn);
    const ekansNameTag = screen.getByText(/Ekans/i);
    expect(ekansNameTag).toBeInTheDocument();

    // Testando se, ao clicar no botão de próximo pokemon, o Alakazam aparece.
    userEvent.click(nextPokemonBtn);
    const alakazamNameTag = screen.getByText(/Alakazam/i);
    expect(alakazamNameTag).toBeInTheDocument();

    // Testando se, ao clicar no botão de próximo pokemon, o Mew aparece.
    userEvent.click(nextPokemonBtn);
    const mewNameTag = screen.getByText(/Mew/i);
    expect(mewNameTag).toBeInTheDocument();

    // Testando se, ao clicar no botão de próximo pokemon, o Rapidash aparece.
    userEvent.click(nextPokemonBtn);
    const rapidashNameTag = screen.getByText(/Rapidash/i);
    expect(rapidashNameTag).toBeInTheDocument();

    // Testando se, ao clicar no botão de próximo pokemon, o Snorlax aparece.
    userEvent.click(nextPokemonBtn);
    const snorlaxNameTag = screen.getByText(/Snorlax/i);
    expect(snorlaxNameTag).toBeInTheDocument();

    // Testando se, ao clicar no botão de próximo pokemon, o Dragonair aparece.
    userEvent.click(nextPokemonBtn);
    const dragonairNameTag = screen.getByText(/Dragonair/i);
    expect(dragonairNameTag).toBeInTheDocument();

    // Testando se, ao clicar no botão de próximo pokemon, o Pikachu volta a aparecer.
    userEvent.click(nextPokemonBtn);
    const pikachuNameTag = screen.getByText(/Pikachu/i);
    expect(pikachuNameTag).toBeInTheDocument();
  });

  it('A página deve renderizar apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemonsArray = screen.getAllByTestId('pokemon-name');

    expect(pokemonsArray).toHaveLength(1);
  });

  it('A página deve renderizar 7 botões de filtro, um para cada tipo de Pokémon.'
    + 'Além disso, deve haver 1 botão de filtro All.', () => {
    renderWithRouter(<App />);

    const typesFilterBtnsArray = screen.getAllByTestId('pokemon-type-button');
    expect(typesFilterBtnsArray).toHaveLength(NUM_OF_TYPE_FILTERS_BTNS);

    const allFilterBtn = screen.getByRole('button', {
      name: /All/i,
    });
    expect(allFilterBtn).toBeInTheDocument();
  });

  it('A partir da seleção de um botão de filtro,'
  + 'a Pokédex deve circular somente pelos pokémons daquele tipo.', () => {
    renderWithRouter(<App />);

    const nextPokemonBtn = screen.getByTestId('next-pokemon');
    expect(nextPokemonBtn).toBeInTheDocument();

    const fireFilterBtn = screen.getByRole('button', {
      name: /Fire/i,
    });
    expect(fireFilterBtn).toBeInTheDocument();

    // Testando se, ao clicar no botão de filtro Fire, o Charmander aparece.
    userEvent.click(fireFilterBtn);
    const charmanderNameTag = screen.getByText(/Charmander/i);
    expect(charmanderNameTag).toBeInTheDocument();

    // Testando se ao clicar no botão de próximo pokemon, com o filtro Fire ativado, o Rapidash aparece.
    userEvent.click(nextPokemonBtn);
    const rapidashNameTag = screen.getByText(/Rapidash/i);
    expect(rapidashNameTag).toBeInTheDocument();

    // Testando se mesmo após clicar em um botão de filtro de tipo, o filtro All continua sendo renderizado.
    const allFilterBtn = screen.getByRole('button', {
      name: /All/i,
    });
    expect(allFilterBtn).toBeInTheDocument();

    // Testando se ao pressionar o botão de filtro All, o Pikachu volta a ser renderizado.
    userEvent.click(allFilterBtn);
    const pikachuNameTag = screen.getByText(/Pikachu/i);
    expect(pikachuNameTag).toBeInTheDocument();
  });
});
