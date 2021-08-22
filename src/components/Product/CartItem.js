import React,{useState}from 'react';


const CartItem = props => {
    const {product} = props;
    
    const [quantity, setQuantity] = useState(product.qty)
    let convertImages = JSON.parse(product.image);
    //console.log(convertImages)
    const updateQUantity = value =>{
        let cartStore =  JSON.parse(localStorage.getItem("carts")) 
        console.log(cartStore[product.id])
        cartStore[product.id]+=value
        props.sum((quantity+value)*product.price)
        setQuantity(quantity+value)
        localStorage.setItem("carts", JSON.stringify( cartStore))
        console.log(props)
    }
    return (
            <tr>
                <td className="cart_product">
                    <a href>
                        <img src={"http://localhost:8080/laravel/public/upload/product/"+ product.id_user + "/" + convertImages[0]}
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
                        <button className="cart_quantity_up"  onClick={()=>updateQUantity(1)} >
                            +
                        </button>
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
                        <button className="cart_quantity_down" onClick={()=>updateQUantity(-1)} >
                            -
                        </button>
                        {/* <UpanDown value={value} qty={value['qty']} id={value["id"]}/> */}
                    </div>
                </td>
                <td className="cart_total">
                    <p className="cart_total_price">{quantity*product.price}</p>
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