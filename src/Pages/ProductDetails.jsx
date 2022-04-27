import React from 'react';
import PropTypes from 'prop-types';
/* import { Link } from 'react-router-dom'; */
import { getDetails } from '../services/api';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      details: '',
    };
  }

  // ao carregar a pagina pega o id das props e passa como parametro da função getDetails
  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    const details = await getDetails(id);
    this.setState({
      details: details.title,
    });
  }

  // função que realiza requisição ao clicar no produto e retorna os detalhes do produto

  render() { // renderiza na tela os detalhes tecnicos do produto, de inicio pegamos apenas o titulo
    const { details } = this.state;
    return (
      <div data-testid="product-detail-name">
        { details }
      </div>

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
