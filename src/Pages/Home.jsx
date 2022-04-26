import React from 'react';
import { Link } from 'react-router-dom';
import Categories from '../Components/Categories';

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
        <Categories />
      </main>
    );
  }
}

export default Home;
