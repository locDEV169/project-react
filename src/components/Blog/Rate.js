import React, { Component } from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import StarRatings from 'react-star-ratings';
import axios from 'axios'
const SucecssStyle = {
    color:'yellow'
}
class Rate extends Component{
    constructor(props){
        super(props)
        this.state = {
            msg: "",
            formErrors:"",
            rating:0,
            numberOfVotes:0,
        }
        this.changeRating = this.changeRating.bind(this)
    }
    
    componentDidMount(){
        const getId = this.props.getId;
        axios.get('http://localhost:8080/laravel/public/api/blog/rate/' + getId)
        .then(res => {
            console.log(res)
            let id = res.data.data;
            console.log(this.state)
            console.log("id " + id)
            console.log("Object.keys(id).length "+ Object.keys(id).length)
            if(Object.keys(id).length > 0){
                let avg = 0;
                let total = 0;
                Object.keys(id).map((value , key) =>{
                    total = total + id[value]['rate'];
                    console.log( id[value]['rate'])
                    console.log(Object.keys(id).length)
                })
                avg = total / Object.keys(id).length;
                console.log(avg)
                this.setState({
                    rating :avg,
                    numberOfVotes: Object.keys(id).length
                })
            }
            else{
                console.log("0")
            }
        })
        .catch(error => console.log(error));
    }

    changeRating( newRating, name ) {
        const isLogin = localStorage.getItem('isLogin')
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
        const getId = this.props.getId;
        let url = "http://localhost:8080/laravel/public/api/blog/rate/"+ getId;
        if(!JSON.parse(isLogin)){
            this.setState({
                msg:"Vui long dang Nhap"
            })
        }
        else{
            this.setState({
                rating: newRating
            });
            const formData = new FormData();
            formData.append("blog_id", getId);
            formData.append("user_id", getData.Auth.id);
            formData.append("rate", newRating);
            axios.post(url, formData, config).then((res) => {
                console.log(res);
                if (res.data.errors) {
                    this.setState({
                        formErrors: res.data.errors,
                    })
                } else {
                    this.setState({
                        msg: res.data.message
                    })
                }
            })
        }
    }
    
    render(){
        console.log(this.state.rating)
        return(
            <div className="rating-area">
                <p style={SucecssStyle}>{this.state.msg}</p>
                <ul className="ratings">
                    <li className="rate-this">Rate this item:</li>
                    <li>
                        <StarRatings
                            rating={this.state.rating}
                            starRatedColor="yellow"
                            changeRating={this.changeRating}
                            numberOfStars={5}
                            size={24}
                            name="rating"
                            isHalf={true}
                            activeColor="#ffd700"
                        />
                    </li>
                    <li className="color">({this.state.numberOfVotes} votes)</li>
                </ul>
                <ul className="tag">
                    <li>TAG:</li>
                    <li>
                        <a className="color" href>
                            Pink <span>/</span>
                        </a>
                    </li>
                    <li>
                        <a className="color" href>
                            T-Shirt <span>/</span>
                        </a>
                    </li>
                    <li>
                        <a className="color" href>
                            Girls
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}
export default Rate