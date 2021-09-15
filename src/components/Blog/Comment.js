import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { Component } from 'react';
import FormErrors from '../Error/formErrors';
import { withRouter } from 'react-router-dom';

const SucecssStyle = {
    color: 'greenyellow'
}

class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: "",
            message: "",
            formErrors: {},
        }
        this.submitForm = this.submitForm.bind(this)
        this.handleValue = this.handleValue.bind(this)
    }
    handleValue(e) {
        let nameInput = e.target.name;
        let value = e.target.value;
        this.setState({
            message: value
        })
        // console.log("e.target.value " + value)
        // console.log("name" + nameInput)
    }

    submitForm(e) {
        e.preventDefault();
        let flag = true;
        let { message } = this.state;
        let errorSubmit = this.state.formErrors;
        // lấy login ra JSON.parse(isLogin)
        const isLogin = localStorage.getItem('isLogin');
        if (!JSON.parse(isLogin)) {
            this.setState({
                msg: "Vui long dang Nhap"
            })
            errorSubmit.msg = 'vui long login'
            this.props.history.push('/login');
        }
        else {
            // console.log("message :" + message)
            if (message != '') {
                // get id of blog
                const getId_Blog = this.props.getId;
                let url = "http://localhost:8080/laravel/public/api/blog/comment/" + getId_Blog;
                // get token of user Login
                // get data của user Login từ Local Storage
                const userData = localStorage.getItem('info')
                let getData = JSON.parse(userData);
                let accessToken = getData.success.token;
                let config = {
                    headers: {
                        Authorization: "Bearer " + accessToken,
                        "Content-Type": "application/x-www-form-urlencoded",
                        Accept: "application/json",
                    },
                };
                //truyền dữ liệu vào form gửi cho Api
                const formData = new FormData();
                formData.append("id_blog", getId_Blog);
                formData.append("id_user", getData.Auth.id);
                formData.append("id_comment", 0);
                formData.append("comment", this.state.message);
                formData.append("image_user", getData.Auth.avatar);
                formData.append("name_user", getData.Auth.name);
                axios.post(url, formData, config)
                    .then(res => {
                        // console.log(res)
                        if (res.data.errors) {
                            this.setState({
                                formErrors: res.data.errors,
                            });
                            console.log("1")
                        } else {
                            // console.log(res)
                            this.props.getComment(res.data.data);
                            this.setState({
                                msg: "comment success"
                            });
                            console.log("2")
                        }
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
            }
            else {
                // errorSubmit.message ='Vui long nhap binh luan'
                this.setState({
                    msg: "Vui lòng nhập comment"
                })
            }

        }
    }
    render() {
        return (
            <div className="replay-box">
                <div className="row">
                    <div className="col-sm-12">
                        {/* <p>{this.state.message} </p> */}
                        <h2>Leave a replay</h2>
                        <div className="text-area">
                            <h3 style={SucecssStyle}>{this.state.msg} </h3>
                            <FormErrors formErrors={this.state.formErrors} />
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