import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ShoppingCart from './Pages/ShoppingCart';
import ProductDetails from './Pages/ProductDetails';

class Main extends React.Component {
  render() {
    return (
      <>
        <header>
          <h1>
            Grupo 41 Store(Cabeçalho)
          </h1>
        </header>
        A main é aqui
        <BrowserRouter>
          <Switch>
            {/* Rota para Home */}
            <Route exact path="/" component={ Home } />

            {/* Rota para o Carrinho de Compras */}
            <Route path="/shopping-cart" component={ ShoppingCart } />

            {/* Rota para Detalhes do produto */}
            <Route
              path="/product-details/:id"
              render={ (props) => <ProductDetails { ...props } /> }
            />
          </Switch>
        </BrowserRouter>
        <footer>
          <h5>
            Since 2022(Rodapé)
          </h5>
        </footer>
      </>
    );
  }
}

export default Main;
