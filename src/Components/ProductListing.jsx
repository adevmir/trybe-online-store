import React from 'react';
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
