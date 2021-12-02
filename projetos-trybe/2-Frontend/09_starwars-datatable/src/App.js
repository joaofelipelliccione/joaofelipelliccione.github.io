import React from 'react';
import Provider from './Context/Provider';
import Header from './Components/Header';
import Table from './Components/Table';
import NumericFilterForm from './Components/NumericFilterForm';
import Footer from './Components/Footer';
import './App.css';

function App() {
  return (
    <Provider>
      <Header />
      <NumericFilterForm />
      <Table />
      <Footer />
    </Provider>
  );
}

export default App;
