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
        this.sumCart = this.sumCart.bind(this)
    }
    sumCart(value){
        var {total} = this.state
        console.log(value)
        this.setState({
            total: value
        })
    }
    Sum(value) {
        let {carts} = this.state;
        var { total } = this.state
        this.setState({
            total: total + value
        })
        console.log("total",total)
    }
    componentDidMount() {
        const getLocal = localStorage.getItem("carts");
        const getcart = JSON.parse(getLocal);
        let url = "http://localhost:8080/laravel/public/api/product/cart"
        axios.post(url, getcart)
            .then((res) => {
                //console.log(res.data.data)
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

        //console.log(this.state.carts)
    }
    listCart() {
        let { carts,total } = this.state
        let sumCart = 0;
        if (carts.length > 0) {
            return carts.map((value, key) => {
                //total += value["price"] * value["qty"]
                sumCart += value["price"] * value["qty"];
                //this.sumCart(sumCart)
                //console.log(sumCart += value["price"] * value["qty"])
                return <CartItem product={value} sum={this.Sum} />
            }
            );
        }
    }
    //#do_action
    Checkout() {
        let {total,carts} = this.state
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
                                    </table>

                                </div>
                            </div>
                        </div>
                        <p>Tong tien: {total}</p>
                        {this.Sum}
                    </div>
                </section>
                {this.Checkout()}
            </div>


        )
    }
}
export default Cart