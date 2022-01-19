import React from 'react';
import { useHistory } from 'react-router-dom'; // REF: https://felixgerschau.com/usehistory-react-hooks/
import { useDispatch } from 'react-redux'; // REF: https://medium.com/geekculture/redux-with-reacts-functional-components-272f1008ee69
import setLoginInfoAC from '../redux/actions/userAC';

function LoginForm() {
  const [userMail, setUserMail] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const minNumOfCaracs = 6;

  const mailValidator = (email) => { // REF: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const validateMailRegex = /\S+@\S+\.\S+/;
    return validateMailRegex.test(email);
  };

  const signIn = () => {
    const isMailValid = mailValidator(userMail); // Atribui 'True' se o e-mail estiver dentro dos padrões definidos na mailValidator(). Atribui 'False', caso não esteja;
    const isPasswordValid = (userPassword.length >= minNumOfCaracs); // Atribui 'True' se a senha possuir 6 caracteres ou mais. Atribui 'False', caso não possua;
    const userMailLS = { email: userMail };

    const favoriteRecipesLS = localStorage.getItem('favoriteRecipes');
    const doneRecipesLS = localStorage.getItem('doneRecipes');
    const inProgressRecipesLS = localStorage.getItem('inProgressRecipes');
    const inProgressRecipesCheckedLS = localStorage.getItem('inProgressRecipesChecked');

    if (isMailValid && isPasswordValid) {
      dispatch(setLoginInfoAC(userMail, userPassword)); // O e-mail e a senha do usuário será enviado para o estado global da aplicação (Store).
      localStorage.setItem('mealsToken', 1);
      localStorage.setItem('cocktailsToken', 1);
      localStorage.setItem('user', JSON.stringify(userMailLS));

      if (favoriteRecipesLS === null) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      }
      if (doneRecipesLS === null) {
        localStorage.setItem('doneRecipes', JSON.stringify([]));
      }
      if (inProgressRecipesLS === null) {
        localStorage.setItem('inProgressRecipes', JSON
          .stringify({ cocktails: {}, meals: {} }));
      }
      if (inProgressRecipesCheckedLS === null) {
        localStorage.setItem('inProgressRecipesChecked', JSON
          .stringify({ cocktails: {}, meals: {} }));
      }
      history.push('/comidas');
    }
  };

  return (
    <form id="loginForm">
      <label htmlFor="userMailInput">
        <input
          data-testid="email-input"
          id="userMailInput"
          type="email"
          name="userMail"
          value={ userMail }
          onChange={ ({ target }) => setUserMail(target.value) }
          placeholder="e-mail"
        />
      </label>
      <label htmlFor="userPassword">
        <input
          data-testid="password-input"
          id="userPassword"
          type="password"
          name="userPassword"
          value={ userPassword }
          onChange={ ({ target }) => setUserPassword(target.value) }
          placeholder="senha"
        />
      </label>
      <button
        data-testid="login-submit-btn"
        id="loginBtn"
        type="button"
        disabled={ !(mailValidator(userMail) && (userPassword.length > minNumOfCaracs)) }
        onClick={ signIn }
      >
        Entrar
      </button>
    </form>
  );
}

export default LoginForm;
