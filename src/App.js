import React, { Fragment } from 'react';
import {Route, Routes} from "react-router-dom";
import ProductList from './Components/ProductList';
import ProductDetails from './Components/ProductDetails'
import CartList from './Components/CartList';

function App() {
  return (
    <div>
      <Fragment>
        <Routes>
          <Route path='product-list' element={<ProductList />}></Route>
          <Route path='product-details/:id' element={<ProductDetails />}></Route>
          <Route path='cart-list' element={<CartList />}></Route>
        </Routes>
      </Fragment>
    </div>
  );
}

export default App;
