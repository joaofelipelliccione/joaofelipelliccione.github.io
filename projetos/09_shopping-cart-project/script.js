function getShopCartContainer() { // Função que capta o elemento <ol class="cart__items"></ol>. Fiz essa função pois precisei captar tal elemento muitas vezes, ao longo do código.
  return document.querySelector('.cart__items');
}

function cartValueContainer() { // Função que capta o elemento <output class="total-price"></output>. Fiz essa função pois precisei captar tal elemento muitas vezes, ao longo do código.
  return document.querySelector('.total-price');
}

function createProductImageElement(imageSource) { // Função definida pela Trybe.
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) { // Função definida pela Trybe.
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id, title, thumbnail }) { // Alterei o nome das chaves, para que elas batessem com o 'JSON' que a API retorna.
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', '🛒'));

  return section;
} // Função definida pela Trybe.

function getComputerPrice(htmlElement) { // [REQUISITO 5]: Função que capta o preço do computador adicionado ou removido do carrinho de compras.
  const compInfoStringForm = htmlElement.innerText; // 'SKU: MLB1986960528 | NAME: Notebook Multilaser Legacy Cloud Pc131 Cinza 14 , Intel Atom X5-z8350 2gb De Ram 32gb Ssd 1366x768px Windows 10 Home | PRICE: $1633.91'
  const compInfoArrayForm = compInfoStringForm.split('|'); // ['SKU: MLB1986960528 ', ' NAME: Notebook Multilaser Legacy Cloud Pc131 Cinz…0 2gb De Ram 32gb Ssd 1366x768px Windows 10 Home ', ' PRICE: $1633.91']
  const compPriceStringForm = compInfoArrayForm[compInfoArrayForm.length - 1]; // 'PRICE: $1633.91'
  const compPriceArrayForm = compPriceStringForm.split('$'); // [' PRICE: ', '1633.91']
  const compPriceString = compPriceArrayForm[compPriceArrayForm.length - 1]; // '1633.91'
  const compPrice = Number(Number(compPriceString).toFixed(2)); // 1633.91
  return compPrice;
}

function saveShopCart() { // [REQUISITO 4]: Função que armazena o atual estado do carrinho de compras no localStorage sempre que um computador for adicionado [addOnShopCart(] ou removido [cartItemClickListener()].
  const shopCartContent = getShopCartContainer().innerHTML; // Capturando todo o conteúdo dentro da <ol class="cart__items"></ol>.
  localStorage.setItem('userShopCart', shopCartContent); // Salvando o conteúdo captado acima, no localStorage.
  const cartTotalValue = cartValueContainer().innerHTML; // Capturando todo o conteúdo dentro de <output class="total-price"></output>.
  localStorage.setItem('cartTotalValue', cartTotalValue); // Salvando o conteúdo captado acima, no localStorage.
}

function cartItemClickListener(event) { // [REQUISITO 3]: Função que permite que os computadores adicionados ao carrinho de compras, sejam removidos quando clicados.
  const cartTotalCont = cartValueContainer(); // Captando o <output class="total-price"></output> e adicionando-o à constante cartTotalCont.
  event.target.remove(); // Removendo o item do carrinho que for clicado.
  const res = Number((Number(cartTotalCont.innerHTML) - getComputerPrice(event.target)).toFixed(2)); // Captando o preço do computador recém-excluído do carrinho de compras e o subtraindo do innerHTML de <output class="total-price"></output>.
  cartTotalCont.innerHTML = res; // Imputando o resultado da linha acima dentro de <output class="total-price"></output>.
  
  saveShopCart();
}

function getShopCartFromLocalStorage() { // [REQUISITO 4]: Função que capta, do localStorage, o atual estado do carrinho de compras. Feito isso, o respectivo estado é adicionado como innerHTML do <ol class="cart__items"></ol>, captado através da getShopCartContainer().
  getShopCartContainer().innerHTML = localStorage.getItem('userShopCart');
  cartValueContainer().innerHTML = localStorage.getItem('cartTotalValue');

  // Todos os elementos captados do localStorage devem poder ser removidos quando clicados, assim como ocorre quando um novo computador é adicionado.
  Array.from(getShopCartContainer().children).forEach((computer) => {
    computer.addEventListener('click', cartItemClickListener);
  });
}

function createCartItemElement({ id, title, price }) { // [REQUISITO 2]: Alterei o nome das chaves, para que elas batessem com o 'JSON' que a API retorna.
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener); // [REQUISITO 3]: Todos os itens adicionados ao carrinho já vem com o evento de click acoplado.
  return li;
}

/* [REQUISITO 1]: Função que verifica se o argumento imputado em 'url' é igual à "https://api.mercadolibre.com/sites/MLB/search?q=computador".
  - Caso seja: A função retornará um array de objetos onde, cada objeto, equivale à um computador diferente.
  - Caso não seja: A função lançará um erro pedindo para que se verifique a URL imputada em 'url'.
  */
async function getMeliComputers(url) {
  if (url === 'https://api.mercadolibre.com/sites/MLB/search?q=computador') {
    return fetch(url)
      .then((response) => response.json()) // Alterando a response da requisição para o formato JSON.
      .then((allList) => allList.results); // Retornando um array de objetos onde, cada objeto, equivale à um computador diferente.
      // REMOVE LOADING
  }
  throw new Error('URL não bate com https://api.mercadolibre.com/sites/MLB/search?q=computador');
}

/* [REQUISITO 1]: Função que, a partir da createProductItemElement(), adiciona 'id', 'title' e 'thumbnail' (imagem) de cada objeto presente no array retornado por getMeliComputers(), na <section class="items"></section> do index.html. */
async function fillHtmlItemsSection() {
  const loadingElement = document.createElement('span'); // [REQUISITO 7]: Criando <span class="loading">Loading...</span>.
  loadingElement.className = 'loading';
  loadingElement.innerHTML = 'Loading...';
  const bodyElement = document.getElementById('htmlBody');
  bodyElement.insertAdjacentElement('afterbegin', loadingElement); // Inserindo <span class="loading">Loading...</span> como primeiro filho de <body></body>.

  const pcs = await getMeliComputers('https://api.mercadolibre.com/sites/MLB/search?q=computador'); // Utiliza-se o 'await' pois getMeliComputers() é assíncrona e preciso esperar seu retorno para seguir com as atividades síncronas abaixo.
  document.querySelector('.loading').remove(); // Removendo <span class="loading">Loading...</span>, pois as informações da API já foram recebidas.

  const compsContainer = document.querySelector('.items'); // Captando o elemento <section class="items"></section>.

  return pcs.forEach((computerObj) => { // Cria uma <section> que engloba 'id', 'title' e 'thumbnail' (imagem) de cada objeto presente em 'pcs', e a adiciona em 'compsContainer'.
    compsContainer.appendChild(createProductItemElement(computerObj));
  });
}

async function getComputerInfo(id) { // [REQUISITO 2]: Função que faz uma requisição para a API do MELI visando captar as informações de um determinado produto, cuja identificação é igual à 'id'. Será utilizada dentro da addOnShopCart(). 
  return fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((response) => response.json());
}

function addOnShopCart() { // [REQUISITO 2]: Função que permite a adição de um determinado computador, ao carrinho de compras.
  const allAddOnCartBtnsArray = [...document.getElementsByClassName('item__add')]; // O getElementsByClassName(), que está captando todos os botões 'Adicionar ao carrinho!', retorna um HTML Collection. Para iterar ele, eu passei todo seu conteúdo para o Array 'allAddOnCartBtnsArray'.
  const shopCartContainer = getShopCartContainer(); // Captando o elemento <ol class="cart__items"></ol>.
  const cartTotalCont = cartValueContainer(); // Captando o <span id="mustBePayed"></span> e adicionando-o à constante cartTotalCont.

  return allAddOnCartBtnsArray.forEach((btn) => {
    btn.addEventListener('click', async (event) => { // Adicionando evento de clique para todos os botões 'Adicionar ao carrinho!'.
      const clickedCompId = event.target.parentElement.firstElementChild.innerText; // Capturando a identificação (id) do computador quando seu respectivo botão 'Adicionar ao carrinho!', for clicado.
      const clickedCompInfo = await getComputerInfo(clickedCompId); // Chamando a getComputerInfo() com o intuito de ter acesso às informações do computador adicionado ao carrinho.
      const newElement = createCartItemElement(clickedCompInfo); // Criando <li></li>s referentes a cada computador adicionado ao carrinho.
      shopCartContainer.appendChild(newElement); // Inserindo as <li></li>s criadas na linha acima, dentro de <ol class="cart__items"></ol>.
      const r = Number((Number(cartTotalCont.innerHTML) + getComputerPrice(newElement)).toFixed(2)); // Captando o preço do computador recém-adicionado ao carrinho de compras e o adicionando ao innerHTML de <span id="mustBePayed"></span>.
      cartTotalCont.innerHTML = r; // Imputando o resultado da linha acima dentro de <span id="mustBePayed"></span>.
      saveShopCart(); // Chamando a função que salva os itens do carrinho no localStorage.
    });
  });
}

function cleanShopCart() { // [REQUISITO 6]: Função que prepara o botão de de limpar o carrinho.
  const clearBtn = document.querySelector('.empty-cart'); // Captando o elemento <button class="empty-cart"></button>.

  clearBtn.addEventListener('click', () => {
    const shopCartContent = getShopCartContainer();
    shopCartContent.innerHTML = ''; // Apagando o conteúdo dentro de <ol class="cart__items"></ol>.
    const cartTotalValue = cartValueContainer();
    cartTotalValue.innerHTML = 0; // Apagando o conteúdo dentro de <output class="total-price"></output>.
    localStorage.setItem('userShopCart', shopCartContent); // Salvando o conteúdo captado acima, no localStorage.
    localStorage.setItem('cartTotalValue', cartTotalValue); // Salvando o conteúdo captado acima, no localStorage.
    saveShopCart(); // Chamando a função que salva o carrinho vazio no localStorage.
  });
}

window.onload = async () => { // A window.onload() é uma função como qualquer outra. Dito isso, para que possa chamar funções assíncronas dentro dela, precisei adicionar o 'async'.
  await fillHtmlItemsSection(); // Tendo em vista que as funções abaixo precisam do HTML já com o conteúdo oriundo da API, utilizei o 'await'.
  addOnShopCart();
  getShopCartFromLocalStorage();
  cleanShopCart();
};
