import React from 'react';
import Context from '../Context/Context';
import '../Styles/NumericFilterForm.css';

function NumericFilterForm() {
  const { data, setDataToRender, dropdownContent1,
    setDropdownContent1, filters, setFilters } = React.useContext(Context);

  const [column, setColumn] = React.useState(dropdownContent1[0]);
  const [comparison, setComparison] = React.useState('maior que');
  const [value, setValue] = React.useState('100000');
  const numericFilterObj = { column, comparison, value }; // União dos 3 estados locais em um único objeto, para enviá-lo para o contexto global quando o botão for clicado.

  const dropdownContent2 = ['maior que', 'menor que', 'igual a'];

  const onFilterBtnClick = () => { // Função que adiciona o numericFilterObj dentro do array filterByNumericValues, presente no contexto global.
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, numericFilterObj],
    });
    setColumn('Selecione');
  };

  const onDeleteFilterBtnClick = ({ target }) => { // Função responsável pelas ações que ocorrem quando um determinado filtro é excluído.
    const { filterByNumericValues } = filters;

    setFilters({ // Retirando o filtro clicado, do array de filtros.
      ...filters,
      filterByNumericValues: filterByNumericValues
        .filter((obj1) => obj1.column !== target.id),
    });

    setDropdownContent1([ // Voltando com a opção (population, diameter...) para dentro do array "dropdownContent1", utilizado pelo 1° <select/> do <form/> abaixo.
      target.id,
      ...dropdownContent1,
    ]);

    if (filterByNumericValues.length === 1) { // Lógica para quando há apenas 1 filtro a ser excluído.
      setDataToRender(data);
    }

    if (filterByNumericValues.length > 1) { // Lógica para quando há mais de 1 filtro a ser excluído.
      let resultData = [...data];
      const nonDeletedFilters = filterByNumericValues
        .filter((obj2) => obj2.column !== target.id);

      nonDeletedFilters.forEach((obj3) => {
        if (obj3.comparison === 'maior que') {
          resultData = resultData.filter((planet) => planet[obj3.column]
            > Number(obj3.value));
        }
        if (obj3.comparison === 'menor que') {
          resultData = resultData.filter((planet) => planet[obj3.column]
            < Number(obj3.value));
        }
        if (obj3.comparison === 'igual a') {
          resultData = resultData.filter((planet) => Number(planet[obj3.column])
            === Number(obj3.value));
        }
      });
      setDataToRender(resultData);
    }
  };

  return (
    <section id="numericFilterContainer">
      <form id="numericFilterForm">
        <select
          value={ column }
          onChange={ ({ target }) => setColumn(target.value) }
        >
          {dropdownContent1.map((option, index1) => (
            <option key={ index1 }>{option}</option>
          ))}
        </select>
        <select
          value={ comparison }
          onChange={ ({ target }) => setComparison(target.value) }
        >
          {dropdownContent2.map((option, index2) => (
            <option key={ index2 }>{option}</option>
          ))}
        </select>
        <input
          type="number"
          min="0"
          value={ value }
          onChange={ ({ target }) => setValue(target.value) }
        />
        <button
          id="filterBtn"
          type="button"
          onClick={ onFilterBtnClick }
          disabled={ column === 'Selecione' }
        >
          Filtrar
        </button>
      </form>

      {filters.filterByNumericValues && filters.filterByNumericValues
        .map((obj) => (
          <div key={ obj.column } id="eachChosenFilter">
            {`${obj.column} é ${obj.comparison} ${obj.value}`}
            <button
              id={ obj.column }
              type="button"
              onClick={ onDeleteFilterBtnClick }
            >
              X
            </button>
          </div>))}
    </section>
  );
}

export default NumericFilterForm;
