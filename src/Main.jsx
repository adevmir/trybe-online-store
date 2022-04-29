import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';

class Main extends React.Component {
  render() {
    return (
      <>
        <header>
          <h1>
            Grupo 41 Store(Cabeçalho)
          </h1>
        </header>
        <main>
          A main é aqui
          <BrowserRouter>
            <Switch>
              <Route path="/" component={ Home } />
            </Switch>
          </BrowserRouter>
        </main>
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
