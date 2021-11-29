import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import reviewsImg from '../images/feedback-reviews.svg';
import oldGameImg from '../images/feedback-game.svg';
import FeedbackBtns from './FeedbackBtns';
import '../styles/feedback.css';

class Feedback extends React.Component {
  render() {
    const { assertionsProp, scoreProp } = this.props;
    const numberThree = 3;

    return (
      <main id="feedbackPage">
        <div id="feedbackCard">
          <div id="feedbackMsg">
            {assertionsProp < numberThree
              ? <h2>Poderia ter ido melhor...</h2>
              : <h2>Mandou bem!</h2>}
            <p>
              Você acertou
              <output>
                {' '}
                {Number(assertionsProp)}
              </output>
              {' '}
              questão(ões).
            </p>
            <p>
              Um total de
              <output>
                {' '}
                {Number(scoreProp)}
              </output>
              {' '}
              pontos.
            </p>
          </div>
          <FeedbackBtns />
        </div>
        <div id="feedbackImgsContainer">
          <img src={reviewsImg} alt="Feedback" width="500px"/>
          <img src={oldGameImg} alt="Console Antigo" width="400px"/>
        </div>
      </main>
    );
  }
}

Feedback.propTypes = {
  assertionsProp: PropTypes.number.isRequired,
  scoreProp: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertionsProp: state.trivia.assertions,
  scoreProp: state.trivia.score,
});

export default connect(mapStateToProps, null)(Feedback);
