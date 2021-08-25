import React, { useState } from 'react';

const CartItem = (props) => {
    const { product } = props;
    const { sum } = props;
    const [quantity, setQuantity] = useState(product.qty)
    var total = 0;
    console.log("price", product.price)
    //sum Price
    console.log(product.price)
    //total += (product.price * quantity)
    //convert Image
    let convertImages = JSON.parse(product.image);
    //update cho Quantity
    const updateQuantity = (value) => {
        // get Local xong tăng qty ở local lên
        let cartStore = JSON.parse(localStorage.getItem("carts"))
        //console.log(cartStore[product.id])
        cartStore[product.id] += value
        console.log(quantity, value, product.price)
        //tổng
        //props.sum((quantity + value) * product.price)
        if(value == "1"){
            console.log("123")
            props.sum((value) * product.price)
        }else{
            console.log("456")
            props.sum((value) * product.price)
        }
        //set Quantity theo value set ở dưới onClick
        setQuantity(quantity + value)
        //get qty lại cho local
        localStorage.setItem("carts", JSON.stringify(cartStore))
        //console.log(props.sum)
        console.log(props)
    }
    
    return (
        <tr>
            <td className="cart_product">
                <a href>
                    <img src={"http://localhost:8080/laravel/public/upload/product/" + product.id_user + "/" + convertImages[0]}
                        style={{ width: "70px", height: "70px" }}
                        alt />
                </a>
            </td>
            <td className="cart_description">
                <p>{product.name}</p>
                <p>Web ID: </p>
            </td>
            <td className="cart_price">
                <p>${product.price}</p>
            </td>
            <td className="cart_quantity">
                <div className="cart_quantity_button">
                    <a className="cart_quantity_up" onClick={() => updateQuantity(1)} >
                        +
                    </a>
                    <input
                        className="cart_quantity_input"
                        type="text"
                        name="quantity"
                        //defaultValue={1}
                        value={quantity}
                        autoComplete="off"
                        size={2}
                        onChange={text => setQuantity(text)}
                    />
                    <a className="cart_quantity_down" onClick={() => updateQuantity(-1)} >
                        -
                    </a>
                    {/* <UpanDown value={value} qty={value['qty']} id={value["id"]}/> */}
                </div>
            </td>
            <td className="cart_total">
                <p className="cart_total_price">{quantity * product.price}</p>
            </td>
            <td className="cart_delete">
                <a className="cart_quantity_delete" href>
                    <i className="fa fa-times" />
                </a>
            </td>
        </tr>
    )
}
export default CartItem;