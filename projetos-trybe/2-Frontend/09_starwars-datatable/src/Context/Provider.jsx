import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const FILTERS_INITIAL_STATE = { // Estado inicial da key "filters", para que o avaliador funcione.
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  };

  const [data, setData] = React.useState([]);
  const [dataToRender, setDataToRender] = React.useState([]); // Quando os filtros forem aplicados, é essa 'key' que será alterada e não a key 'data'.
  const [isLoading, setIsLoading] = React.useState(false);
  const [filters, setFilters] = React.useState(FILTERS_INITIAL_STATE);
  const [dropdownContent1, setDropdownContent1] = React.useState(['Selecione',
    'population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water']); // Dados utilizados no <select/> do componente <NumericFilterForm />.

  // REQUISIÇÃO API:
  const fetchSWPlanets = async () => { // Estruturando função que fará o fetch() para a url da API de Star Wars.
    setIsLoading(true);
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const { results } = await response.json(); // Captando a chave "results" do JSON retornado pela API.
    setData(results);
    setDataToRender(results);
    setIsLoading(false);
  };

  React.useEffect(() => { fetchSWPlanets(); }, []); // 2° parâmetro = [] --> useEffect() utilizada como componentDidMount().

  // PESQUISA POR NOME DE UM PLANETA EM <SearchBoxFilter />:
  const onFilterByNameUpdate = () => {
    const { filterByName: { name } } = filters;
    setDataToRender(data.filter((planet) => planet.name.toLowerCase()
      .includes(name.toLowerCase())));

    setFilters({ // Quando um nome for pesquisado, os filtros numéricos serão limpos. A lógica é OU pesquisar por nome OU pesquisar por número.
      ...filters,
      filterByNumericValues: [],
    });

    setDropdownContent1([ // Tendo em vista que os filtros numéricos serão limpos, o array "dropdownContent1" deve ser "reiniciado".
      'Selecione', 'population', 'orbital_period', 'diameter',
      'rotation_period', 'surface_water']);
  };

  React.useEffect(onFilterByNameUpdate, [filters.filterByName.name]); // 2° parâmetro = [variável] --> useEffect() utilizada como componentDidUpdate(). Sempre quando a key 'filters.filterByName.name' do Estado for alterada (isso é, quando o usuário pesquisa o nome de um planeta), esse useEffect() será chamado.

  // UTILIZAÇÃO DOS FILTROS PRESENTES EM <NumericFilterForm />:
  const onNumericFilterUpdate = () => {
    const { filterByNumericValues } = filters;
    const i = filterByNumericValues.length - 1; // Captando o índice do objeto [filtro] que foi adicionado mais recentemente no array filterByNumericValues, oriundo do context.

    if (filterByNumericValues.length > 0
      && filterByNumericValues[i].comparison === 'maior que') {
      setDataToRender(
        dataToRender.filter((planet) => planet[filterByNumericValues[i].column]
        > Number(filterByNumericValues[i].value)),
      );
    }
    if (filterByNumericValues.length > 0
      && filterByNumericValues[i].comparison === 'menor que') {
      setDataToRender(
        dataToRender.filter((planet) => planet[filterByNumericValues[i].column]
        < Number(filterByNumericValues[i].value)),
      );
    }
    if (filterByNumericValues.length > 0
      && filterByNumericValues[i].comparison === 'igual a') {
      setDataToRender(
        dataToRender.filter((planet) => Number(planet[filterByNumericValues[i].column])
        === Number(filterByNumericValues[i].value)),
      );
    }

    if (filterByNumericValues.length > 0) { // REQ 4: Retirando a opção do dropdownContent1, quando essa já estiver sido escolhida em algum filtro.
      setDropdownContent1(dropdownContent1.filter((option) => option
        !== filterByNumericValues[i].column));
    }
  };

  React.useEffect(onNumericFilterUpdate, [filters.filterByNumericValues]); // 2° parâmetro = [variável] --> useEffect() utilizada como componentDidUpdate(). Sempre quando a key 'filters.filterByNumericValues' do Estado for alterada (isso é, quando o usuário utilizar os filtros numéricos), esse useEffect() será chamado.

  const contextObj = {
    data,
    dataToRender,
    setDataToRender,
    isLoading,
    dropdownContent1,
    setDropdownContent1,
    filters,
    setFilters,
  };

  return (
    <Context.Provider value={ contextObj }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired, // A prop "children" será um nó (node) filho do provider.
};

export default Provider;
