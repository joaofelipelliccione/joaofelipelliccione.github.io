import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import traditionalBorder, { greenBorder, redBorder } from './borderColors';
import correctAnsInfoAC from '../redux/action';
import NextQuestBtn from './NextQuestBtn';
import '../styles/questionsAndAnswers.css';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionsArrIndex: 0,
      mustChangeBorderCol: false,
      timerMax: 30,
      hasAnswered: false,
    };

    this.changeColors = this.changeColors.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.onAnswerClick = this.onAnswerClick.bind(this);
    this.onNextQuestClick = this.onNextQuestClick.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(_prevProps, { timerMax }) { // timerMax = prevState.timerMax
    const TIMER_MIN = 1;

    if (timerMax === TIMER_MIN) {
      clearInterval(this.timerInterval);
      this.changeColors();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  onAnswerClick({ target }) {
    const { questionsArray, correctAnsInfoProp } = this.props;
    const { questionsArrIndex, timerMax } = this.state;
    const numberThree = 3;
    const numberTen = 10;

    const questLevel = questionsArray[questionsArrIndex].difficulty;
    let questLevelNum = 1; // Easy questions = 1 point.

    if (questLevel === 'hard') {
      questLevelNum = numberThree;
    }
    if (questLevel === 'medium') {
      questLevelNum = 2;
    }

    if (target.className === 'correctAnswer') {
      const roundResult = Number(numberTen + timerMax * questLevelNum);
      correctAnsInfoProp(roundResult);
    }

    this.setState({ hasAnswered: true });
    this.changeColors();
  }

  onNextQuestClick() {
    const { questionsArrIndex, timerMax } = this.state;
    const { renderFeedback } = this.props;
    const numberFour = 4;
    const TIMER_MIN = 1;

    if (questionsArrIndex < numberFour) {
      this.setState((prevState) => ({
        questionsArrIndex: prevState.questionsArrIndex + 1,
        mustChangeBorderCol: false,
        timerMax: 30,
        hasAnswered: false,
      }));
    }
    if (questionsArrIndex < numberFour && timerMax <= TIMER_MIN) {
      this.setState((prevState) => ({
        questionsArrIndex: prevState.questionsArrIndex + 1,
        mustChangeBorderCol: false,
        timerMax: 30,
        hasAnswered: false,
      }));
      this.startTimer();
    }
    if (questionsArrIndex >= numberFour) {
      renderFeedback();
    }
  }

  startTimer() {
    const ONE_SECOND = 1000;

    this.timerInterval = setInterval(() => {
      this.setState(({ timerMax }) => ({ timerMax: timerMax - 1 })); // timerMax = prevState.timerMax
    }, ONE_SECOND);
  }

  changeColors() {
    this.setState({ mustChangeBorderCol: true });
  }

  render() {
    const { questionsArray } = this.props;
    const { questionsArrIndex, mustChangeBorderCol, timerMax, hasAnswered } = this.state;

    return (
      <main id="cardContainer1">
        { questionsArray.map((questionObj) => (
          <div id="cardContainer2" key={ questionsArrIndex }>
            <div id="questionCard">
              <h3>{questionObj.category}</h3>
              <p>{questionObj.question}</p>
            </div>
            <div id="answerBtnsContainer">
              {[questionObj.correct_answer, ...questionObj.incorrect_answers]
                .sort().map((alternative, index) => (
                  <div id="answerCard" key={ index }>
                    {alternative === questionObj.correct_answer
                      ? (
                        <button
                          className="correctAnswer"
                          type="button"
                          onClick={ this.onAnswerClick }
                          style={ mustChangeBorderCol ? greenBorder : traditionalBorder }
                          disabled={ timerMax <= 0 || hasAnswered }
                        >
                          {alternative}
                        </button>
                      )
                      : (
                        <button
                          className="incorrectAnswer"
                          type="button"
                          onClick={ this.onAnswerClick }
                          style={ mustChangeBorderCol ? redBorder : traditionalBorder }
                          disabled={ timerMax <= 0 || hasAnswered }
                        >
                          {alternative}
                        </button>
                      )}
                  </div>
                ))}
            </div>
          </div>
        ))[questionsArrIndex] }
        <h4>{ timerMax }</h4>
        { (timerMax <= 0 || hasAnswered)
          && <NextQuestBtn onNextQuestClick={ this.onNextQuestClick } /> }
      </main>
    );
  }
}

QuestionsAndAnswers.propTypes = {
  questionsArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  correctAnsInfoProp: PropTypes.func.isRequired,
  renderFeedback: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  correctAnsInfoProp: (score) => dispatch(correctAnsInfoAC(score)),
});

export default connect(null, mapDispatchToProps)(QuestionsAndAnswers);
