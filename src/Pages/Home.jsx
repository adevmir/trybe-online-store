import React from 'react';
import PropTypes from 'prop-types';
import LinkShopCart from '../Components/LinkShopCart';
import ProductListing from '../Components/ProductListing';
import Categories from '../Components/Categories';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.getValue = this.getValue.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.state = ({
      category: '',
      product: '',
      listSearchedItems: ['Empty'],
      waitingSearch: true,
    });
  }

  // Pega o que esta sendo buscado pelo usuario e coloca no state
  getValue({ target }) {
    const { name, value } = target;
    this.setState(() => ({
      [name]: value,
    }),
    () => {
      if (name === 'category') {
        const { category, product } = this.state;
        this.getProducts(category, product);
      }
    });
  }

  // ---EM TESTES---
  // getValue({ target }) {
  //   const { name, value } = target;
  //   const { category, product } = this.state;
  //   if (name === 'category') {
  //     // Se a categoria clicada já estiver marcada ela é desmarcada
  //     console.log('Entrou no if de categoria');
  //     if (category === value) {
  //       console.log('Entrou no if de repetido');
  //       this.setState(() => ({
  //         category: '',
  //       }),
  //       () => {
  //         console.log('A busca foi feita');
  //         this.getProducts(category, product);
  //       });
  //     } else {
  //       console.log('É um categoria nova');
  //       this.setState(() => ({
  //         category: value,
  //       }),
  //       () => {
  //         console.log('A busca foi feita');
  //         this.getProducts(category, product);
  //       });
  //     }
  //   } else {
  //     this.setState({
  //       product: value,
  //     });
  //   }
  // }
  // ---EM TESTES---

  // Pesquisa os produtos buscados pelo usuario
  async getProducts(category, product) {
    const { results } = await getProductsFromCategoryAndQuery(category, product);
    this.setState({
      waitingSearch: false,
      listSearchedItems: results,
    });
  }

  render() {
    const {
      product,
      category,
      listSearchedItems,
      waitingSearch,
    } = this.state;

    const {
      addItemCart,
      // totalItems,
    } = this.props;

    return (
      <>
        <h2>Página Home</h2>
        {/* Onde o usuario digita o produto desejado e executa a busca */}
        <div>
          {/* Digita o que procura */}
          <input
            type="text"
            name="product"
            id="product"
            value={ product }
            onChange={ this.getValue }
            data-testid="query-input"
          />
          {/* Dispara o evento de busca */}
          <button
            type="button"
            data-testid="query-button"
            onClick={ () => this.getProducts(category, product) }
          >
            Buscar
          </button>
        </div>

        {/* Link para o carrinho de compras */}
        <LinkShopCart />
        {/* <p>{`Você tem ${totalItems} item(ns) no carrinho.`}</p> */}

        <main>
          {/* Mensagem inicial */}
          {waitingSearch && (
            <h3 data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h3>
          )}

          {/* Resultado da busca do usuario */}
          {listSearchedItems.length > 0 && listSearchedItems[0] !== 'Empty' && (
            // Resultado se alo for encontrado
            listSearchedItems.map(({ id, title, price, thumbnail }) => (
              <div key={ id }>
                <ProductListing
                  id={ id }
                  title={ title }
                  price={ price }
                  thumbnail={ thumbnail }
                />

                {/* Botão que adiciona itens ao carrinho */}
                <button
                  type="button"
                  onClick={ () => addItemCart(id, title, price, thumbnail) }
                  data-testid="product-add-to-cart"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            ))
          )}
          {listSearchedItems.length === 0 && (
            // Resultado se nada for encontrado
            <p>Nenhum produto foi encontrado</p>
          )}
        </main>
        <Categories
          handleClick={ this.getValue }
        />
      </>
    );
  }
}

Home.propTypes = {
  addItemCart: PropTypes.func.isRequired,
  // totalItems: PropTypes.number.isRequired,
};

export default Home;
