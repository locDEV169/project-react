import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
//import router-dom
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,Redirect
} from "react-router-dom";

class MenuLeft extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div class="col-sm-3">
                <div class="left-sidebar">
                    <h2>Category</h2>
                    {/* <!--category-productsr--> */}
                    <div class="panel-group category-products" id="accordian">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title"><a href="http://localhost:8080/laravel/public/product/category/1">Category1</a></h4>
                            </div>
                        </div>                                
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title"><a href="http://localhost:8080/laravel/public/product/category/2">Category2</a></h4>
                            </div>
                        </div>        
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title"><a href="http://localhost:8080/laravel/public/product/category/3">vietnam</a></h4>
                            </div>
                        </div>
                        </div>
                        {/* <!--/category-products-->
                        <!--brands_products--> */}
                        <div class="brands_products">
                            <h2>Brands</h2>
                            <div class="brands-name">
                                <ul class="nav nav-pills nav-stacked">
                                    <li><a href="http://localhost:8080/laravel/public/product/brand/1">Brand1</a></li>
                                    
                                    <li><a href="http://localhost:8080/laravel/public/product/brand/2">Brand2</a></li>
                                </ul>                    
                            </div>
                        </div>
                        {/* <!--/brands_products--> */}
                        
                        {/* <!--shipping-->*/}
                        <div class="shipping text-center">
                            <img src="http://localhost:8080/laravel/public/frontend/images/home/shipping.jpg" alt="" />
                        </div>
                        {/* <!--/shipping--> */}
                    </div>
                </div>                
        )
    }
}
export default MenuLeft