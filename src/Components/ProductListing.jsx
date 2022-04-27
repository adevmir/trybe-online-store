import React from 'react';
import PropTypes from 'prop-types';

class ProductListing extends React.Component {
  render() {
    const {
      title,
      price,
      thumbnail,
    } = this.props;
    return (
      <div data-testid="product">
        {/* Nome do produto - results[n].title */}
        <h2>{title}</h2>
        {/* Foto do produto - results[n].thumbnail */}
        <img src={ thumbnail } alt={ title } />
        {/* Preço do Priduto - results[n].price */}
        <p>{price}</p>
        {/* <p>{`R$ ${price}`}</p> */}
      </div>
    );
  }
}

ProductListing.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default ProductListing;