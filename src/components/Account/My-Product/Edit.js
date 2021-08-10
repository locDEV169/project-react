import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import MenuLeft_Account from "../../Layout/MenuLeft_Account";
import FormErrors from '../../Error/formErrors';
import axios from "axios";
const SucecssStyle = {
    color:'greenyellow'
}

class Edit extends Component{
    constructor(props){
        super(props)
        this.state = {
            message:"",
            id:"",
            category:'',
            brand: '',
            name: '',
            price: '',
            status: 1,
            sale: '',
            detail:'',
            company:'',
            msg: '',
            files:'',
            categoryArray:{},
            brandArray:{},
            formErrors: {},
            //imageArray
            imageArray:{},
            // check Box of image muốn xóa
            avatarCheckBox:[],
            //hình còn lại sau khi xóa
            hinhConLai: "",
        }
        this.handleValue = this.handleValue.bind(this)
        this.ListCategory = this.ListCategory.bind(this)
        this.ListBrand = this.ListBrand.bind(this)
        this.Sale = this.Sale.bind(this)
        this.handleEditProduct = this.handleEditProduct.bind(this)
        this.listImages = this.listImages.bind(this)
        this.clickCheckbox = this.clickCheckbox.bind(this)
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
    ListCategory(){
        const categoryArray = this.state.categoryArray;
        // console.log(categoryArray)
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
        const {brandArray} = this.state;
        // console.log(brandArray)
        if(brandArray.length >0) {
            return brandArray.map((value, key)=>{
            // console.log(value['brand'])
                return (
                    <option value={value['id']}>{value['brand']}</option>
                )
            })
          }
    }
    Sale() {
        const {status} = this.state;
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
    listImages(e){
        let {id} = this.state;
        const {imageArray} = this.state;
        console.log(Object.keys(this.state.imageArray).length)
        if(Object.keys(this.state.imageArray).length > 0){
            return imageArray.map((value,key)=>{
                // console.log(imageArray[key])
                // const covertImages = JSON.parse(imageArray[key])
                return(
                    <li style={{display:"inline-block", margin:"10px 20px"}} key={value}>
                        <img  style={{width:"70px",height:""}} src={"http://localhost:8080/laravel/public/upload/user/product/" +id +  "/" + value}/>
                        <input type= "checkbox"  value={value} className="check-img" onChange={this.clickCheckbox}/>
                    </li>
                )

            })
        }
    }
    componentDidMount() {
        // get tên của category and brand
        axios.get("http://localhost:8080/laravel/public/api/category-brand")
          .then((res) => {
            // console.log(res);
            this.setState({
                categoryArray: res.data.category,
                brandArray: res.data.brand,
            });    
        });
        //get id praram để lấy id của product
        const getId = this.props.match.params.id;
        console.log(getId)
        //get url của api 
        let urlProduct ="http://localhost:8080/laravel/public/api/user/product/" + getId;
        // get token vì đây phải login
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
        // get data từ Api
        axios.get(urlProduct,config)
            .then((res)=>{
                console.log(res)
                if(res.data.errors){
                    this.setState({
                        formError : res.data.errors
                    })
                }
                else{
                    this.setState ({
                        name : res.data.data.name,
                        id :res.data.data.id_user,
                        brand : res.data.data.id_brand,
                        category : res.data.data.id_category,
                        price : res.data.data.price,
                        imageArray : res.data.data.image,
                        status : res.data.data.status,
                        company : res.data.data.company_profile,
                        detail : res.data.data.detail,
                        sale : res.data.data.sale,
                        hinhConLai: res.data.data.image
                    })
                    console.log(res.data.data.image)
                }
            })
            .catch(errors => console.log(errors));
        console.log(this.state)
    }
    clickCheckbox(e){
        let checked = e.target.checked;
        let nameImages = e.target.value;
        let {avatarCheckBox,imageArray} = this.state;
        console.log(nameImages)
        if(checked){
            avatarCheckBox.push({nameImages})
            this.setState({
                avatarCheckBox: avatarCheckBox
            })
            // avatarCheckBox.map((value,key) =>{
            //     hinhConlai.map((item,index) =>{
            //    
            //     })
            //     console.log(value)
            //     var item = hinhConLai.indexOf(value)
            //     if(item == -1){
            //         hinhConLai.splice(hinhConLai.indexOf(value),1)
            //         console.log("33333")
            //     }
            //     else{
            //         console.log("4444")
            //     }
            // })
        }
        else{
            //prototype indexOf của Array dùng để Tìm chỉ mục của một mục trong Mảng
            // tìm item có tên nameImages để xóa
            let itemImages = avatarCheckBox.indexOf(nameImages);
            console.log(itemImages)
            //prototype splice của Array dùng để Xóa một mục theo vị trí chỉ mục
            // xóa đúng với item có trong avatarCheckBox[]
            avatarCheckBox.splice(itemImages,1);
        }
        console.log(this.state.avatarCheckBox)
        // console.log(this.state.imageArray)
        // console.log(this.state.hinhConLai)
    }
    handleEditProduct(e){
        e.preventDefault();
        let check = true;
        console.log(this.state);
        let { category, brand, name, price,detail,company,files,avatarCheckBox,hinhConLai,imageArray} = this.state;
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
        if(detail == ""){
            check = false;
            errorsSubmit.detail = "Vui lòng chọn detail của sản phẩm"
        }
        else{
            check = true
            errorsSubmit.detail = ""
        }
        if(files == ''){
            check = false;
            errorsSubmit.files = 'Vui lòng chọn images của sản phẩm'
        }
        else{
            // quét map cho avatarCheckBox để lấy ra tên Image
            avatarCheckBox.map((value,key) =>{
                console.log(value)
                //tìm tên ảnh có trong Array hình còn lại hay không
                var item = hinhConLai.indexOf(value)
                //nếu có thì có thì xóa khỏi Array hình còn lại
                if(item == -1){
                    hinhConLai.splice(hinhConLai.indexOf(value),1)
                    console.log("33333")
                }
                else{
                    console.log("4444")
                }
            })
            if(Object.keys(files).length + hinhConLai.length > 3 ){
                check = false;
                errorsSubmit.files = 'khoong quas 3 image'
           }
           else{
               Object.keys(files).map((key,index)=>{
                //    console.log("files[key][size] : " + files[key]["size"]);
                //    console.log("files[key][name].split(.): "+files[key]["name"].split("."))
                   if(files[key]["size"] > 20 * 1024 * 1024 ){
                       check = false;
                       errorsSubmit.files = 'images < 20MB'
                        //console.log("1")
                   }
                   else{
                        // console.log("0")
                        const typeImg = ["png", "jpg", "jpeg", "PNG", "JPG"]
                        let res = files[key]["name"].split(".")
                        if (!typeImg.includes(res[1])) {
                            errorsSubmit.files = "vui lòng upload đúng định dạng images";
                        }
                        else{
                            check = true;
                            errorsSubmit.files = ''
                            // console.log("else upload ")
                        }
                   }
               })
               
           }
        }
        
        if(!check){
            this.setState({
                formErrors : errorsSubmit
            })
        }
        else{
            const getId = this.props.match.params.id;
            const convertInfo = JSON.parse(localStorage.getItem("info"))
            let url="http://localhost:8080/laravel/public/api/user/edit-product/" + getId
            const accessToken = convertInfo.success.token;
            let config = {
              headers: {
                Authorization: "Bearer " + accessToken,
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
              },
            };
            let formData = new FormData();
            formData.append("name", this.state.name);
            formData.append("category", this.state.category);
            formData.append("brand", this.state.brand);
            formData.append("price", this.state.price);
            formData.append("detail", this.state.detail);
            formData.append("company", this.state.company);
            formData.append("status", this.state.status);
            formData.append("sale", 0);
            Object.keys(files).map((value,index)=>{
                formData.append("file[]",files[value])
            })
            Object.keys(hinhConLai).map((value,key)=>{
                formData.append('hinhConLai[]',hinhConLai[value])
            })
            avatarCheckBox.map((value,key)=>{
                formData.append('avatarCheckBox[]',value)
            })
            console.log(this.state.hinhConLai)
            // console of FormData
            for (var pair of formData.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }
            axios.post(url,formData,config)
                .then((res)=>{
                    console.log(res)
                    if(res.data.errors){
                        this.setState({
                            formErrors : res.data.errors
                        })
                    }
                    else{
                        this.setState({
                            msg : "Edit thành Công",
                            message: res.data.message,
                        })
                    }
                })
                .catch((error) => console.log(error));
            console.log(this.state)
        }
    }
    render(){
        return(
            <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <MenuLeft_Account />
                        </div>
                        <div className="col-sm-5">         
                            <div className="login-form">
                                <h2>Edit Product</h2>
                                <FormErrors formErrors={this.state.formErrors} />
                                <p style={SucecssStyle}> {this.state.msg} </p>
                                <p style={{color:"red"}}> {this.state.message} </p>
                                <form onSubmit={this.handleEditProduct} enctype="multipart/form-data">
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
                                        <option value="">Category</option>
                                        {this.ListCategory()}
                                    </select>
                                        
                                    <select
                                        type="text"
                                        name="brand"
                                        value={this.state.brand}
                                        onChange={this.handleValue}
                                        style={{margin:"0px 10px 10px 0px"}}
                                    >
                                        <option value="">Brand</option>
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
                                    <div>
                                        <h4 style={{fontSize:"14px",fontStyle:"italic",color:"red"}}>*Choose image you want to delete</h4>
                                        <ul>
                                            {this.listImages()}
                                        </ul>
                                    </div>
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
        )
    }
}
export default Edit