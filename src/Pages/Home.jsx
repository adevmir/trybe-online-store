import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <main>
        <Link data-testid="shopping-cart-button" to="/shopping-cart">
          Carrinho
        </Link>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </main>
    );
  }
}

export default Home;
