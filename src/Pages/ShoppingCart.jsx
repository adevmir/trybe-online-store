import React from 'react';
import { Link } from 'react-router-dom';

class ShoppingCart extends React.Component {
  render() {
    return (
      <main>
        <Link to="/">
          Continuar comprando
        </Link>
        <p data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </p>
      </main>
    );
  }
}

export default ShoppingCart;
