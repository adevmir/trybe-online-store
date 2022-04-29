import React from 'react';
import LinkShopCart from '../Components/LinkShopCart';

class Home extends React.Component {
  render() {
    return (
      <main>
        <h2>Página Home</h2>
        {/* Link para o carrinho de compras */}
        <LinkShopCart />
        {/* Mensagem inicial */}
        <h3 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>
      </main>
    );
  }
}

export default Home;
