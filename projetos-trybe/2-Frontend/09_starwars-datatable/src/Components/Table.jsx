import React from 'react';
import Context from '../Context/Context';
import '../Styles/Table.css';

function Table() {
  const { dataToRender, isLoading } = React.useContext(Context); // Captando as keys necessárias, diretamente do contexto global.
  const thContent = ['Name', 'Rotation Period', 'Orbital Period',
    'Diameter', 'Climate', 'Gravity',
    'Terrain', 'Surface Water', 'Population',
    'Films', 'Created', 'Edited', 'URL'];

  return (
    isLoading
      ? (
        <span id="loadingSpan">Carregando Informações...</span>
      )
      : (
        <div id="SWPlanetsTableContainer">
          <table id="SWPlanetsTable">
            <thead>
              <tr>
                { thContent.map((title, index) => (
                  <th scope="col" key={ index }>{ title }</th>
                )) }
              </tr>
            </thead>
            <tbody>
              { dataToRender.map((planet, index) => (
                <tr key={ index }>
                  <td>{ planet.name }</td>
                  <td>{ planet.rotation_period }</td>
                  <td>{ planet.orbital_period }</td>
                  <td>{ planet.diameter }</td>
                  <td>{ planet.climate }</td>
                  <td>{ planet.gravity }</td>
                  <td>{ planet.terrain }</td>
                  <td>{ planet.surface_water }</td>
                  <td>{ planet.population }</td>
                  <td>
                    { planet.films.map((eachFilm, index2) => (
                      <ul key={ index2 } className="filmsContainer">
                        <li>{eachFilm}</li>
                      </ul>
                    )) }
                  </td>
                  <td>{ planet.created }</td>
                  <td>{ planet.edited }</td>
                  <td>{ planet.url }</td>
                </tr>
              )) }
            </tbody>
          </table>
        </div>)
  );
}

export default Table;
