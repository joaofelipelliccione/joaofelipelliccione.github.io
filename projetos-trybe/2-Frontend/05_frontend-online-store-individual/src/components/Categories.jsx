import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';
import '../styles/Categories.css';

class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categoriesList: [],
    };
  }

  componentDidMount() {
    this.getCategoriesName();
  }

  getCategoriesName = async () => { // Função que realiza a requisição para a getCategories(), para captar todas as categorias atualmente oferecidas pelo MELI. Será chamada na montagem da página.
    const data = await getCategories();

    this.setState({ categoriesList: data });
  }

  render() {
    const { categoriesList } = this.state;
    const { categoryChecked } = this.props;

    return (
      <div id="categoriesContainer2">
        {categoriesList.map((microObj) => (
          <div id="eachCategory" key={ microObj.id }>
            <label data-testid="category" htmlFor={ microObj.id }>
              { microObj.name }
              <input
                id={ microObj.id }
                name="category"
                type="radio"
                onChange={ categoryChecked }
              />
            </label>
          </div>
        ))}
      </div>
    );
  }
}

Categories.propTypes = {
  categoryChecked: PropTypes.func.isRequired,
};

export default Categories;
