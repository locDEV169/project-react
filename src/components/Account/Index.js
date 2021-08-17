  
import React, { Component } from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import App from './App'
import {withRouter} from 'react-router-dom'

import Update from './Member/Update';
import Add from './My-Product/Add';
import Edit from './My-Product/Edit';
import List from './My-Product/List';
class Index extends Component {
  render () {
    return (
      <App>
        <Route>
          <Switch>
          <Route path='/account/member/' component={Update}/>
          <Route path='/account/my-product/' component={List}/>
          <Route path='/account/addProduct' component={Add}/>
          <Route path='/account/editProduct/:id' component={Edit}/>
          </Switch>
        </Route>  
      </App>
    )
  }
}
export default withRouter(Index)