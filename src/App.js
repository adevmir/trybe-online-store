import React from 'react';
import './App.css';
import Base from './Base';

function App() {
  return (
    <Base />
  );
}

// import React from 'react';
// // import getCategories from './services/api';
// import './App.css';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import Home from './Pages/Home';
// import ShoppingCart from './Pages/ShoppingCart';
// import ProductDetails from './Pages/ProductDetails';

// function App() {
//   return (
//     <BrowserRouter>
//       <Switch>
//         <Route exact path="/" component={ Home } />
//         {/* <Route
//           path="/shopping-cart"
//           component={ ShoppingCart }
//         /> */}
//         <Route
//           path="/shopping-cart/:shopCart"
//           render={ (props) => <ShoppingCart { ...props } /> }
//         />
//         <Route
//           path="/product-details/:id"
//           render={ (props) => <ProductDetails { ...props } /> }
//         />
//       </Switch>
//     </BrowserRouter>
//   );
// }

export default App;
