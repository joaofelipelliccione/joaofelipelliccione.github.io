import React from 'react';
import { string } from 'prop-types';

class Review extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      reviewStar: '',
      name: '',
      reviews: [],
    };
  }

  componentDidMount() {
    this.setReview();
  }

  componentDidUpdate() {
    const { id } = this.props;
    const { reviews } = this.state;
    localStorage.setItem(id, JSON.stringify(reviews));
  }

  setReview = () => {
    const { id } = this.props;
    const reviews = JSON.parse(localStorage.getItem(id));
    if (Array.isArray(reviews)) {
      this.setState({ reviews });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  sendReview = () => {
    const { comment, reviewStar, name } = this.state;
    const objComment = {
      comment,
      reviewStar,
      name,
    };
    this.setState((prevState) => ({
      reviews: [...prevState.reviews, objComment],
      comment: '',
      name: '',
    }));
  }

  render() {
    const { comment, name, reviews } = this.state;
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={ name }
              onChange={ this.handleChange }
              id="name"
            />
          </label>
          <label htmlFor="1">
            1
            <input
              type="radio"
              name="reviewStar"
              required
              value="1"
              onClick={ this.handleChange }
              id="1"
            />
          </label>
          <label htmlFor="2">
            2
            <input
              type="radio"
              name="reviewStar"
              required
              value="2"
              onClick={ this.handleChange }
              id="2"
            />
          </label>
          <label htmlFor="3">
            3
            <input
              type="radio"
              name="reviewStar"
              required
              value="3"
              onClick={ this.handleChange }
              id="3"
            />
          </label>
          <label htmlFor="4">
            4
            <input
              type="radio"
              name="reviewStar"
              required
              value="4"
              onClick={ this.handleChange }
              id="4"
            />
          </label>
          <label htmlFor="5">
            5
            <input
              type="radio"
              name="reviewStar"
              required
              value="5"
              onClick={ this.handleChange }
              id="5"
            />
          </label>
          <textarea
            data-testid="product-detail-evaluation"
            rows="20"
            collumns="40"
            placeholder="Mensagem (opcional)"
            onChange={ this.handleChange }
            name="comment"
            value={ comment }
          />
          <button type="submit" onClick={ this.sendReview }>Avaliar</button>
        </form>
        {reviews.length > 0
        && reviews.map((review) => (
          <div key={ review.comment }>
            <h2>{ review.name }</h2>
            <h3>{ `Nota: ${review.reviewStar}` }</h3>
            <p>{ review.comment }</p>
          </div>
        ))}
      </div>
    );
  }
}

Review.propTypes = {
  id: string.isRequired,
};

export default Review;
