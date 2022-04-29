import React from 'react';
import { Link } from 'react-router-dom';

class LinkShopCart extends React.Component {
  render() {
    return (
      <Link
        to="/shopping-cart"
        data-testid="shopping-cart-button"
      >
        <button type="button">
          Carrinho
        </button>
      </Link>
    );
  }
}

export default LinkShopCart;
