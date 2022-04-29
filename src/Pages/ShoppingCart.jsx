import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getDetails } from '../services/api';
import ProductListing from '../Components/ProductListing';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = ({
      shoppingList: [],
    });
  }

  componentDidMount() {
    console.log('Entrou no componentDidMount do ShoppingCart');
    const { match: { params: { shopCart } } } = this.props;
    if (shopCart !== 'empty') {
      const arrayIds = shopCart.split(',');
      arrayIds.forEach(async (id) => {
        const infoProduct = await getDetails(id);
        // console.log('InfoProduct', infoProduct);
        this.setState((old) => ({
          shoppingList: [...old.shoppingList, infoProduct],
        }));
      });
    }
  }

  render() {
    const { shoppingList } = this.state;
    return (
      <main>
        {shoppingList.length > 0
          ? (
            shoppingList.map(({ id, title, price, thumbnail }, index) => (
              <ProductListing
                key={ index }
                id={ id }
                title={ title }
                price={ price }
                thumbnail={ thumbnail }
              />
              // <div key={ index }>
              //   <h2 data-testid="shopping-cart-product-name">{ title }</h2>
              //   <img src={ thumbnail } alt={ title } />
              //   <p>{ price }</p>
              // </div>
            ))
          )
          : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
        <Link to="/">
          Continuar comprando
        </Link>
      </main>
    );
  }
}

ShoppingCart.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      shopCart: PropTypes.arrayOf(PropTypes.array),
    }),
  }).isRequired,
};

export default ShoppingCart;
