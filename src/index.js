import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';


//import router-dom
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

//component
//import Home from './components/Home'
import Login from './components/Member/login'
import Blog from './components/Blog/Blog'
import BlogHook from './components/Blog/BlogHook'
import DetailBlog from './components/Blog/DetailBlog'
import register from './components/Member/register'
import ListProduct from './components/Product/ListProduct'
import DetailProduct from './components/Product/DetailProduct';
import Cart from './components/Product/Cart';
import Account from './components/Account/Index'
ReactDOM.render(
  
  <React.StrictMode>
    
    <Router>
      <App>
        <Switch>
          <Route path='/' component={ListProduct} exact />
          <Route path='/home' component={ListProduct} exact />
          <Route path='/login' component={Login} />
          <Route path='/register' component={register} />

          <Route path='/blog/list' component={BlogHook} />
          <Route path='/blog/detail/:id' component={DetailBlog} />

          <Route path='/product/home' component={ListProduct} />
          <Route path='/product/detail/:id' component={DetailProduct} />
          <Route path='/product/cart' component={Cart} />

          {/* <Route path='/account/member/' component={Update}/>
          <Route path='/account/my-product/' component={List}/>
          <Route path='/account/addProduct' component={Add}/>
          <Route path='/account/editProduct/:id' component={Edit}/> */}
          <Route component={Account} />
        </Switch>
      </App>
    </Router>
  </React.StrictMode>,
  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
