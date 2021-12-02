import React from 'react';
import Context from '../Context/Context';

function SearchBoxFilter() {
  const { filters, setFilters } = React.useContext(Context);

  return (
    <input
      type="text"
      placeholder="Nome de planeta..."
      value={ filters.filterByName.name }
      onChange={ ({ target }) => setFilters({
        ...filters,
        filterByName: { name: target.value },
      }) }
    />
  );
}

export default SearchBoxFilter;
