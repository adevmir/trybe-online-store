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
    const { fatherList } = this.props;
    if (fatherList.length > 0) {
      fatherList.forEach(async (id) => {
        const infoProduct = await getDetails(id);
        this.setState((old) => ({
          shoppingList: [...old.shoppingList, infoProduct],
        }));
      });
    }
  }

  render() {
    const { shoppingList } = this.state;
    const { fatherList, quantityCart } = this.props;
    console.log('ShoppingPage, recebeu isso do pai', Array.isArray(fatherList));

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
            ))
          )
          : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
        <span data-testid="shopping-cart-product-quantity">{quantityCart}</span>
        <Link to="/">
          Continuar comprando
        </Link>
      </main>
    );
  }
}

ShoppingCart.propTypes = {
  fatherList: PropTypes.arrayOf(PropTypes.string).isRequired,
  quantityCart: PropTypes.number.isRequired,
};

export default ShoppingCart;
