import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import MenuLeft_Account from "../../Layout/MenuLeft_Account";
import { Link } from "react-router-dom";
import axios from 'axios';

class List extends Component{
    constructor(props){
        super(props);
        this.state = {
            msg: "",
            productData:{},
        }
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
    ListProduct() {
        let productData = this.state.productData;
        console.log(productData)
        console.log((Object.keys(productData).length))
        if (Object.keys(productData).length > 0) {
            
            return Object.keys(productData).map((key, index) => {
                console.log(productData[key]["id_user"])
                const covertImages = JSON.parse(productData[key]["image"])
                return (
                    <tr>
                    {/* id */}
                        <td className="cart_product">
                            <a>
                                <p style={{marginTop: "10px",color:"Blue"}}>{productData[key]["id"]}</p>
                            </a>                      
                        </td>
                        {/* name */}
                        <td className="cart_description">
                            <h4>
                                <p style={{fontSize: "20px",color:"blue"}}>{productData[key]["name"]}</p>
                            </h4>
                        </td>
                        {/* image */}
                        <td className="cart-product">
                            <a href>
                                <img
                                src={"http://localhost:8080/laravel/public/upload/user/product/"+ productData[key]["id_user"]+"/" + covertImages[0]}
                                style={{width: "70px"}}
                                />
                            </a>
                        </td>
                        {/* price */}
                        <td className="cart_price">
                            <p>${productData[key]["price"]}</p>
                        </td>
                        {/* action */}
                        <td className="cart_action">
                            <Link to={"/account/editProduct/"}>
                                Edit
                            </Link>
                        <br />
                            <Link to={"/account/deleteProduct/"}>
                                Delete
                            </Link>
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
                                <div className="table-responsive cart_info">
                                    <table className="table table-condensed">
                                        <thead>
                                            <tr class="cart_menu">
                                                <td className="id">ID</td>
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