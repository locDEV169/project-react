import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import MenuLeft_Account from '../MenuLeft';
import { Link } from "react-router-dom";
import axios from 'axios';

class List extends Component{
    constructor(props){
        super(props);
        this.state = {
            msg: "",
            productData:{},
        }
        this.handleRemove = this.handleRemove.bind(this)
    }
    componentDidMount() {
        const getInfo  = localStorage.getItem("info");
        const convertInfo = JSON.parse(getInfo)
        let accessToken = convertInfo.success.token;
        let config = {
            headers: {
                Authorization: "Bearer " + accessToken,
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
            },
        };
        const url = "http://localhost:8080/laravel/public/api/user/my-product";
        axios.get(url,config).then((res) => {
            console.log(res)
                this.setState({
                    productData: res.data.data,
                });
            })
            .catch((error) => console.log(error));
        console.log(this.state)
    }
    handleRemove(e) {
        let getId = e.target.id;
        const convertInfo = JSON.parse(localStorage["info"]);
        const url ="http://localhost:8080/laravel/public/api/user/delete-product/" + getId;
        console.log(convertInfo);
        let accessToken = convertInfo.success.token;
        let config = {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        };
        axios.get(url, config)
            .then((res) => {
            console.log(res.data.data);
                this.setState({
                    productData: res.data.data,
                });
            })
          .catch((error) => console.log(error));
      }
    
    ListProduct() {
        let productData = this.state.productData;
        console.log(productData)
        console.log((Object.keys(productData).length))
        if (Object.keys(productData).length > 0) {
            return Object.keys(productData).map((value, key) => {
                console.log(productData[value]["image"])
                // vì file images là  json tap hop nhieu hinh anh
                //convert lại Array để rút ra tên images
                const covertImages = JSON.parse(productData[value]["image"])
                console.log(productData[value]["id"])
                return (
                    <tr>
                        {/* id */}
                        <td className="cart_product">
                            <a>
                                <p style={{marginTop: "10px",color:"Blue"}}>{productData[value]["id"]}</p>
                            </a>                      
                        </td>
                        {/* name */}
                        <td className="cart_description">
                            <h4>
                                <p style={{fontSize: "16px",color:"blue"}}>{productData[value]["name"]}</p>
                            </h4>
                        </td>
                        {/* image */}
                        <td className="cart-product">
                            <a href>
                                <img
                                    src={"http://localhost:8080/laravel/public/upload/user/product/"+ productData[value]["id_user"]+"/" + covertImages[0]}
                                    style={{width: "70px"}}
                                />
                            </a>
                        </td>
                        {/* price */}
                        <td className="cart_price">
                            <p>${productData[value]["price"]}</p>
                        </td>
                        {/* action */}
                        <td className="cart_action">
                            <Link to={"/account/editProduct/" + productData[value]["id"]}>
                                Edit
                            </Link>
                        <br />
                            <a id={productData[value]["id"]} onClick={this.handleRemove}>
                                Delete
                            </a>
                        </td>
                    </tr>
                );
            });
        }
        else{
            <tr>
                <td>
                    <p>No Product</p>
                </td>
            </tr>
        }  
    }
    
    render(){
        return(
            <div className="col-sm-9">
                <section id="cart_items">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-2">
                                <MenuLeft_Account />
                            </div>
                            <div className="col-sm-7">
                                <h3 style={{color:"blueviolet"}}>List Product</h3>
                                <div className="table-responsive cart_info">
                                    <table className="table table-condensed">
                                        <thead>
                                            <tr class="cart_menu">
                                                <td className="id">ID Product</td>
                                                <td className="name">name</td>
                                                <td className="image">Image</td>
                                                <td className="price">Price</td>
                                                <td className="action">Action</td>    
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.ListProduct()}
                                        </tbody>
                                    </table>
                                </div>
                                <button className="btn btn-primary">
                                    <Link to="/account/addProduct" style={{ color: "white" }}>Add New</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
export default List