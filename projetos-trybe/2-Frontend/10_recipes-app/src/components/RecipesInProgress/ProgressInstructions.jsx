import React from 'react';
import PropTypes from 'prop-types';

export default function ProgressInstructions({ recipeInfo }) {
  return (
    <div>
      <h2>Instruções</h2>
      <p data-testid="instructions">{ recipeInfo.strInstructions }</p>
    </div>
  );
}

ProgressInstructions.propTypes = {
  recipeInfo: PropTypes.objectOf(PropTypes.string).isRequired,
};
