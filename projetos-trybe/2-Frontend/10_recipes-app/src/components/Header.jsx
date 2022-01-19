import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // REF: https://v5.reactrouter.com/web/api/Hooks/uselocation
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const [mustRenderSearchBar, setMustRenderSearchBar] = React.useState(false);
  const location = useLocation();
  const currentPathName = location.pathname;

  const definePageName = (currentPath) => {
    switch (currentPath) {
    case '/comidas':
      return 'Comidas';

    case '/bebidas':
      return 'Bebidas';

    case '/explorar':
      return 'Explorar';

    case '/explorar/comidas':
      return 'Explorar Comidas';

    case '/explorar/comidas/ingredientes':
      return 'Explorar Ingredientes';

    case '/explorar/bebidas':
      return 'Explorar Bebidas';

    case '/explorar/bebidas/ingredientes':
      return 'Explorar Ingredientes';

    case '/explorar/comidas/area':
      return 'Explorar Origem';

    case '/perfil':
      return 'Perfil';

    case '/receitas-feitas':
      return 'Receitas Feitas';

    case '/receitas-favoritas':
      return 'Receitas Favoritas';

    default:
      return 'App de receitas';
    }
  };

  const renderSearchBar = () => {
    if (mustRenderSearchBar) {
      setMustRenderSearchBar(false);
    }
    if (!mustRenderSearchBar) {
      setMustRenderSearchBar(true);
    }
  };

  return (
    <header>
      <div>
        <Link to="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Ícone default de perfil"
          />
        </Link>
        <h1 data-testid="page-title">{ definePageName(currentPathName) }</h1>
        {(currentPathName === '/comidas'
        || currentPathName === '/bebidas'
        || currentPathName === '/explorar/comidas/area') && (
          <button
            type="button"
            onClick={ renderSearchBar }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="Ícone default de pesquisa"
            />
          </button>
        )}
      </div>
      {mustRenderSearchBar && (
        <SearchBar />
      )}
    </header>
  );
}

export default Header;
