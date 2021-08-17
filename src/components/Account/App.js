import React, { Component } from "react";
import MenuLeft from "./MenuLeft";
import {withRouter} from 'react-router-dom'

class App extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <>
          {/* <MenuLeft /> */}
          {this.props.children}
        </>
      );
    }
  }
  
  export default withRouter(App);