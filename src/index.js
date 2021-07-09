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
  Link,
  useRouteMatch,
  useParams,Redirect
} from "react-router-dom";

//component
import Home from './components/Home'
import Login from './components/Member/login'
import Blog from './components/Blog/Blog'
import DetailBlog from './components/Blog/DetailBlog'
import register from './components/Member/register'
import Update from './components/Account/Update';



ReactDOM.render(
  
  <React.StrictMode>
    
    <Router>
      <App>
        <Switch>
          <Route path='/' component={Home} exact />
          {/* <Route path='/home' component={Home} exact /> */}
          <Route path='/login' component={Login} />
          <Route path='/register' component={register} />
          {/* <Route path="/account" render={() => (<Redirect to="/account" />)} /> */}
          <Route path='/blog/list' component={Blog} />
          <Route path='/blog/detail/:id' component={DetailBlog} />
          <Route path='/account/member' component={Update}/>
          {/* <Route component={Account} /> */}
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
