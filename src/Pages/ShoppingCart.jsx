import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductListing from '../Components/ProductListing';

class ShoppingCart extends React.Component {
  render() {
    // const { shoppingList, totalItems } = this.state;
    const { addItemCart, removeItemCart, listItems, totalItems } = this.props;
    console.log(listItems);
    console.log(Array.isArray(listItems));
    return (
      <main>
        <h2>Página do Carrinho de Compras</h2>
        {listItems.length > 0
          ? (
            <div>
              {
                listItems.map(({ id, title, price, thumbnail, quantity }) => (
                  <div key={ id }>
                    <ProductListing
                      id={ id }
                      title={ title }
                      price={ price }
                      thumbnail={ thumbnail }
                    />
                    <div>
                      {/* Botão para reminuir em um */}
                      <button
                        type="button"
                        onClick={ () => removeItemCart(id) }
                        data-testid="product-decrease-quantity"
                      >
                        -
                      </button>

                      {/* Exibi quantos tem no carrinho */}
                      <span>{quantity}</span>
                      {/*
                        As funções funcionam, mas a pagina não carrega os dados novos
                      */}

                      {/* Botão para acrecentar mais um */}
                      <button
                        type="button"
                        onClick={ () => addItemCart(id) }
                        data-testid="product-increase-quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              }
              <p
                data-testid="shopping-cart-product-quantity"
              >
                { `Você possui ${totalItems} item(ns) no carrinho.` }
              </p>
            </div>
          )
          : (<h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h3>)}
        <Link to="/">
          Continuar comprando
        </Link>
      </main>
    );
  }
}

ShoppingCart.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  addItemCart: PropTypes.func.isRequired,
  removeItemCart: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
};

export default ShoppingCart;
