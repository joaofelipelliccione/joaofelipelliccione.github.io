import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/feedbackBtns.css';

class FeedbackBtns extends React.Component {
  constructor() {
    super();

    this.setLastGameInfoToLS = this.setLastGameInfoToLS.bind(this);
  }

  setLastGameInfoToLS() {
    const { userNameProp, scoreProp } = this.props;
    const userPicture = localStorage.getItem('urlPictureGravatar');
    const rankingArray = JSON.parse(localStorage.getItem('ranking'));

    const lastGameInfo = {
      name: userNameProp,
      score: scoreProp,
      picture: userPicture,
    };

    if (rankingArray === null) {
      const updateRankingArray = [lastGameInfo];
      localStorage.setItem('ranking', JSON.stringify(updateRankingArray));
    }
    if (rankingArray !== null) {
      const updateRankingArray = [...rankingArray, lastGameInfo];
      localStorage.setItem('ranking', JSON.stringify(updateRankingArray));
    }
  }

  render() {
    return (
      <div id="feedbackBtnsContainer">
        <Link
          to="/ranking"
        >
          <button
            type="button"
            onClick={ this.setLastGameInfoToLS }
          >
            Ver Ranking
          </button>
        </Link>
        <Link
          to="/"
        >
          <button
            type="button"
          >
            Jogar Novamente
          </button>
        </Link>
      </div>
    );
  }
}

FeedbackBtns.propTypes = {
  userNameProp: PropTypes.string.isRequired,
  scoreProp: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  userNameProp: state.user.name,
  scoreProp: state.trivia.score,
});

export default connect(mapStateToProps, null)(FeedbackBtns);
