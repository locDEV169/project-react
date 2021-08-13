import React,{Component,useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    PopupboxManager,
    PopupboxContainer
} from 'react-popupbox';


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

function Condition(props){
    const status = props.status;
    if(status == 0){
        return "Sale";
    }else{
        return "New"
    }
}

function Brand(props){
    const brand = props.brand;
    if(brand == 1){
        return "Brand 1"
    }
    else if(brand == 2){
        return "Brand 2"
    }
    else{
        return "Other Brand"
    }
}
function Example() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);
  
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
}

// function openPopupbox(props) {
//     const content = props.contentImage;
//     PopupboxManager.open({
//       content,
//       config: {
//         titleBar: {
//           enable: true,
//           text: 'Meow!'
//         },
//         fadeIn: true,
//         fadeInSpeed: 500
//       }
//     })
// }
class DetailProduct extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: "",
            product: {},
            categoryArray: {},
            brandArray: {},
            count: 0,
        }
        this.Product = this.Product.bind(this);
        this.openPopupbox = this.openPopupbox.bind(this)
    }
    componentDidMount(){
        const getId = this.props.match.params.id
        axios.get("http://localhost:8080/laravel/public/api/product/detail/ "+getId)
            .then((res) => {
                console.log(res)
                this.setState ({
                    id: getId,
                    product : res.data.data
                })
            })
            .catch((error) => console.log(error));
            //get brand and category
        let url = "http://localhost:8080/laravel/public/api/category-brand"
        axios.get(url)
            .then((res) => {
                // console.log(res);
                this.setState({
                categoryArray: res.data.category,
                brandArray: res.data.brand,
            });
            console.log(res.data)
            console.log(this.state.categoryArray)    
        })
            .catch(error => console.log(error));
            
    }
    openPopupbox() {
        let {product} = this.state;
        if(Object.keys(product).length > 0){
            // console.log(product['image']);
            const convertImage = JSON.parse(product['image'])
            let url = "http://localhost:8080/laravel/public/upload/product/" + product['id_user'] + "/"+ convertImage[0];
            const content = <img src={url}/>
            console.log(content);
            PopupboxManager.open({
                content,
                config: {
                    titleBar: {
                    enable: true,
                    text: 'Zoom For Image[0]!'
                    },
                fadeIn: true,
                fadeInSpeed: 500
              }
            })
        }
    }
    Product(){
        let {product} = this.state;
        // console.log(this.state.product);
        if(Object.keys(product).length > 0){
            console.log(product['image']);
            const convertImage = JSON.parse(product['image'])
            var convertStatus = JSON.parse(product['status'])
            const convertBrand = JSON.parse(product['id_brand'])
            console.log(convertImage)
            const contentImage = "http://localhost:8080/laravel/public/upload/product/" + product['id_user'] +'/'+ convertImage[0]
            console.log(contentImage)
            return(
                <div className="col-sm-9 padding-right">
                    <div className="product-details">
                        <div className="col-sm-5">
                            <div className="view-product">
                                <img src={"http://localhost:8080/laravel/public/upload/product/" +product["id_user"] +"/"+ convertImage[0]} alt="" />
                                {/* làm effect zoom giống như note trong ListApi */}
                                {/* <a href={"http://localhost:8080/laravel/public/upload/product/" +product["id_user"] +"/"+ convertImage[0]} rel="prettyPhoto">
                                    <h3>
                                        <button onClick={}>Zoom</button>
                                    </h3>
                                </a> */}
                                <h3>
                                    <button onClick={this.openPopupbox}>Zoom</button>
                                    <PopupboxContainer style={{color:"black"}}/>
                                </h3>
                                <p style={{color:"red"}}>Test useState</p>
                                    <p>You clicked {this.state.count} times</p>
                                <h4>
                                    <button onClick={() => this.setState({ count: this.state.count + 1 })} >Test Hook</button>
                                </h4>
                            </div>
                            <div id="similar-product" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="item active">
                                        <img src={"http://localhost:8080/laravel/public/upload/product/" + product["id_user"] +"/"+ convertImage[0]} alt="" />
                                    </div>
                                </div>
                                <a className="left item-control" href="#similar-product" data-slide="prev">
									<i className="fa fa-angle-left"></i>
								</a>
                                <a className="right item-control" href="#similar-product" data-slide="next">
									<i className="fa fa-angle-right"></i>
								</a>
                            </div>
                        </div>
                        <div class="col-sm-7">
                            <div class="product-information">
                            {/* <!--/product-information--> */}
                                    <PanerStatus status={convertStatus}/>
                                    <h2>{product["name"]}</h2>
                                    <p>Web ID: {product["web_id"]}</p>
                                    <img src="images/product-details/rating.png" alt="" />
                                    <span>
                                        <span>US ${product["price"]}</span>
                                        <label>Quantity:</label>
                                        {/* <input type="text" value={product["detail"]} /> */}
                                        <input type="text" value="3" />
                                        <button type="button" class="btn btn-fefault cart">
                                            <i class="fa fa-shopping-cart"></i>
                                            Add to cart
                                        </button>
                                    </span>
                                    <p><b>Availability:</b> In Stock</p>
                                    <p><b>Condition:</b> <Condition status={convertStatus}/></p>
                                    <p><b>Brand:</b><Brand brand={convertBrand}/></p>
                                    <a href=""><img src="http://localhost:8080/laravel/public/frontend/images/product-details/share.png" 
                                    className="share img-responsive"  alt="" /></a>
                            </div>
                            {/* <!--/product-information--> */}
                        </div>
                    </div>
                </div>
            )
        }
    }
    render(){
        return(
            <div>
                this is Detail page of {this.state.id}
                {this.Product()}
            </div>
        )
    }
}
export default DetailProduct