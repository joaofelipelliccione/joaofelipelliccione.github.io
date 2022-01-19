import React from 'react';
import PropTypes from 'prop-types';

function FDDetailsInstructions({ recipeInfo }) {
  return (
    <div>
      <h3>Instructions</h3>
      <p data-testid="instructions">{recipeInfo.strInstructions}</p>
    </div>
  );
}

FDDetailsInstructions.propTypes = {
  recipeInfo: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FDDetailsInstructions;
