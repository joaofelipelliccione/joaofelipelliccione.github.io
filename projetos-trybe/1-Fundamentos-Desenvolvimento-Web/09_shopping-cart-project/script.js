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

function getProductPrice(htmlElement) { // [REQUISITO 5]: Função que capta o preço do produto adicionado ou removido do carrinho de compras.
  const prodInfoStringForm = htmlElement.innerText; // 'SKU: MLB1986960528 | NAME: Notebook Multilaser Legacy Cloud Pc131 Cinza 14 , Intel Atom X5-z8350 2gb De Ram 32gb Ssd 1366x768px Windows 10 Home | PRICE: $1633.91'
  const prodInfoArrayForm = prodInfoStringForm.split('|'); // ['SKU: MLB1986960528 ', ' NAME: Notebook Multilaser Legacy Cloud Pc131 Cinz…0 2gb De Ram 32gb Ssd 1366x768px Windows 10 Home ', ' PRICE: $1633.91']
  const prodPriceStringForm = prodInfoArrayForm[prodInfoArrayForm.length - 1]; // 'PRICE: $1633.91'
  const prodPriceArrayForm = prodPriceStringForm.split('$'); // [' PRICE: ', '1633.91']
  const prodPriceString = prodPriceArrayForm[prodPriceArrayForm.length - 1]; // '1633.91'
  const productPrice = Number(Number(prodPriceString).toFixed(2)); // 1633.91
  return productPrice;
}

function saveShopCart() { // [REQUISITO 4]: Função que armazena o atual estado do carrinho de compras no localStorage sempre que um produto for adicionado [addOnShopCart(] ou removido [cartItemClickListener()].
  const shopCartContent = getShopCartContainer().innerHTML; // Capturando todo o conteúdo dentro da <ol class="cart__items"></ol>.
  localStorage.setItem('userShopCart', shopCartContent); // Salvando o conteúdo captado acima, no localStorage.
  const cartTotalValue = cartValueContainer().innerHTML; // Capturando todo o conteúdo dentro de <output class="total-price"></output>.
  localStorage.setItem('cartTotalValue', cartTotalValue); // Salvando o conteúdo captado acima, no localStorage.
}

function cartItemClickListener(event) { // [REQUISITO 3]: Função que permite que os produtos adicionados ao carrinho de compras, sejam removidos quando clicados.
  const cartTotalCont = cartValueContainer(); // Captando o <output class="total-price"></output> e adicionando-o à constante cartTotalCont.
  event.target.remove(); // Removendo o item do carrinho que for clicado.
  const res = Number((Number(cartTotalCont.innerHTML) - getProductPrice(event.target)).toFixed(2)); // Captando o preço do produto recém-excluído do carrinho de compras e o subtraindo do innerHTML de <output class="total-price"></output>.
  cartTotalCont.innerHTML = res; // Imputando o resultado da linha acima dentro de <output class="total-price"></output>.
  
  saveShopCart();
}

function getShopCartFromLocalStorage() { // [REQUISITO 4]: Função que capta, do localStorage, o atual estado do carrinho de compras. Feito isso, o respectivo estado é adicionado como innerHTML do <ol class="cart__items"></ol>, captado através da getShopCartContainer().
  getShopCartContainer().innerHTML = localStorage.getItem('userShopCart');
  cartValueContainer().innerHTML = localStorage.getItem('cartTotalValue');

  // Todos os elementos captados do localStorage devem poder ser removidos quando clicados, assim como ocorre quando um novo produto é adicionado.
  Array.from(getShopCartContainer().children).forEach((product) => {
    product.addEventListener('click', cartItemClickListener);
  });
}

function createCartItemElement({ id, title, price }) { // [REQUISITO 2]: Alterei o nome das chaves, para que elas batessem com o 'JSON' que a API retorna.
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener); // [REQUISITO 3]: Todos os itens adicionados ao carrinho já vem com o evento de click acoplado.
  return li;
}

/* [REQUISITO 1]: Função que faz um fetch para uma 'url' similar à "https://api.mercadolibre.com/sites/MLB/search?q=produto-qualquer".
  - Caso o fetch corra bem: A função retornará um array de objetos onde, cada objeto, equivale à um produto.
  - Caso o fetch corra mal: A função lançará um erro pedindo para que o usuário pesquise outro produto.
  */
async function getMeliProducts(url) {
  return fetch(url)
    .then((response) => response.json().then((allList) =>
      response.ok ? Promise.resolve(allList.results) : Promise.reject(new Error('Erro: Pesquise outro item!'))
    ));
/*
  .then((response) => response.json()) // Alterando a response da requisição para o formato JSON.
  .then((allList) => allList.results); // Retornando um array de objetos onde, cada objeto, equivale à um produto.
*/
}

/* [REQUISITO 1]: Função que, a partir da createProductItemElement(), adiciona 'id', 'title' e 'thumbnail' (imagem) de cada objeto presente no array retornado por getMeliProducts(), na <section class="items"></section> do index.html. */
async function fillHtmlItemsSection(item = 'Smartphone') { // Caso nenhum argumento for passado para o parâmetro 'item', ele será preenchido com 'Smartphone'.
  const loadingElement = document.createElement('span'); // [REQUISITO 7]: Criando <span class="loading">Loading...</span>.
  loadingElement.className = 'loading';
  loadingElement.innerHTML = 'Loading...';
  const headerElement = document.getElementById('htmlHeader');
  headerElement.insertAdjacentElement('afterEnd', loadingElement); // Inserindo <span class="loading">Loading...</span> como primeiro filho de <body></body>.

  const pcs = await getMeliProducts(`https://api.mercadolibre.com/sites/MLB/search?q=${item}`); // Utiliza-se o 'await' pois getMeliProducts() é assíncrona e preciso esperar seu retorno para seguir com as atividades síncronas abaixo.
  //document.querySelector('.loading').remove(); // Removendo <span class="loading">Loading...</span>, pois as informações da API já foram recebidas.

  const productsContainer = document.querySelector('.items'); // Captando o elemento <section class="items"></section>.

  return pcs.forEach((productObj) => { // Cria uma <section> que engloba 'id', 'title' e 'thumbnail' (imagem) de cada objeto presente em 'pcs', e a adiciona em 'productsContainer'.
    productsContainer.appendChild(createProductItemElement(productObj));
  });
}

/* [REQUISITO EXTRA]: Permite que o usuário realize pesquisas por produtos específicos. */
function searchedProduct() {
  const searchBtn = document.getElementById('searchBtn'); // Capturando o elemento <button id="searchBtn"></button>.
  const displayedProducts = document.querySelector('.items'); // Capturando o elemento <section class="items"></section>.
  const searchBox = document.getElementById('searchBox'); // Capturando o elemento <input type="text" placeholder="O que você procura?" id="searchBox">.

  searchBtn.addEventListener('click', async () => { // Adicionando evento de clique no elemento <button id="searchBtn"></button>.
    if(searchBox.value !== '') { // O clique só funcionará se o usuário inserir o nome de algum produto na caixa de pesquisa.
      displayedProducts.innerHTML = ""; // Sempre que o botão for clicado, os produtos atualmente mostrados são apagados.
      const productName = searchBox.value.split(' ').join('-'); // Ex: 'Macbook Pro M1' --> 'Macbook-Pro-M1'
  
      await fillHtmlItemsSection(productName); // A função que preenche a página é chamada e recebe o nome do produto pesquisado como argumento.
      addOnShopCart();
      getShopCartFromLocalStorage();
      cleanShopCart();
    }
  });
}

async function getProductInfo(id) { // [REQUISITO 2]: Função que faz uma requisição para a API do MELI visando captar as informações de um determinado produto, cuja identificação é igual à 'id'. Será utilizada dentro da addOnShopCart(). 
  return fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((response) => response.json());
}

function addOnShopCart() { // [REQUISITO 2]: Função que permite a adição de um determinado produto, ao carrinho de compras.
  const allAddOnCartBtnsArray = [...document.getElementsByClassName('item__add')]; // O getElementsByClassName(), que está captando todos os botões 'Adicionar ao carrinho!', retorna um HTML Collection. Para iterar ele, eu passei todo seu conteúdo para o Array 'allAddOnCartBtnsArray'.
  const shopCartContainer = getShopCartContainer(); // Captando o elemento <ol class="cart__items"></ol>.
  const cartTotalCont = cartValueContainer(); // Captando o <span id="mustBePayed"></span> e adicionando-o à constante cartTotalCont.

  return allAddOnCartBtnsArray.forEach((btn) => {
    btn.addEventListener('click', async (event) => { // Adicionando evento de clique para todos os botões 'Adicionar ao carrinho!'.
      const clickedProdId = event.target.parentElement.firstElementChild.innerText; // Capturando a identificação (id) do produto quando seu respectivo botão 'Adicionar ao carrinho!', for clicado.
      const clickedProdInfo = await getProductInfo(clickedProdId); // Chamando a getProductInfo() com o intuito de ter acesso às informações do produto adicionado ao carrinho.
      const newElement = createCartItemElement(clickedProdInfo); // Criando <li></li>s referentes a cada produto adicionado ao carrinho.
      shopCartContainer.appendChild(newElement); // Inserindo as <li></li>s criadas na linha acima, dentro de <ol class="cart__items"></ol>.
      const r = Number((Number(cartTotalCont.innerHTML) + getProductPrice(newElement)).toFixed(2)); // Captando o preço do produto recém-adicionado ao carrinho de compras e o adicionando ao innerHTML de <span id="mustBePayed"></span>.
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
  searchedProduct(); // Função que permite que o usuário procure por um determinado produto.
}
