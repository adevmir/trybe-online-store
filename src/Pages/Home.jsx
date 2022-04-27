import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Categories from '../Components/Categories';
import ProductListing from '../Components/ProductListing';

class Home extends React.Component {
  constructor() {
    super();
    this.getValue = this.getValue.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.state = ({
      waitingSearch: true,
      searchProduct: '',
      searchResult: [],
    });
  }

  getValue({ target }) {
    const { name, value } = target;
    console.log('entrada input', name, value);
    this.setState({
      [name]: value,
    });
  }

  async getProducts(category, product) {
    const { results } = await getProductsFromCategoryAndQuery(category, product);
    console.log('entrou', results);
    this.setState({
      waitingSearch: false,
      searchResult: results,
    });
    // this.setState(() => ({
    //   waitingSearch: false,
    //   searchResult: results,
    // }));
  }

  render() {
    const {
      searchProduct,
      waitingSearch,
      searchResult,
    } = this.state;

    return (
      <>
        <main>
          <input
            type="text"
            name="searchProduct"
            id="searchProduct"
            value={ searchProduct }
            onChange={ this.getValue }
            data-testid="query-input"
          />
          <button
            type="button"
            onClick={ () => this.getProducts('', searchProduct) }
            data-testid="query-button"
          >
            Buscar
          </button>
          <Link data-testid="shopping-cart-button" to="/shopping-cart">
            Carrinho
          </Link>
          {waitingSearch && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )}
          {searchResult.length > 0
            ? (
              searchResult.map(({ id, title, price, thumbnail }) => (
                <ProductListing
                  key={ id }
                  id={ id }
                  title={ title }
                  price={ price }
                  thumbnail={ thumbnail }
                />
              ))
            )
            : <p>Nenhum produto foi encontrado</p>}
        </main>
        <Categories />
      </>
    );
  }
}

export default Home;
