import React, { Component } from 'react';
import { withRouter } from "react-router";
import ReactDOM from 'react-dom';
import FormErrors from '../Error/formErrors';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';

const SucecssStyle = {
    color: 'greenyellow'
}

class Login extends Component {
    //call AppContext api 
    static contextType = AppContext;

    constructor(props) {
        super(props)
        this.state = {
            formErrors: {},
            password: "",
            email: "",
            msg: '',
            level: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleChangeEmail = this.handleChangeEmail.bind(this)
        // this.handleChangePass = this.handleChangePass.bind(this)
        this.handleValue = this.handleValue.bind(this);
    }

    handleValue(e) {
        let nameInput = e.target.name;
        let value = e.target.value;
        this.setState({
            [nameInput]: value,
        })
        // console.log(value)
    }
    // handleChangeEmail(e){
    //     this.setState({
    //             email: e.target.value
    //         })
    // }
    // handleChangePass(e){
    //     this.setState({
    //             password: e.target.value
    //         })
    // }
    handleSubmit(e) {
        e.preventDefault();
        let check = true; //goi check de bao loi errors
        //truyền check cho context
        this.context.loginContext(check)
        //báo lỗi của submit
        let errorSubmit = this.state.formErrors;
        // let email = this.state.email;
        // let password = this.state.password;
        let { email, password } = this.state;

        if (email == '') {
            check = false;
            errorSubmit.email = 'Vui Long nhap Email';
        }
        if (!password) {
            check = false;
            errorSubmit.password = 'Vui Long nhap password';
        }
        if (!check) {
            this.setState({
                formErrors: errorSubmit
            });
        }
        else {
            console.log("check of login.js", check)
            const data = {
                email: this.state.email,
                password: this.state.password,
                level: 0,
            }
            axios.post(`http://localhost:8080/laravel/public/api/login`,
                // this.state
                data
            )
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    if (res.data.errors) {
                        this.setState({
                            formErrors: res.data.errors,
                        })

                    }
                    else {
                        // login xong
                        // tao bien gi do va dua vao localStorage
                        // lấy mọi thông tin từ local ra bằng biến convert
                        // chuyển dữ liệu thành file json đưa vào local
                        const convert = JSON.stringify(res.data);
                        localStorage.setItem("info", convert);
                        const accessToken = res.data.success.token;
                        localStorage.setItem("token", accessToken)
                        // set cho islogin=true nếu login đúng
                        localStorage.setItem("isLogin", JSON.stringify(check))
                        this.setState({
                            // gọi messege trong console để in ra cho màn hình
                            msg: 'Success',
                        })
                        // alert("successfull and comeback");
                        //nếu đăng nhập đúng thì trả lại home page
                        this.props.history.push('/login');
                    }
                })
                .catch(error => console.log(error));
        }
    }

    render() {
        //console.log("context", this.context.state.value, this.context.loginContext())
        return (
            <div>
                {/* <!--form--> */}
                <div className="container">
                    <div className="row justify-content-center">
                        {/* <!--login form--> */}
                        <div className="col-md-8">
                            <div class="col-sm-7 padding-right">
                                <div class="login-form">
                                    <p style={SucecssStyle}> {this.state.msg} </p>
                                    <h2>Login to your account</h2>
                                    <FormErrors formErrors={this.state.formErrors} />
                                    <form onSubmit={this.handleSubmit}>
                                        <input type="text" placeholder="Email Address"
                                            id="email"
                                            name="email"
                                            onChange={this.handleValue}
                                            value={this.state.email}
                                        />
                                        <input type="password" placeholder="Password"
                                            id="password"
                                            name="password"
                                            onChange={this.handleValue}
                                            value={this.state.password}
                                        />
                                        <spam>
                                            <input type="checkbox" className="checkbox" />
                                            Keep me signed in
                                        </spam>
                                        <button type="submit" className="btn btn-primary">Login</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* Deep Form Login */}
                        {/* <div className="col-sm-9 padding-right">
                                <div className="row justify-content-center">
                                    <div className="col-md-8">
                                        <div className="card">
                                            <div className="card-header">Login Menber</div>
                                            <div className="card-body">
                                                <br></br>
                                                <div className="form-group row">
                                                    <form action="#">
                                                        <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                                        <div className="col-md-6">
                                                            <input type="text" placeholder="Email"
                                                                className="form-control" 
                                                                id="email"  
                                                                name="email"
                                                                onChange={this.handleValue}
                                                                value={this.state.email}
                                                                />
                                                        </div>
                                                        
                                                    </form>
                                                </div>
                                                <div className="form-group row">
                                                    <form action="#">
                                                        <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                                        <div className="col-md-6">
                                                            <input type="password" placeholder="Password"
                                                                className="form-control" 
                                                                id="password" 
                                                                name="password"
                                                                onChange={this.handleValue}
                                                                value={this.state.password}
                                                                />
                                                        </div>  
                                                    </form>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-md-8 offset-md-4">
                                                        <button type="submit" className="btn btn-primary">Login</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Login);