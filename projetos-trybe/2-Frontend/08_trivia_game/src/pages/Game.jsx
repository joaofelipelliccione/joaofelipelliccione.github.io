import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTriviaQuestions as fetchTriviaQuestAC } from '../redux/action';
import Header from '../components/Header';
import QuestionsAndAnswers from '../components/QuestionsAndAnswers';
import Feedback from '../components/Feedback';
import '../styles/game.css';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      mustRenderQandA: true,
      mustRenderFeedback: false,
    };

    this.renderFeedback = this.renderFeedback.bind(this);
  }

  async componentDidMount() {
    const { tokenProp, fetchTriviaQuestionsProp } = this.props;

    localStorage.setItem('token', tokenProp);
    await fetchTriviaQuestionsProp(tokenProp);
  }

  renderFeedback() {
    this.setState({
      mustRenderQandA: false,
      mustRenderFeedback: true,
    });
  }

  render() {
    const { mustRenderQandA, mustRenderFeedback } = this.state;
    const { questionsArrayProp } = this.props;

    return (
      <div id="gamePage">
        <Header />
        {mustRenderQandA
          && <QuestionsAndAnswers
            questionsArray={ questionsArrayProp }
            renderFeedback={ this.renderFeedback }
          />}
        {mustRenderFeedback && <Feedback />}
      </div>
    );
  }
}

Game.propTypes = {
  tokenProp: PropTypes.string.isRequired,
  fetchTriviaQuestionsProp: PropTypes.func.isRequired,
  questionsArrayProp: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  tokenProp: state.trivia.token,
  questionsArrayProp: state.trivia.questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTriviaQuestionsProp: (token) => dispatch(fetchTriviaQuestAC(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
