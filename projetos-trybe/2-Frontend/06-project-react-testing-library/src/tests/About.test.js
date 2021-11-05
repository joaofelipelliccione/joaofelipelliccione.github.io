import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testes relacionados ao componente React de classe About.', () => {
  it('A página deve conter um heading h2 com o texto About Pokédex.', () => {
    render(<About />);
    const aboutPokedexH2 = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(aboutPokedexH2).toBeInTheDocument();
  });

  it('A página deve conter dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);
    const paragraphsArray = screen.getAllByText(/Pokémons/i); // Os dois parágrafos apresentam a palavra 'Pokémons', por isso utilizei tal saída.

    expect(paragraphsArray).toHaveLength(2);
  });

  it('A página deve conter uma imagem específica da Pokédex.', () => {
    render(<About />);
    const pageImgElement = screen.getByRole('img'); // Estou captando a única <img /> presente na tela.
    const pageImgElementSrc = pageImgElement.src; // Estou extraindo a fonte (src) da <img /> acima.

    expect(pageImgElement).toBeInTheDocument();
    expect(pageImgElementSrc).toMatch('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    // REF: https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
  });
});
