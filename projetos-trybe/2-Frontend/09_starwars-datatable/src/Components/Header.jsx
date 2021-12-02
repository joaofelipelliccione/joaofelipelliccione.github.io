import React from 'react';
import SearchBoxFilter from './SearchBoxFilter';
import logo from '../images/star-wars-logo.png';
import '../Styles/Header.css';

function Header() {
  return (
    <header id="pageHeader">
      <div id="headerCentralContainer">
        <img
          src={ logo }
          alt="Logo Star Wars"
        />
        <SearchBoxFilter />
      </div>
    </header>
  );
}

export default Header;
