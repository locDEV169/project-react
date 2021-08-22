import React, { Component, useState } from 'react';
import axios from 'axios';
import FormErrors from '../Error/formErrors';
import { Link } from "react-router-dom";
import CartItem from './CartItem';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carts: {},
            formErrors: {},
            total: 0
        };
        this.listCart = this.listCart.bind(this)
        this.Sum = this.Sum.bind(this)
    }
    Sum(value) {
        let { total } = this.state
        this.setState({
            total: total + value
        })
    }
    componentDidMount() {
        const getLocal = localStorage.getItem("carts");
        const getcart = JSON.parse(getLocal);
        let url = "http://localhost:8080/laravel/public/api/product/cart"
        axios.post(url, getcart)
            .then((res) => {
                console.log(res.data.data)
                if (res.data.errors) {
                    this.setState({
                        formErrors: res.data.errors,
                    });
                } else {
                    this.setState({
                        carts: res.data.data,
                    });
                }
            });

        console.log(this.state.carts)
    }
    listCart() {
        let { carts } = this.state
        let sum = 0
        if (carts.length > 0) {
            return carts.map((value, key) => {
                let convertImages = JSON.parse(value["image"]);
                console.log(convertImages)
                return <CartItem product={value} sum={this.Sum} />
                // let convertImages = JSON.parse(value["image"]);
                // sum = value["price"] * value["qty"];
                // console.log(value)
                // return (
                //     <tbody>
                //         <tr>
                //           <td className="cart_product">
                //             <a href>
                //                 <img src={"http://localhost:8080/laravel/public/upload/product/"+value["id_user"] +"/" +convertImages[0]}
                //                 style={{width:"100px",height:"70px"}}
                //                 alt={value["name"]}/>
                //             </a>
                //           </td>
                //           <td className="cart_description">
                //             <p>{value["name"] }</p>
                //             <p>Web ID: {value["wed_id"] }</p>
                //           </td>
                //           <td className="cart_price">
                //             <p>${value["price"] }</p>
                //           </td>
                //           <td className="cart_quantity">
                //             <div className="cart_quantity_button">
                //                 {/* <button className="cart_quantity_up" onClick={()=> this.handleUP(value)}>
                //                     +
                //                 </button>
                //                 <input
                //                     className="cart_quantity_input"
                //                     type="text"
                //                     name="quantity"
                //                     //defaultValue={1}
                //                     value={value["qty"]}
                //                     autoComplete="off"
                //                     size={2}
                //                 />
                //                 <button className="cart_quantity_down" href>
                //                     -
                //                 </button> */}
                //                 <UpanDown value={value} qty={value['qty']} id={value["id"]}/>
                //             </div>
                //           </td>
                //           <td className="cart_total">
                //             <p className="cart_total_price">${sum}</p>
                //           </td>
                //           <td className="cart_delete">
                //             <a className="cart_quantity_delete" href>
                //               <i className="fa fa-times" />
                //             </a>
                //           </td>
                //         </tr>
                //     </tbody>
                // );
            }
            );
        }

    }
    //#do_action
    Checkout() {
        let {total} = this.state
        return (
            <section id="do_action">
                <div className="container">
                    <div className="heading">
                        <h3>What would you like to do next?</h3>
                        <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="chose_area">
                                <ul class="user_option">
                                    <li>
                                        <input type="checkbox" />
                                        <label>Use Coupon Code</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <label>Use Gift Voucher</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <label>Estimate Shipping & Taxes</label>
                                    </li>
                                </ul>
                                <ul className="user_info">
                                    <li className="single_field">
                                        <label>Country:</label>
                                        <select>
                                            <option>United States</option>
                                            <option>Bangladesh</option>
                                            <option>UK</option>
                                            <option>India</option>
                                            <option>Pakistan</option>
                                            <option>Ucrane</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>
                                    </li>
                                    <li className="single_field">
                                        <label>Region / State:</label>
                                        <select>
                                            <option>Select</option>
                                            <option>Dhaka</option>
                                            <option>London</option>
                                            <option>Dillih</option>
                                            <option>Lahore</option>
                                            <option>Alaska</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>

                                    </li>
                                    <li className="single_field zip-field">
                                        <label>Zip Code:</label>
                                        <input type="text" />
                                    </li>
                                    <a className="btn btn-default update" href="">Get Quotes</a>
                                    <a className="btn btn-default check_out" href="">Continue</a>
                                </ul>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="total_area">
                                <ul class="result">
                                    <li>Cart Sub Total <span>$59</span></li>
                                    <li>Eco Tax <span>$2</span></li>
                                    <li>Shipping Cost <span>Free</span></li>
                                    <li>Total <span>${total}</span></li>
                                </ul>
                                <a className="btn btn-default update" href="">Update</a>
                                <a className="btn btn-default check_out" href="">Check Out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
    render() {
        let { carts, total } = this.state
        return (
            <div>
                <section id="cart_items">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-9">
                                <div className="breadcrumbs">
                                    <ol className="breadcrumb">
                                        <li>
                                            <a href="#">Home</a>
                                        </li>
                                        <li className="active">Shopping Cart</li>
                                    </ol>
                                </div>
                                <div className="table-responsive cart_info">
                                    <table className="table table-condensed">
                                        <thead>
                                            <tr className="cart_menu">
                                                <td className="image">Item</td>
                                                <td className="description" />
                                                <td className="price">Price</td>
                                                <td className="quantity">Quantity</td>
                                                <td className="total">Total</td>
                                                <td />
                                            </tr>

                                        </thead>
                                        <tbody>
                                            {this.listCart()}
                                        </tbody>

                                        {/* { console.log("cart",typeof carts,carts)} */}
                                    </table>

                                </div>
                            </div>
                        </div>
                        <p>Tong tien: {total}</p>
                    </div>
                </section>
                {this.Checkout()}
            </div>


        )
    }
}
export default Cart