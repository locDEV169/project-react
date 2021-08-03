import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import MenuLeft_Account from "../../Layout/MenuLeft_Account";
import FormErrors from '../../Error/formErrors';
import axios from 'axios';

const SucecssStyle = {
    color:'greenyellow'
}

class Add extends Component{
    constructor(props){
        super(props);
        this.state = {
            category:'',
            brand: '',
            name: '',
            image: '',
            price: '',
            status: 1,
            sale: '',
            detail:'',
            company:'',
            msg: '',
            formErrors: {},
            files:'',
            categoryArray: {},
            brandArray: {},
        }
        this.handleValue = this.handleValue.bind(this);
        this.Sale = this.Sale.bind(this);
        this.ListCategory = this.ListCategory.bind(this);
        this.ListBrand = this.ListBrand.bind(this);
        // this.handleInputFile = this.handleInputFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleValue(e){ 
        let nameInput = e.target.name;
        let value = e.target.value;
        this.setState({
            [nameInput]: value,
        })
    }
    handleInputFile = (e) =>{
        console.log(e.target.files);
        this.setState({
            files: e.target.files
        })
        console.log(this.state.files)
        console.log(Object.keys(this.state.files).length)
    }
    Sale() {
        const { status } = this.state;
        if (status == 0) {
          return (
            <div style={{display:"inline-block"}}>
                <input  id="productSale" type="text" name="sale" placeholder="0%" value={this.state.sale}  onChange={this.handleValue}
                    style={{width:"100px", float:"left"}}                
                />
                <span style={{margin:"20px 0px 10px 10px"}}>%</span>
            </div>
          );
        }
    }
    componentDidMount() {
        let url = "http://localhost:8080/laravel/public/api/category-brand"
        axios.get(url)
            .then((res) => {
                // console.log(res);
                this.setState({
                categoryArray: res.data.category,
                brandArray: res.data.brand,
            });
            console.log(res.data)
            })
            .catch(error => console.log(error));
            console.log(this.state);
    }
    
    ListCategory(){
        const categoryArray = this.state.categoryArray;
        console.log(categoryArray)
        if(categoryArray.length >0) {
            return categoryArray.map((value, key)=>{
            // console.log(value['category'])
              return (
                <option value={value['id']}>{value['category']}</option>
              )
            })
          }
    }
    ListBrand(){
        const brandArray = this.state.brandArray;
        console.log(brandArray)
        if(brandArray.length >0) {
            return brandArray.map((value, key)=>{
            console.log(value['brand'])
              return (
                <option value={value['id']}>{value['brand']}</option>
              )
            })
          }
    }
    
    handleSubmit(e){
        e.preventDefault();
        console.log(this.state);
        let check = true;
        let { category, brand, name, price,detail,company,files } = this.state;
        let errorsSubmit = this.state.formErrors;
        if(name == ""){
            check = false;
            errorsSubmit.name = "Vui lòng nhập tên sản phẩm"
        }
        else{
            check = true;
            errorsSubmit.name = ""
        }
        if(price == ""){
            check = false;
            errorsSubmit.price = "Vui lòng nhập giá của sản phẩm"
        }
        else{
            check = true
            errorsSubmit.price = ""
        }
        if(category == ""){
            check = false;
            errorsSubmit.category = "Vui lòng chọn category của sản phẩm"
        }
        else{
            check = true
            errorsSubmit.category = ""
        }
        if(brand == ""){
            check = false;
            errorsSubmit.brand = "Vui lòng chọn brand của sản phẩm"
        }
        else{
            check = true
            errorsSubmit.brand = ""
        }
        
        if(company == ""){
            check = false;
            errorsSubmit.company = "Vui lòng chọn company của sản phẩm"
        }
        else{
            check = true
            errorsSubmit.company = ""
        }
        if(files == ''){
            check = false;
            errorsSubmit.files = "Vui lòng chọn images của sản phẩm"
        }
        else{
            check = true
            errorsSubmit.files = ""
            console.log(this.state.files)
            console.log(Object.keys(files).length)
            if(Object.keys(files).length > 3 ){
                check = false;
                errorsSubmit.files = 'khoong quas 3 image'
           }
           else{
               Object.keys(files).map((key,index)=>{
                   console.log("files[key][size] : "+ files[key]["size"]);
                   console.log("files[key][name].split(.): "+files[key]["name"].split("."))
                   if(files[key]["size"] > 20 * 1024 * 1024 ){
                       check = false;
                       errorsSubmit.files = 'images < 20MB'
                       console.log("1")
                   }
                   else{
                    const typeImg = ["png", "jpg", "jpeg", "PNG", "JPG"]
                    let res = files[key]["name"].split(".")
                    console.log("0")
                    if (!typeImg.includes(res[1])) {
                        errorsSubmit.files = "vui lòng upload đúng định dạng images";
                    }
                    else{
                      check = true;
                      errorsSubmit.files = ''
                    }
                   }
               })
           }
        }

        if(detail == ""){
            check = false;
            errorsSubmit.detail = "Vui lòng chọn detail của sản phẩm"
        }
        else{
            check = true
            errorsSubmit.detail = ""
        }
        if(!check){
            this.setState({
                formErrors : errorsSubmit
            })
        }
        else{
            const getInfo = localStorage.getItem("info");
            const convertInfo = JSON.parse(getInfo);
            const accessToken = convertInfo.success.token;
            let url = "http://localhost:8080/laravel/public/api/user/add-product";
            let config = {
                headers: {
                    Authorization: "Bearer " + accessToken,
                    "Content-Type": "application/x-www-form-urlencoded",
                    Accept: "application/json",
                }
            }
            const formData = new FormData();
            formData.append('name',this.state.name);
            formData.append('price',this.state.price);
            formData.append("brand", this.state.brand);
            formData.append("category", this.state.category);
            formData.append("status", this.state.status);
            formData.append("sale", this.state.sale);
            formData.append("company", this.state.company);
            //truyền file(image) khác so với regiter
            Object.keys(files).map((value, key) => {
                console.log(files[value])
                formData.append("file[]", files[value]);
            });
            //
            formData.append("detail", this.state.detail);
            axios.post(url,formData,config)
                .then((res)=>{
                    console.log(res);
                    if(res.data.errors){
                        this.setState({
                            formErrors : res.data.errors
                        })
                    }
                    else{
                        this.setState({
                            msg: 'success',
                        });
                    }
                })
        }
    }
    render(){
        console.log(this.state)
        return(
            <div >
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <MenuLeft_Account />
                        </div>
                        <div className="col-sm-5">         
                            <div className="login-form">
                                <h2>Add Product</h2>
                                <FormErrors formErrors={this.state.formErrors} />
                                <p style={SucecssStyle}> {this.state.msg} </p> 
                                <form onSubmit={this.handleSubmit} enctype="multipart/form-data">
                                    <input
                                        type="text"
                                        placeholder="Name Product"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleValue}
                                    />
                                    <input
                                        type="text"
                                        name="price"
                                        value={this.state.price}
                                        placeholder="Price"
                                        onChange={this.handleValue}
                                    />
                                    <select
                                        type="text"
                                        name="category"
                                        value={this.state.category}
                                        onChange={this.handleValue}
                                        style={{margin:"0px 10px 10px 0px"}}
                                        >
                                        <option value="this.state.category">Category</option>
                                        {this.ListCategory()}
                                    </select>
                                    
                                    <select
                                        type="text"
                                        name="brand"
                                        value={this.state.brand}
                                        onChange={this.handleValue}
                                        style={{margin:"0px 10px 10px 0px"}}
                                        >
                                        <option value="this.state.brand">Brand</option>
                                        {this.ListBrand()}
                                    </select>
                                    <select
                                        type="text"
                                        name="status"
                                        value={this.state.status}
                                        onChange={this.handleValue}
                                        placeholder="Status"
                                        style={{margin:"0px 10px 10px 0px"}}
                                        >
                                        <option value="1">New</option>
                                        <option value="0">Sale</option>
                                    </select>
                                    {this.Sale()}
                                    <input
                                        type="text"
                                        placeholder="Company Profile"
                                        name="company"
                                        value={this.state.company}
                                        onChange={this.handleValue}
                                    />
                                    
                                    <input 
                                        type="file"
                                        id="files" 
                                        name="files"
                                        multiple
                                        onChange={this.handleInputFile}
                                        //multiple: cho phep chon nhieu hinh e luc
                                   />
                                    <textarea
                                        placeholder="Detail of product"
                                        name="detail"
                                        rows={10}
                                        defaultValue={""}
                                        value={this.state.detail}
                                        onChange={this.handleValue}
                                    />
                                    <button type="submit" className="btn btn-default">
                                        Add Products
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                </div>

                
            </div>
        )
    }
}
export default Add