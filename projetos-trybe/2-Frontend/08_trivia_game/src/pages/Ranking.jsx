import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ranking.css';

class Ranking extends React.Component {
  constructor() {
    super();

    this.state = {
      sortedRankingArray: [],
    };

    this.setRankingArray = this.setRankingArray.bind(this);
  }

  componentDidMount() {
    this.setRankingArray();
  }

  setRankingArray() {
    const rankingArray = JSON.parse(localStorage.getItem('ranking'));
    const sortedRankingArray = rankingArray
      .sort((playerA, playerB) => playerB.score - playerA.score);
    this.setState({ sortedRankingArray });
  }

  render() {
    const { sortedRankingArray } = this.state;

    return (
      <div id="rankingPage">
        <h1>Ranking dos Melhores Jogadores</h1>
        <div id="rankingContainer">
          {sortedRankingArray.map((microObj, index) => (
            <div id="eachRankingPosition" key={ index }>
              <img src={ microObj.picture } alt="Foto do jogador" />
              <span>
                {microObj.name}
              </span>
              <output>
                {Number(microObj.score)}
              </output>
            </div>
          ))}
        </div>
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

export default Ranking;
