//import logo from './logo.svg';
import './App.css';


import Header from './components/Layout/Header'
//import Slider from './components/Layout/Slider'
import Footer from './components/Layout/Footer';
import { Component } from 'react';
import MenuLeft from './components/Layout/MenuLeft_Blog';
//import BlogPost from './components/Blog/BlogPost';
//import Pagination from './components/Layout/Pagination';
import { AppContext } from './Context/AppContext';
class App extends Component {
  constructor(props) {
    super(props)
    // create a variable countQuantity = 0,
    this.state = {
      value: 0,
      countQuantity: 0,
    }
    this.stateLoginContext = this.stateLoginContext.bind(this)
    this.stateQuantity = this.stateQuantity.bind(this)
  }

  stateLoginContext(check) {
    let flag = check
    //console.log("context Login in App",check,flag)
    localStorage["isLogin"] = JSON.stringify(flag)
  }
  stateQuantity(quantity) {
    let { countQuantity } = this.state
    var qty = localStorage.getItem("totalQTY")
    this.setState({
      countQuantity: countQuantity + quantity
    })
    localStorage.setItem("totalQTY", countQuantity + 1)
    console.log("app", quantity,countQuantity)
  }
  
  render() {
    return (
      <>
        <AppContext.Provider
          value={{
            state: this.state,
            loginContext: this.stateLoginContext,
            QuantityContext: this.stateQuantity,
          }}>
          <Header />
          {/* <Slider /> */}
          <section>
            <div className="container">
              <div className="row">
                <div className="col-sm-3">
                  <MenuLeft />
                </div>
                {this.props.children}
                {/* gọi tới các prop con từ component con */}

              </div>
            </div>
          </section>
          <Footer />
        </AppContext.Provider>
      </>
    );
  }

}

export default App;
