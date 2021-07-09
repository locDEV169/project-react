import logo from './logo.svg';
import './App.css';
import axios from 'axios';


import Header from './components/Layout/Header'
import Slider from './components/Layout/Slider'
import Footer from './components/Layout/Footer';
import { Component } from 'react';
import MenuLeft from './components/Layout/MenuLeft_Blog';
import BlogPost from './components/Blog/BlogPost';
import Pagination from './components/Layout/Pagination';

class App extends Component{
  constructor(props){
    super(props)
    
  }
  render(){
    return (
      <>
      
        <Header />
        {/* <Slider /> */}
        <section>
          <div className="container">
            <div className="row">
                
                {this.props.children} 
                {/* gọi tới các prop con từ component con */}
                
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }
  
}

export default App;
