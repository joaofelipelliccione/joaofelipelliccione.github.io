## Requisitos

`Requisitos obrigatórios:`
- [1 - Adicione à página o título "Paleta de Cores".](#1---adicione-à-página-o-título-paleta-de-cores)
- [2 - Adicione à página uma paleta de quatro cores distintas.](#2---adicione-à-página-uma-paleta-de-quatro-cores-distintas)
- [3 - Adicione na página a cor preta ela deve ser a primeira na paleta de cores.](#3---adicione-na-página-a-cor-preta-ela-deve-ser-a-primeira-na-paleta-de-cores)
- [4 - Adicione à página um quadro de pixels, com 25 pixels.](#4---adicione-à-página-um-quadro-de-pixels-com-25-pixels)
- [5 - Faça com que cada elemento do quadro de pixels possua 40 pixels de largura, 40 pixels de altura e seja delimitado por uma borda preta de 1 pixel.](#5---aplique-a-cada-elemento-do-quadro-de-pixels-deve-possuir-40-pixels-de-largura-e-40-pixels-de-altura-e-ser-delimitado-por-uma-borda-preta-de-1-pixel)
- [6 - Definia a cor preta como cor inicial. Ao carregar a página a cor preta já deve estar selecionada para pintar os pixels](#6---executar-o-carregamento-da-página-a-cor-preta-da-paleta-já-deve-estar-selecionada-para-pintar-os-pixels)
- [7 - Selecione uma das cores da paleta, ao clicar, a cor selecionada é a que será utilizada para preencher os pixels no quadro.](#7---clicar-em-uma-das-cores-da-paleta-a-cor-selecionada-é-que-vai-ser-usada-para-preencher-os-pixels-no-quadro)
- [8 - Clicar em um pixel dentro do quadro após selecionar uma cor na paleta, faz com que o pixel seja preenchido com a cor selecionada.](#8---clicar-em-um-pixel-dentro-do-quadro-após-selecionar-uma-cor-na-paleta-o-pixel-deve-ser-preenchido-com-esta-cor)
- [9 - Crie um botão que, ao ser clicado, limpa o quadro preenchendo a cor de todos seus pixels com branco.](#9---crie-um-botão-que-ao-ser-clicado-limpa-o-quadro-preenchendo-a-cor-de-todos-seus-pixels-com-branco)

`Requisitos bônus:`
- [10 - Faça o quadro de pixels ter seu tamanho definido pelo usuário.](#10---faça-o-quadro-de-pixels-ter-seu-tamanho-definido-pelo-usuário)
- [11 - Limite o tamanho do mínimo e máximo do board.](#11---limite-o-tamanho-do-mínimo-e-máximo-do-board)
- [12 - Faça com que as cores da paleta sejam geradas aleatoriamente ao carregar a página.](#12---faça-com-que-as-cores-da-paleta-sejam-geradas-aleatoriamente-ao-carregar-a-página)


## Requisitos Obrigatórios:


### 1 - Adicione à página o título "Paleta de Cores".

- O título deverá ficar dentro de uma tag `h1` com o `id` denominado `title`;

- O texto do título deve ser **exatamente** "Paleta de Cores".


### 2 - Adicione à página uma paleta de quatro cores distintas.

- A paleta de cores deve ser um elemento com `id` denominado `color-palette`, ao passo que cada cor individual da paleta de cores deve possuir a `classe` `color`;

- A cor de fundo de cada elemento da paleta deverá ser a cor que o elemento representa. **A única cor não permitida na paleta é a cor branca.**;

- Cada elemento da paleta de cores deverá ter uma borda preta, sólida e com 1 pixel de largura;

- A paleta de cores deverá listar todas as cores disponíveis para utilização lado a lado, e deverá ser posicionada abaixo do título "Paleta de Cores";

- A paleta de cores não deve conter cores repetidas.


### 3 - Adicione a cor **preta** como a primeira cor da paleta de cores.


- A primeira cor da paleta é preta

- As demais cores podem ser escolhidas livremente.

### 4 - Adicione à página um quadro de pixels, com 25 pixels.

- O quadro de "pixels" deve ter 5 elementos de largura e 5 elementos de comprimento;

- O quadro de "pixels" deve possuir o `id` denominado `pixel-board`, ao passo que cada "pixel" individual dentro do quadro deve possuir a `classe` denominada `pixel`;

- A cor inicial dos "pixels" dentro do quadro, ao abrir a página, deve ser branca;

-  O quadro de "pixels" deve aparecer abaixo da paleta de cores.


### 5 - Faça com que cada elemento do quadro de pixels possua 40 pixels de largura, 40 pixels de altura e seja delimitado por uma borda preta de 1 pixel.


- O quadro de pixels tem altura e comprimento de 5 elementos

- 40 pixels é o tamanho total do elemento, incluindo seu conteúdo e excluindo a borda preta, que deve ser criada à parte.

### 6 - Defina a cor preta como cor inicial. Ao carregar a página, a cor preta já deve estar selecionada para pintar os pixels

- O elemento da cor preta deve possuir, inicialmente, a `classe` `selected`;

- Note que o elemento que deverá receber a classe `selected` deve ser um dos elementos que possuem a classe `color`, como especificado no **requisito 2**.


### 7 - Clicar em uma das cores da paleta faz com que ela seja selecionada e utilizada para preencher os pixels no quadro.

- A `classe` `selected` deve ser adicionada à cor selecionada na paleta, ao mesmo tempo em que é removida da cor anteriormente selecionada;

- Somente uma das cores da paleta deve ter a `classe` `selected` de cada vez;


### 8 - Clicar em um pixel dentro do quadro após selecionar uma cor na paleta faz com que o pixel seja preenchido com a cor selecionada.


- Ao carregar a página deve ser possível pintar os pixels de preto

- Após selecionar uma outra cor na paleta, é possível pintar os pixels com essa cor


### 9 - Crie um botão que, ao ser clicado, limpa o quadro preenchendo a cor de todos seus pixels com branco.

- O botão tem o `id` denominado `clear-board`

- O botão está posicionado entre a paleta de cores e o quadro de pixels

- O texto do botão é \'Limpar\'

- Ao clicar no botão, o quadro de pixels é totalmente preenchido de branco

