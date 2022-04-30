import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductListing extends React.Component {
  render() {
    const {
      title,
      price,
      thumbnail,
      id,
    } = this.props;
    return (
      <Link
        to={ `/product-details/${id}` }
        data-testid="product-detail-link"
      >
        <div
          id={ id }
          data-testid="product"
        >
          {/* Nome do froduto */}
          <h2>{ title }</h2>

          {/* Foto do produto */}
          <img src={ thumbnail } alt={ `Imagem de ${title}.` } />

          {/* Preço do produto */}
          <p>{`R$ ${price}`}</p>
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
