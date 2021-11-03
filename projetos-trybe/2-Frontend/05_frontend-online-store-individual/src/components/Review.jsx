import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Review.css';

class Review extends React.Component {
  constructor(props) {
    super(props);
    const { productId } = this.props;
    const reviews = JSON.parse(localStorage.getItem(productId));

    if (reviews !== null) { // Definição do estado caso o usuário já tenha realizado um review, para o respectivo produto, anteriormente.
      this.state = {
        name: '',
        comment: '',
        reviewStar: '',
        reviews,
      };
    }

    if (reviews === null) { // Definição do estado caso o usuário nunca tenha realizado um review para o respectivo produto, anteriormente.
      this.state = {
        name: '',
        comment: '',
        reviewStar: '',
        reviews: [],
      };
    }
  }

  handleSubmit = (event) => { // Função que evita que o forms seja POST, quando o usuário apertar o botão 'Avaliar'. É chamada dentro do onSubmit, do #reviewForm.
    event.preventDefault();
  }

  handleChange = ({ target }) => { // Função que altera o estado 'name', 'comment' e/ou 'reviewStar' no momento que o usuário realiza alguma modificação. Será chamada nos onChanges de #reviewForm.
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  sendReview = () => { // Função que altera o estado cuja key é igual à 'reviews' e salva, no local storage, a avaliação do usuário.
    const { comment, reviewStar, name } = this.state;
    const { productId } = this.props;
    const objComment = {
      comment,
      reviewStar,
      name,
    };

    this.setState((prevState) => ({
      reviews: [...prevState.reviews, objComment],
      comment: '',
      name: '',
    }), () => localStorage.setItem(productId, JSON.stringify(this.state.reviews))); // Após a atualização do estado 'reviews', a avaliação do usuário é salva no local storage.
  }

  render() {
    const { name, comment, reviews } = this.state;

    return (
      <div id="reviewFormContainer">
        <form id="reviewForm" onSubmit={ this.handleSubmit }>
          <label id="nameLabel" htmlFor="name">
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Nome"
              value={ name }
              onChange={ this.handleChange }
              required
            />
          </label>
          <div id="reviewStarContainer">
            <label htmlFor="1">
              <span role="img" aria-label="starEmoji">1🌟</span>
              <input
                id="1"
                type="radio"
                name="reviewStar"
                value="1"
                onClick={ this.handleChange }
                required
              />
            </label>
            <label htmlFor="2">
            <span role="img" aria-label="starEmoji">2🌟</span>
              <input
                id="2"
                type="radio"
                name="reviewStar"
                value="2"
                onClick={ this.handleChange }
                required
              />
            </label>
            <label htmlFor="3">
            <span role="img" aria-label="starEmoji">3🌟</span>
              <input
                id="3"
                type="radio"
                name="reviewStar"
                value="3"
                onClick={ this.handleChange }
                required
              />
            </label>
            <label htmlFor="4">
            <span role="img" aria-label="starEmoji">4🌟</span>
              <input
                id="4"
                type="radio"
                name="reviewStar"
                value="4"
                onClick={ this.handleChange }
                required
              />
            </label>
            <label htmlFor="5">
            <span role="img" aria-label="starEmoji">5🌟</span>
              <input
                id="5"
                type="radio"
                name="reviewStar"
                value="5"
                onClick={ this.handleChange }
                required
              />
            </label>
          </div>

          <textarea
            data-testid="product-detail-evaluation"
            rows="5"
            placeholder="Mensagem de Avaliação (opcional)"
            onChange={ this.handleChange }
            name="comment"
            value={ comment }
          />
          <br />

          <button type="submit" onClick={ this.sendReview }>Avaliar</button>
        </form>
        {reviews.length > 0
        && reviews.map((review) => (
          <div id="commentContainer" key={ review.comment }>
            <h2>{ review.name }</h2>
            <h3>{ `${review.reviewStar} 🌟` }</h3>
            <p>{ review.comment }</p>
          </div>
        ))}
      </div>
    );
  }
}

Review.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default Review;
