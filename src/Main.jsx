import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ShoppingCart from './Pages/ShoppingCart';
import ProductDetails from './Pages/ProductDetails';

class Main extends React.Component {
  constructor() {
    super();
    this.addCart = this.addCart.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.quantityItems = this.quantityItems.bind(this);
    this.state = ({
      shoppingList: [],
      total: 0,
    });
  }
  /*
    Formato de shoppingList:

    shoppingList = [ obj1, obj2, ..., objn ]
    obj = {
      id: id do produto
      quantity: quantos produtos foram adicionados
    }
  */

  // Se quiser usar getDetails, pode ser valido chama-lo dentro de AddCart, qnd o obj não existir

  // Adiciona produto ao carrinho de compras
  addCart(productId, productTitle, productPrice, productThumbnail) {
    const { shoppingList } = this.state;

    // Verifica se o id já existe em shoppingList: true - já existe, false -ainda não existe
    const idExists = shoppingList.some((product) => product.id === productId);

    // Caso o item ainda não tenha sido adicionado
    if (!idExists) {
      const itemObj = {
        id: productId,
        title: productTitle,
        price: productPrice,
        thumbnail: productThumbnail,
        quantity: 1,
      };
      this.setState((old) => ({
        shoppingList: [...old.shoppingList, itemObj],
      }),
      () => this.quantityItems());
    } else {
      // Caso o item já tenha sido adicionado
      shoppingList.forEach((infoProduct, index) => {
        if (infoProduct.id === productId) {
          const amount = infoProduct.quantity + 1;
          const reform = shoppingList;
          reform[index] = {
            id: infoProduct.id,
            title: infoProduct.title,
            price: infoProduct.price,
            thumbnail: infoProduct.thumbnail,
            quantity: amount,
          };
          this.setState(() => ({
            shoppingList: reform,
          }),
          () => this.quantityItems());
        }
      });
    }
  }

  removeItem(idProduct) {
    console.log('Entrou');
    const { shoppingList } = this.state;

    shoppingList.forEach((infoProduct, index) => {
      const reform = shoppingList;
      if (infoProduct.id === idProduct) {
        console.log('Achou o produto');
        // Se houver apenas 1 item e o usuario excluir ele, o obj dele é removido
        if (infoProduct.quantity === 1) {
          console.log('Só tinha 1', infoProduct);
          reform.splice(index, 1);
          this.setState(() => ({
            shoppingList: reform,
          }),
          () => this.quantityItems());
        } else {
          // Caso haja mais de 1 do mesmo produto
          console.log('Tinha mais de 1', infoProduct);
          const amount = infoProduct.quantity - 1;
          reform[index] = {
            id: infoProduct.id,
            title: infoProduct.title,
            price: infoProduct.price,
            thumbnail: infoProduct.thumbnail,
            quantity: amount,
          };
          this.setState(() => ({
            shoppingList: reform,
          }),
          () => this.quantityItems());
        }
      }
    });
  }

  quantityItems() {
    console.log('Entrou no contador de quantidade');
    const { shoppingList } = this.state;
    let total = 0;
    shoppingList.forEach(({ quantity }) => {
      total += quantity;
    });
    this.setState({
      total,
    });
  }

  render() {
    const { shoppingList, total } = this.state;
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
            <Route
              exact
              path="/"
              render={ () => (
                <Home
                  addItemCart={ this.addCart }
                />) }
            />

            {/* Rota para o Carrinho de Compras */}
            <Route
              path="/shopping-cart"
              // component={ ShoppingCart }
              render={ () => (
                <ShoppingCart
                  listItems={ shoppingList }
                  totalItems={ total }
                  addItemCart={ this.addCart }
                  removeItemCart={ this.removeItem }
                />) }
            />

            {/* Rota para Detalhes do produto */}
            <Route
              path="/product-details/:id"
              render={ (props) => (<ProductDetails
                { ...props }
                addItemCart={ this.addCart }
              />) }
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
