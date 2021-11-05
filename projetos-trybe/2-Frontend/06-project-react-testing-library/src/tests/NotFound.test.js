import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testes relacionados ao componente React de classe NotFound.', () => {
  it('A página deve conter um heading h2 com o texto Page requested not found 😭.', () => {
    render(<NotFound />);
    const notFoundH2 = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found crying emoji/i,
    });

    expect(notFoundH2).toBeInTheDocument();
  });

  it('A página deve conter uma imagem específica.', () => {
    render(<NotFound />);
    const pageImgElement = screen.getAllByRole('img')[1]; // Estou captando a segunda <img /> presente na tela, ou seja, a imagem do Pikachu chorando. (OBS: A primeira imagem é o emoji chorando).
    const pageImgElementSrc = pageImgElement.src; // Estou extraindo a fonte (src) da <img /> grande, captada acima.

    expect(pageImgElement).toBeInTheDocument();
    expect(pageImgElementSrc).toMatch('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    // REF: https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
  });
});
