import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ShoppingCart from './Pages/ShoppingCart';
import ProductDetails from './Pages/ProductDetails';

class Base extends React.Component {
  constructor() {
    super();
    this.updateShop = this.updateShop.bind(this);
    this.state = ({
      shopList: [],
    });
  }

  updateShop(listItems) {
    console.log('Entreou no updateState');
    this.setState(() => ({
      // shopList: [...old.shopList, listItems],
      shopList: listItems,
    }));
  }

  render() {
    const { shopList } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          {/* Rota para o Home */}
          <Route
            exact
            path="/"
            render={ () => (
              <Home
                updateState={ this.updateShop }
                quantityCart={ shopList.length }
              />) }
          />
          <Route
            path="/shopping-cart"
            render={ () => (
              <ShoppingCart
                fatherList={ shopList }
                quantityCart={ shopList.length }
              />) }
          />
          {/* Rota para os detalhes do produto */}
          <Route
            path="/product-details/:id"
            render={ (props) => <ProductDetails { ...props } /> }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Base;
