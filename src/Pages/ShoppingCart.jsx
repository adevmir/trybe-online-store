import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductListing from '../Components/ProductListing';
import { getDetails } from '../services/api';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = ({
      shoppingList: [],
      totalItems: 0,
    });
  }

  componentDidMount() {
    let totalItems = 0;
    const { listItems } = this.props;
    if (listItems.length > 0) {
      listItems.forEach(async ({ id, quantity }) => {
        const infoProduct = await getDetails(id);
        totalItems += quantity;
        // Adiciona a quantidade de itens que o usuario adicionou a o obj com informações
        infoProduct.quantity = quantity;
        this.setState((old) => ({
          shoppingList: [...old.shoppingList, infoProduct],
          totalItems,
        }));
      });
    }
  }

  render() {
    const { shoppingList, totalItems } = this.state;
    return (
      <main>
        <h2>Página do Carrinho de Compras</h2>
        {shoppingList.length > 0
          ? (
            <div>
              {
                shoppingList.map(({ id, title, price, thumbnail }) => (
                  <ProductListing
                    key={ id }
                    id={ id }
                    title={ title }
                    price={ price }
                    thumbnail={ thumbnail }
                  />
                ))
              }
              <p
                data-testid="shopping-cart-product-quantity"
              >
                { `Você possui ${totalItems} item(s) no carrinho.` }
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
};

export default ShoppingCart;
