import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProductListing extends React.Component {
  render() {
    const {
      title,
      price,
      thumbnail,
      id,
    } = this.props;
    return (
      <Link data-testid="product-detail-link" to={ `/product-details/${id}` }>
        <div data-testid="product">
          {/* Nome do produto - results[n].title */}
          <h2 data-testid="shopping-cart-product-name">{title}</h2>
          {/* Foto do produto - results[n].thumbnail */}
          <img src={ thumbnail } alt={ title } />
          {/* Preço do Priduto - results[n].price */}
          <p>{price}</p>
          {/* <p>{`R$ ${price}`}</p> */}
        </div>
      </Link>

    );
  }
}

ProductListing.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ProductListing;
