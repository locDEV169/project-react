import React,{Component} from 'react';
import axios from 'axios';
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
            carts: [],
        }
        this.ListProduct = this.ListProduct.bind(this)
        this.handleAddtoCart = this.handleAddtoCart.bind(this)
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
    handleAddtoCart = (value) => {
        /// create a varialbe local  : carts = []
        // get local ,
        // let carts = [];
        // var sum = 1;
        // let index = carts.findIndex(item => item.id === value["id"])
        // var qty = 1
        // var id = value["id"]
        // // ko cos index
        // if(index === -1){
        //     // value.qty = 1;
        //     carts[value["id"]] = qty
        //     // carts.push(value);
        //     console.log("6000")
        // }else{
        //     // carts.push(value);
        //     carts[index].value = carts[index].value + 1
        //     console.log("7000")        
        // }
        // // set local
        // //var convertJson = JSON.stringify(carts) // chuyển thành 1 chuỗi JSON
        // //localStorage.setItem("carts", convertJson) //chuyển vào local
        var getId = value["id"]
        var qty = 1 
        var objCarts = {};
        var check = 1;
        var convertCart = localStorage.getItem("carts");
        if(convertCart){
            objCarts = JSON.parse(convertCart)
            Object.keys(objCarts).map((key, value) => {
                if (key == getId) {
                    // console.log("objCarts[key]",objCarts[key])
                    objCarts[key] += 1;
                    check = 2;
                }
            })
        }
        if(check !=2 ){
            objCarts[getId] = qty
        }
        var convertJson = JSON.stringify(objCarts) // chuyển thành 1 chuỗi
        localStorage.setItem("carts", convertJson) //hàm chuyển vào local
        
        //console.log(value["id"],getId )
        //console.log("value",value)
        console.log("objCarts",objCarts)
    }
    ListProduct(){
        let {product} = this.state;
        console.log(this.state.product)
        let sumCart = 0;
        if (product.length > 0){
            return product.map ((value,key) => {
                //covert Image để hiển thị vì ảnh là file JSON
                let convertImages = JSON.parse(value["image"]);
                var convertStatus = JSON.parse(value['status'])
                var convertIdUser = JSON.parse(value['id_user'])
                console.log(value["id_user"])
                return(
                    <div class="col-sm-4" key ={key}>
                    <div class="product-image-wrapper">
                        <div class="single-products">
                            <div class="productinfo text-center">
                                <img
                                    src={"http://localhost:8080/laravel/public/upload/product/"+value["id_user"] +"/" +convertImages[0]} alt={value["name"]}
                                    style={{width:"200px"}}
                                />
                                <h2>${value["price"]}</h2>
                                <p>{value["name"]}</p>
                                {/* <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a> */}
                                <button className="btn btn-default add-to-cart" 
                                    onClick={() => this.handleAddtoCart(value)}>
                                        <i class="fa fa-shopping-cart"></i>Add to cart
                                </button>
                            </div>
                            <div class="product-overlay">
                                <div class="overlay-content">
                                    <h2>${value["price"]}</h2>
                                    <p>{value["name"]}</p>
                                    <button className="btn btn-default add-to-cart" onClick={() => this.handleAddtoCart(value)}>
                                        <i class="fa fa-shopping-cart"></i>Add to cart
                                    </button>
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
        let {product} =this.state
        return(
            <div className="features_items">
                <h2 className="title text-center">Features Items</h2>
                {this.ListProduct()}
                
            </div>
        )
    }
}
export default ListProduct