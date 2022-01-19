import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const [userMailObjLs, setUserMailObjLs] = React.useState('');
  const history = useHistory();

  React.useEffect(() => {
    setUserMailObjLs(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <div>
      <Header />
      <h3 data-testid="profile-email">{userMailObjLs !== null && userMailObjLs.email}</h3>
      <section id="profilePageBtnsContainer">
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          Sair
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default Profile;
