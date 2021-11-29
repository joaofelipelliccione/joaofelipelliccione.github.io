import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import '../styles/header.css';

class Header extends React.Component {
  componentDidUpdate() {
    const {
      userNameProp, userMailProp,
      scoreProp, assertionsProp,
    } = this.props;

    const playerInfo = { player: {
      name: userNameProp,
      assertions: assertionsProp,
      score: scoreProp,
      gravatarEmail: userMailProp,
    } };
    localStorage.setItem('state', JSON.stringify(playerInfo));

    const userMailHash = md5(userMailProp).toString();
    const urlPictureGravatar = `https://www.gravatar.com/avatar/${userMailHash}`;
    localStorage.setItem('urlPictureGravatar', urlPictureGravatar);
  }

  render() {
    const { userNameProp, userMailProp, scoreProp } = this.props;
    const userMailHash = md5(userMailProp).toString(); // Necessário para o funcionamento do Gravatar.
    const GRAVATAR_END_POINT = `https://www.gravatar.com/avatar/${userMailHash}`;

    return (
      <header id="websiteHeader">
        <div id="headerPlayerInfo">
          <img
            src={ GRAVATAR_END_POINT }
            alt="Foto do jogador"
          />
          <span id="headerUserNameOutput">
            { userNameProp }
          </span>
        </div>
        <span id="scoreContainer">
          Placar:
          <output>
            {' '}
            { scoreProp }
          </output>
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  userNameProp: PropTypes.string.isRequired,
  userMailProp: PropTypes.string.isRequired,
  scoreProp: PropTypes.number.isRequired,
  assertionsProp: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  userNameProp: state.user.name,
  userMailProp: state.user.email,
  scoreProp: state.trivia.score,
  assertionsProp: state.trivia.assertions,
});

export default connect(mapStateToProps, null)(Header);
