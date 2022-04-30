import React from 'react';
import PropTypes from 'prop-types';
import LinkShopCart from '../Components/LinkShopCart';
import { getDetails } from '../services/api';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = ({
      details: [],
    });
  }

  // Os detalhes mais especificos do produto então em "attributes"
  // Fotos em varios angulos então em "pictures"
  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    const details = await getDetails(id);
    this.setState({
      details,
    });
  }

  render() {
    const { details } = this.state;
    const { id, title, price, pictures, thumbnail } = details;
    console.log(Array.isArray(pictures));
    console.log(pictures);
    return (
      <main>
        <h2>Página de Detalhes</h2>
        <div id={ id }>
          <h2 data-testid="product-detail-name">{ title }</h2>
          <img src={ thumbnail } alt={ title } />
          <p>{`R$ ${price}`}</p>
        </div>
        <LinkShopCart />
      </main>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductDetails;
