import React from 'react';
import { Link } from 'react-router-dom';

class ShoppingCart extends React.Component {
  render() {
    return (
      <main>
        <h2>Página do Carrinho de Compras</h2>
        <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h3>
        <Link to="/">
          Continuar comprando
        </Link>
      </main>
    );
  }
}

export default ShoppingCart;
