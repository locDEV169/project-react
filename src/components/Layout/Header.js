import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
//import router-dom
import {
    BrowserRouter as Router,
    Link,
    withRouter
} from "react-router-dom";
class Header extends Component{
    constructor(props){
        super(props);
    }
    
    
    renderLogin(){
        // xét thử đã login hay chưa
        const isLogin = localStorage.getItem('isLogin')
        // console.log(isLogin)
        if(JSON.parse(isLogin)){
          return(
                <li><a onClick={e=>this.Submitlogout(e)}><i className="fa fa-lock" />logout</a></li>
          )
        }
        else{
          return(
            <li> <Link to="/login"><i className="fa fa-lock" /> Login</Link> </li>
          )
        }
        
    }
    Submitlogout(e){
        //set lại cho isLogin thành false
        localStorage.setItem("isLogin",JSON.stringify(false))
        this.props.history.push('/login');
        localStorage.clear();
        //dùng để quay lại location
        // window.location.href = '/';
    }
    renderAccount(){
        const isLogin = localStorage.getItem('isLogin')
        // console.log(isLogin + " JSON.parse(isLogin) :" + JSON.parse(isLogin));
        // cách lấy islogin từ local
        // là localStorage.getItem('isLogin')
        // sau đó chuyển thành biến js để xử lý
        if(JSON.parse(isLogin)){
          return(
            <li><Link to="/account/member"><i className="fa fa-user" /> Account</Link></li>
          )
        }
      }
    render(){
        return(
            <div>
                <header id="header">
                {/* header header_top */}
                <div className='header_top'>
                    <div className='container'>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="contactinfo">
                                    <ul className="nav nav-pills">
                                        <li><a href=""><i className="fa fa-phone"></i> +2 95 01 88 821</a></li>
                                        <li><a href=""><i className="fa fa-envelope"></i> info@domain.com</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="social-icons pull-right">
                                    <ul className="nav navbar-nav">
                                        <li><a href=""><i className="fa fa-facebook"></i></a></li>
                                        <li><a href=""><i className="fa fa-twitter"></i></a></li>
                                        <li><a href=""><i className="fa fa-linkedin"></i></a></li>
                                        <li><a href=""><i className="fa fa-dribbble"></i></a></li>
                                        <li><a href=""><i className="fa fa-google-plus"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* header_top */}
                {/* header-middle */}
                <div className="header-middle">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 clearfix">
                                <div className="logo pull-left">
                                    <a href="/"><img src="http://localhost:8080/laravel/public/frontend/images/home/logo.png" alt="" /></a>
                                </div>
                                <div className="btn-group pull-right clearfix">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                            USA
                                            <span className="caret"></span>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a href="">Canada</a></li>
                                            <li><a href="">UK</a></li>
                                        </ul>
                                    </div>
                                    
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                            DOLLAR
                                            <span className="caret"></span>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a href="">Canadian Dollar</a></li>
                                            <li><a href="">Pound</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 clearfix">
                                <div className="shop-menu clearfix pull-right">
                                    <ul className="nav navbar-nav">
                                        {this.renderAccount()}
                                        <li><a href="cart.html"><i className="fa fa-shopping-cart"></i> Cart</a></li>
                                        <li><Link to="/register"><i className="fa fa-lock" />Register</Link></li>
                                        {this.renderLogin()}
                                        {/* header hide account login */}
                                    </ul>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                {/* header-middle */}
                {/* header-bottom */}
                <div className="header-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-9">
                                <div className="navbar-header">
                                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>
                                </div>
                                <div className="mainmenu pull-left">
                                    <ul className="nav navbar-nav collapse navbar-collapse">
                                        <li><a href="index.html">Home</a></li>
                                        <li className="dropdown"><a href="#">Shop<i className="fa fa-angle-down"></i></a>
                                            <ul role="menu" className="sub-menu">
                                                <li><a href="product/home">Products</a></li>
                                                <li><a href="product-details.html">Product Details</a></li> 
                                                <li><a href="checkout.html">Checkout</a></li> 
                                                <li><a href="cart.html">Cart</a></li> 
                                                <li><a href="login">Login</a></li> 
                                            </ul>
                                        </li> 
                                        <li className="dropdown"><a href="#" className="active">Blog<i className="fa fa-angle-down"></i></a>
                                            <ul role="menu" className="sub-menu">
                                                <li><a href="blog/list" className="active">Blog List</a></li>
                                                <li><a href="blog-single.html">Blog Single</a></li>
                                            </ul>
                                        </li> 
                                        <li><a href="404.html">404</a></li>
                                        <li><a href="contact-us.html">Contact</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="search_box pull-right">
                                    <input type="text" placeholder="Search" />
                                    <i className="fas fa-search"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* header-bottom */}
            </header>
            {/* header */}
            </div>

        )
    }
}
export default withRouter(Header);