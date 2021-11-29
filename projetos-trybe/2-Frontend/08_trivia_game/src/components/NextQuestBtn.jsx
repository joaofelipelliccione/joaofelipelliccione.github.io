import React from 'react';
import PropTypes from 'prop-types';
import '../styles/nextQuestBtn.css';

class NextQuestBtn extends React.Component {
  render() {
    const { onNextQuestClick } = this.props;

    return (
      <button
        id="nextQuestBtn"
        type="button"
        onClick={ onNextQuestClick }
      >
        Próxima
      </button>
    );
  }
}

NextQuestBtn.propTypes = {
  onNextQuestClick: PropTypes.func.isRequired,
};

export default NextQuestBtn;
