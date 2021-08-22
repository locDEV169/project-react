import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import FormErrors from '../Error/formErrors';
import { Link } from "react-router-dom";

const SucecssStyle = {
    color:'greenyellow'
}

class Resign extends Component{
    constructor(props){
        super(props)
        this.state = {
                id: '',
                name: '',
                email: '',
                password: '',
                phone:'',
                address: '',
                avatar: '',
                lever: '0',
                file: '',
                formErrors: {},
                isRedirect: false,
                msg: ''
            }
        this.handleUserInputFile = this.handleUserInputFile.bind(this);
        this.handleValue = this.handleValue.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleValue(e){ 
        let nameInput = e.target.name;
        let value = e.target.value;
        this.setState({
            [nameInput]: value,
        })
        // console.log(value)
    }
    
    // handle dùng để up file image for User
    handleUserInputFile(e){
        const file = e.target.files;
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({
                avatar: e.target.result,
                file: file[0]
            })
        }
        reader.readAsDataURL(file[0])
    }

    // POST Requests
    // Submit
    handleSubmit(e){
        e.preventDefault();
        console.log(this.state)
        let check = true; //goi check de bao loi errors
        // xet cai value để đưa vào DB
        //báo lỗi của submit
        let errorSubmit = this.state.formErrors;
        // gọi cái biến từ state
        let { name, email, password, phone, address ,file,country} = this.state;
        this.setState({
            isRedirect: true
        })
        console.log(errorSubmit)
        //xét từ value để báo lỗi 
        if(!name){
            check = false;
            errorSubmit.name = 'Vui Lòng nhập Name';
        }
        else {
            check = true;
            errorSubmit.name = "";
        }
        if(!email){
            check = false;
            errorSubmit.email = 'Vui Lòng nhập Email';
        }
        else {
            check = true;
            errorSubmit.email = "";
        }
        if(!password){
            check = false;
            errorSubmit.password = 'Vui Lòng nhập password';
        }
        else {
            check = true;
            errorSubmit.password = "";
        }
        if(!address){
            check = false;
            errorSubmit.address = 'Vui Lòng nhập address';
        }
        else {
            check = true;
            errorSubmit.address = "";
        }
        if(!phone){
            check = false;
            errorSubmit.phone = 'Vui Lòng nhập phone';
        }
        else {
            check = true;
            errorSubmit.phone = "";
        }
        if(!country){
            check = false;
            errorSubmit.country = 'Vui Lòng nhập Country';
        }
        else {
            check = true;
            errorSubmit.country = "";
        }
        if(file == ''){
            check = false;
            errorSubmit.file = 'Vui Lòng nhập Avatar'
        }
        else{
            if(file.size >  1024 * 1024){
                check = false; 
                errorSubmit.file = 'image < 20MB'
            }
            else{
                // goi type of Image la 'png','jpg','jpeg','PNG','JPG'
                const typeImg = ['png','jpg','jpeg','PNG','JPG'];
                let res = file.name.split('.');
                console.log("typeImg.includes(res[1]) :" + typeImg.includes(res[1]));
                if(!typeImg.includes(res[1])){ // neu xet ko dusng thi tra laji
                    errorSubmit.file = 'Vui long nhap dinh dang';
                }
            }
        }
        if(!check){
            this.setState({
                formErrors: errorSubmit
            });
        }
        else{
            const data ={
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                phone: this.state.phone,
                address: this.state.address,
                level: 0,
                country: this.state.country,
                avatar: this.state.avatar,
            }
            axios.post(`http://localhost:8080/laravel/public/api/register`,
            // this.state
            data           
            )
            .then(res => {
                console.log(res);
                console.log(res.data);
                if(res.data.error){
                    this.setState({
                        formErrors: res.data.errors
                    })
                }
                else{
                    this.setState({
                        msg: 'Success'  // gọi messege trong console
                    })
                    alert("successfull and comeback");
                    
                }
                
            })
            .catch(error => console.log(error)); // bắt lỗi cho get
        } 
        console.log(this.state)
    }
    
    render(){
        
        return(
            <div className="container">
                <div className="row">
                    {/* Menu left */}
                    <div className="col-sm-3 resign-left">
                        <div className="left-sidebar">
                            <h2>Account</h2>
                        </div>
                        <div className="panel-group category-products" id="accordian">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4 className="panel-title">
                                        <a data-toggle="collapse" data-parent="#accordian" href="#account">
                                        <Link to="/account/member" >
                                            Account
                                            <span className="badge pull-right">
                                                <i className="fa fa-plus" />
                                            </span>
                                        </Link>
                                        </a>
                                    </h4>
                                </div>
                                <div id="account" className="panel-collapse collapse">
                                    <div className="panel-body">
                                        <ul>
                                            <li><a href="">account </a></li>
                                            <li><a href="">User</a></li> 
                                        </ul>
                                    </div>
						        </div>
					        </div>
                        </div>
                        <div className="panel-group category-products" id="accordian">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4 className="panel-title">
                                    <Link to="/account/my-product" >
                                        My Product
                                    </Link>
                                    <span className="badge pull-right">
                                    <i className="fa fa-plus" />
								</span>
                                    </h4>
                                </div>
                                <div id="products" className="panel-collapse collapse">
                                    <div className="panel-body">
                                        <ul>
                                            <li><a href="">My products </a></li>
                                            <li><a href="">All</a></li> 
                                        </ul>
                                    </div>
						        </div>
					        </div>
                        </div>
                    </div>
                    {/* Sign Up Form */}
                    
                    <div className="col-sm-6 resign-right" >
                        {/* hàm hiển thị lỗi */}
                        <FormErrors formErrors={this.state.formErrors}/>
                        <div className="signup-form">
                            <h2>New User Signup!</h2>
                            <p style={SucecssStyle}> {this.state.msg} </p>
                            <form method="post" onSubmit={this.handleSubmit} encType="multipart/form-data">
                                <input type="text" placeholder="Name" id="name" name="name"  
                                    onChange={this.handleValue}
                                    value={this.state.name}    
                                    />
                                <input type="email" placeholder="Email Address" id="email"  name="email" 
                                    onChange={this.handleValue}
                                    value={this.state.email}
                                    />
                                <input type="password" placeholder="Password" id="password" name="password" 
                                    onChange={this.handleValue}
                                    value={this.state.password}
                                    />
                                <input type="text" placeholder="Address" id="address" name="address" 
                                    onChange={this.handleValue}
                                    value={this.state.address}
                                    />
                                <input type="text" placeholder="Country" id="country" name="country" 
                                    onChange={this.handleValue}
                                    value={this.state.country}
                                    />
                                <input type="text" placeholder="+2 95 01 88 821" id="phone" name="phone" 
                                    onChange={this.handleValue}
                                    value={this.state.phone}
                                    />
                                <div>
                                    {/* <input type="file" onChange={this.onFileChange} onClick={this.onFileUpload} name="selectedFile"/> */}
                                    <input type="file" onChange={this.handleUserInputFile}  name="avatar"
                                        // value={this.state.file}
                                    />
                                </div>
                                <button type="submit" class="btn btn-default">Signup</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Resign