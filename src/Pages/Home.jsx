import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Categories from '../Components/Categories';
import ProductListing from '../Components/ProductListing';

class Home extends React.Component {
  constructor() {
    super();
    this.getValue = this.getValue.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.shopClick = this.shopClick.bind(this);
    this.cartItemsCounter = this.cartItemsCounter.bind(this);
    this.state = ({
      waitingSearch: true,
      searchProduct: '',
      searchResult: [],
      category: '',
      shopCart: ['empty'],
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

  // Consta quantos itens tem no carrinho de compras
  cartItemsCounter() {
    const { updateState } = this.props;
    const { shopCart } = this.state;
    if (shopCart[0] !== 'empty') {
      updateState(shopCart);
    }
  }

  // Adiciona itens carrinho
  shopClick(idProduct) {
    const { updateState } = this.props;
    updateState(idProduct);
    const { shopCart } = this.state;
    console.log('Entrou no shopClick');
    if (shopCart[0] === 'empty') {
      this.setState(() => ({
        shopCart: [],
      }),
      this.setState((old) => ({
        shopCart: [...old.shopCart, idProduct],
      }),
      this.cartItemsCounter));
    }
    this.setState((old) => ({
      shopCart: [...old.shopCart, idProduct],
    }),
    this.cartItemsCounter);
  }

  render() {
    const {
      searchProduct,
      waitingSearch,
      searchResult,
      category,
      // shopCart,
    } = this.state;
    const { quantityCart } = this.props;

    return (
      <>
        <main>
          <div>{ quantityCart }</div>
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
          <Link
            data-testid="shopping-cart-button"
            to="/shopping-cart"
          >
            Carrinho
            {/* Quantidade de itens no carrinho */}
            <span>{ quantityCart }</span>
          </Link>
          {waitingSearch && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )}
          {searchResult.length > 0
            ? (
              searchResult.map(({ id, title, price, thumbnail }) => (
                <div key={ id }>
                  {/* Renderiza os produtos na tela */}
                  <ProductListing
                    id={ id }
                    title={ title }
                    price={ price }
                    thumbnail={ thumbnail }
                  />
                  {/* Botão que permite adicionar o produto ao carrinho */}
                  <button
                    type="button"
                    onClick={ () => this.shopClick(id) }
                    data-testid="product-add-to-cart"
                  >
                    Comprar
                  </button>
                </div>
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

Home.propTypes = {
  updateState: PropTypes.func.isRequired,
  quantityCart: PropTypes.number.isRequired,
};

export default Home;
