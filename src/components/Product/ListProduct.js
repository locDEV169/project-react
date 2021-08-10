import React,{Component} from 'react';
import axios from 'axios';
import FormErrors from '../Error/formErrors';
import { Link } from "react-router-dom";

function PanerStatus(props){
    const status = props.status;
    console.log(status)
    if(status == 0){
        return <img class="sale" src="http://localhost:8080/laravel/public/upload/icon/sale.png"></img>
    }
    else{
        return <img class="new" src="http://localhost:8080/laravel/public/upload/icon/new.png"></img>
    }    
}

class ListProduct extends Component{
    constructor(props){
        super(props)
        this.state = {
            product: [],
        }
        this.ListProduct = this.ListProduct.bind(this)
    }
    componentDidMount(){
        axios.get("http://localhost:8080/laravel/public/api/product")
             .then((res) => {
                console.log(res)
                console.log(res.data.data)
                this.setState ({
                    product : res.data.data
                })
             })
             .catch((error) => console.log(error));
    }
    ListProduct(){
        let {product} = this.state;
        console.log(this.state.product)
        if (product.length > 0){
            return product.map ((value,key) => {
                //covert Image để hiển thị vì ảnh là file JSON
                let convertImages = JSON.parse(value["image"]);
                var convertStatus = JSON.parse(value['status'])
                console.log(value["status"])
                return(
                    <div class="col-sm-4" key ={key}>
                    <div class="product-image-wrapper">
                        <div class="single-products">
                            <div class="productinfo text-center">
                                <img
                                    src={"http://localhost:8080/laravel/public/upload/user/product/"+value["id_user"] +"/" +convertImages[0]} alt={value["name"]}
                                    style={{width:"200px"}}
                                />
                                <h2>${value["price"]}</h2>
                                <p>{value["name"]}</p>
                                <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                            </div>
                            <div class="product-overlay">
                                <div class="overlay-content">
                                    <h2>${value["price"]}</h2>
                                    <p>{value["name"]}</p>
                                    <a id={value["id"]} class="btn btn-default add-to-cart">
                                        <i class="fa fa-shopping-cart"></i>Add to cart
                                    </a>
                                </div>
                            </div>
                            <PanerStatus status={convertStatus}/>
                        </div>
                        <div class="choose">
                            <ul class="nav nav-pills nav-justified">
                                <li><a href="#"><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
                                <li><Link to={"/product/detail/" + value["id"]}><i class="fa fa-plus-square"></i>Detail</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                )
            })
        }
    }
    render(){
        return(
            <div className="features_items">
                <h2 className="title text-center">Features Items</h2>
                {this.ListProduct()}
            </div>
        )
    }
}
export default ListProduct