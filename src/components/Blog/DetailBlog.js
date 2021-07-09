import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Component } from 'react';
import MenuLeft from '../Layout/MenuLeft_Blog';

class DetailBlog extends Component{
    constructor(props){
        super(props)
        this.state = {
            detail: []
        }
    }
    componentDidMount(){
        axios.get(`http://localhost:8080/laravel/public/api/blog/detail/` + this.props.match.params.id )
        .then(res => {
            const detail = res.data.data; //goji ddungs dduowfng daax voo Api
            // const comment= res.data.data.comment;
            this.setState({
                detail: res.data.data,
                comment: res.data.data.comment
            });
            console.log({detail})
        })
        .catch(error => console.log(error))
    }
    render(){
        let {detail} = this.state;
        
        // lấy giữ liệu id từ path
        const { id } = this.props.match.params.id 
        console.log("id from path "+this.props.match.params.id)
        console.log("detail " + detail)
        //lấy giá trị 1 chiều        
        if(Object.keys(detail).length > 0){
                console.log("detail.length " + detail.length)
                console.log("image" + detail['image'])
               return(
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-3">
                                <MenuLeft />
                            </div>
                            <div className="col-sm-9">
                                <div className="blog-post-area">
                                <h2 className="title text-center">Latest From our Blog</h2>
                                        <div className="single-blog-post">
                                            <h3>{detail['title']}</h3>
                                        </div>
                                        <div class="post-meta">
                                                <ul>
                                                    <li><i class="fa fa-user"></i> Mac Doe</li>
                                                    <li><i class="fa fa-clock-o"></i> 1:33 pm</li>
                                                    <li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
                                                </ul>
                                        </div>
                                    <a>
                                        <img src={"http://localhost:8080/laravel/public/upload/Blog/image/" + detail['image']} alt=""/>
                                    </a>
                                    <p>
                                        {detail['description']}
                                    </p>
                                    <p>
                                        {detail['content']}
                                    </p>

                                    <div class="pager-area">
                                        <ul class="pager pull-right">
                                            <li><a href="#">Pre</a></li>
                                            <li><a href="#">Next</a></li>
                                        </ul>		
                                    </div>
                                    {/* <!--/rating-area-->  */}
                                    <div class="rating-area">
                                        <ul class="ratings">
                                            <li class="rate-this">Rate this item:</li>
                                            <li>
                                                <i class="fa fa-star color"></i>
                                                <i class="fa fa-star color"></i>
                                                <i class="fa fa-star color"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                            </li>
                                            <li class="color">(6 votes)</li>
                                        </ul>
                                        <ul class="tag">
                                            <li>TAG:</li>
                                            <li><a class="color" href="">Pink <span>/</span></a></li>
                                            <li><a class="color" href="">T-Shirt <span>/</span></a></li>
                                            <li><a class="color" href="">Girls</a></li>
                                        </ul>
                                    </div>
                                    <div class="socials-share">
                                        <a href=""><img src="http://localhost:8080/laravel/public/frontend/images/blog/socials.png" alt="" /></a>
                                    </div>   
                                </div>
                            </div>
                        </div>
                    </div>
                   
               )
        }
        else{
            return ''
        }
        
    }
}
export default DetailBlog