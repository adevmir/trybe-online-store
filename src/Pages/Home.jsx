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
      category: '',
    });
  }

  getValue({ target }) {
    const { name, value } = target;
    console.log('entrada getValue --', name, value);
    this.setState(() => ({
      [name]: value,
    }),
    // Executa essa arrow function apenas qnd clicado em uma categoria
    () => {
      if (name === 'category') {
        const { searchProduct, category } = this.state;
        this.getProducts(category, searchProduct);
      }
    });
  }

  async getProducts(category, product) {
    const { results } = await getProductsFromCategoryAndQuery(category, product);
    console.log('entrou', results);
    this.setState({
      waitingSearch: false,
      searchResult: results,
    });
  }

  render() {
    const {
      searchProduct,
      waitingSearch,
      searchResult,
      category,
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
            onClick={ () => this.getProducts(category, searchProduct) }
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
        <Categories
          // Função que ira detectar o evento e dispara seus acontecimentos
          handleClick={ this.getValue }
        />
      </>
    );
  }
}

export default Home;
