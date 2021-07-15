import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { Component } from 'react';
import MenuLeft from '../Layout/MenuLeft_Blog';
import FormErrors from '../Error/formErrors';
import { withRouter } from 'react-router-dom';

class Comment extends Component {
    constructor(props){
        super(props)
        this.state = {
            msg: "",
            message: "",
            formErrors:{},
        }
        this.submitForm = this.submitForm.bind(this)
        this.handleValue = this.handleValue.bind(this)
    }
    handleValue(e) {
        let nameInput = e.target.name;
        let value = e.target.value;
        this.setState({
          [nameInput]: value,
        })
    }
    
    submitForm(e){
        e.preventDefault();
        let flag = true;
        let {message} = this.state;
        // let {comment} = this.state;
        let errorSubmit = this.state.formErrors;
        console.log("this.state.message : " + message)
        // lấy login ra JSON.parse(isLogin)
        const isLogin = localStorage.getItem('isLogin');
        console.log("islogin " + isLogin)
        // get data của user Login từ Local Storage
        const userData = localStorage.getItem('info')
        let getData = JSON.parse(userData);
        // get id of blog
        const getId_Blog = this.props.getId;
        console.log("getId of blog" + getId_Blog)
        let url = "http://localhost:8080/laravel/public/api/blog/comment/" + getId_Blog;
                // get token of user Login
        let accessToken = getData.success.token;
        let config = {
                    headers: {
                    Authorization: "Bearer " + accessToken,
                    "Content-Type": "application/x-www-form-urlencoded",
                    Accept: "application/json",
                },
        };
        console.log("config " + config)
        if(!JSON.parse(isLogin)){
            this.setState({
                msg:"Vui long dang Nhap"
            })
            errorSubmit.msg = 'vui long login'
            this.props.history.push('/login');
        }
        else{
            // if(message == ''){
            //     flag = false;
            //     errorSubmit.message = 'Vui long nhap binh luan'
            // }
            // else{
            //     flag = true;
            //     errorSubmit.message = ''
            // }
            // if(!flag){
            //     this.setState({
            //         formErrors : errorSubmit           
            //     })  
            // }
            // else{
            //     // get data của user Login từ Local Storage
            //     const userData = localStorage.getItem('info')
            //     let getData = JSON.parse(userData);
            //     // get id of blog
            //     const getId_Blog = this.props.getId;
            //     console.log("getId of blog" + getId_Blog)
            //     //link của Api
            //     let url = "http://localhost:8080/laravel/public/api/blog/comment/" + getId_Blog;
            //     // get token of user Login
            //     let accessToken = getData.success.token;
            //     let config = {
            //         headers: {
            //           Authorization: "Bearer " + accessToken,
            //           "Content-Type": "application/x-www-form-urlencoded",
            //           Accept: "application/json",
            //         },
            //     };
            //     //truyền dữ liệu vào form gửi cho Api
            //     const formData = new FormData();
            //     formData.append("id_blog", getId_Blog);
            //     formData.append("id_user", getData.Auth.id);
            //     formData.append("id_comment",this.props.idSubComment ? this.props.idSubComment : 0);
            //     formData.append("comment", this.state.message);
            //     formData.append("image_user", getData.Auth.avatar);
            //     formData.append("name_user", getData.Auth.name);
            //     axios.post(url,formData,config)
            //     .then(res =>{
            //         console.log(res)
            //         if (res.data.errors) {
            //           this.setState({
            //             formErrors: res.data.errors,
            //           });
            //         } else {
            //             this.props.getComment(res.data.data);
            //             this.setState({
            //                 message: "comment thanh cong"
            //             });
            //         }
            //     })
            //     .catch(error => {
            //         console.log(error.message);
            //     })
            // }
            //test #2
            // get data của user Login từ Local Storage
            if(!message){
                //truyền dữ liệu vào form gửi cho Api
                const formData = new FormData();
                formData.append("id_blog", getId_Blog);
                formData.append("id_user", getData.Auth.id);
                formData.append("id_comment",this.props.idSubComment ? this.props.idSubComment : 0);
                formData.append("comment", this.state.message);
                formData.append("image_user", getData.Auth.avatar);
                formData.append("name_user", getData.Auth.name);
                axios.post(url,formData,config)
                .then(res =>{
                    console.log(res)
                    if (res.data.errors) {
                      this.setState({
                        formErrors: res.data.errors,
                      });
                    } else {
                        this.props.getComment(res.data.data);
                        this.setState({
                            message: "comment thanh cong",
                            msg: "cmt success"
                        });
                    }
                })
                .catch(error => {
                    console.log(error.message);
                })
            }
            else{
                errorSubmit.message = 'Vui long nhap binh luan'
                this.setState={
                    msg : "Vui long nhap binh luan"
                }
            }         
        }
    }
    render(){
        return(
            <div className="replay-box">
                <div className="row">
                    <div className="col-sm-12">
                        <p>{this.state.message} </p>
                        <h2>Leave a replay</h2>
                        <div className="text-area">
                            <h3>{this.state.msg} </h3> 
                            <FormErrors formErrors={this.state.formErrors}/>
                            <form onSubmit={this.submitForm}>
                                <div className="blank-arrow">
                                    <label>Your Name</label>
                                </div>
                                <span>*</span>
                                <textarea name="message" rows={10} defaultValue={""} 
                                value={this.state.value} onChange={this.handleValue} />
                                <button className="btn btn-primary" >post comment</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Comment)