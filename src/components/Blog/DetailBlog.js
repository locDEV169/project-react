import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { Component } from 'react';
import MenuLeft from '../Layout/MenuLeft_Blog';
import Comment from '../Blog/Comment';
import ListComment from '../Blog/ListComment';
import { withRouter } from 'react-router-dom';

class DetailBlog extends Component{
    constructor(props){
        super(props)
        this.state = {
            detail: [],
            comment: [],
            idReply: "",
        }
        this.renderDetail = this.renderDetail.bind(this)
        this.getComment = this.getComment.bind(this)
        //id of comment
        this.idSubComment = this.idSubComment.bind(this)
        //id of reply cmt
        this.reply = this.reply.bind(this)
    }
    componentDidMount(){
        // get Id of param
        const getId = this.props.match.params.id;
        axios.get(`http://localhost:8080/laravel/public/api/blog/detail/` + getId )
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
    renderDetail(){
            let { detail } = this.state;
            if (Object.keys(detail).length > 0) {
            // console.log(detail['image'])
            return (
                <div className="blog-post-area">
                    <h2 className="title text-center">Latest From our Blog</h2>
                    <div className="single-blog-post">
                        <h3>{detail["title"]}</h3>
                        <div className="post-meta">
                            <ul>
                                <li>
                                    <i className="fa fa-user" /> Mac Doe
                                </li>
                                <li>
                                    <i className="fa fa-clock-o" /> 1:33 pm
                                </li>
                                <li>
                                    <i className="fa fa-calendar" /> DEC 5, 2013
                                </li>
                            </ul>
                            <span>
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star-half-o" />
                            </span>
                        </div>
                        <a href>
                            <img
                                src={
                                "http://localhost:8080/laravel/public/upload/Blog/image/" + detail["image"]}
                                alt="" />
                        </a>
                        <p>{detail["description"]}</p>
                        <div className="pager-area">
                            <ul className="pager pull-right">
                                <li>
                                    <a href="#">Pre</a>
                                </li>
                                <li>
                                    <a href="#">Next</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }
    }
    getComment(x) {
        console.log("getComment(x) x: " + x);
        this.setState({
          comment: this.state.comment.concat(x),
        });
    }
    reply(e) {
        let idSubComment = e.target.id;
        this.props.idSubComment(idSubComment);
        // console.log(idSubComment);
    }
    idSubComment(y){
        this.setState({
            idReply: y,
        })
    }
    
    render(){
        let {detail} = this.state;
        console.log("detail " + detail)
        //lấy giá trị 1 chiều        
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-9">
                        <div className="blog-post-area">
                            {this.renderDetail()}
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
                            {/* social network */}
                            <div class="socials-share">
                                <a href=""><img src="http://localhost:8080/laravel/public/frontend/images/blog/socials.png" alt="" /></a>
                            </div>
                            <ListComment
                                getId={this.props.match.params.id}
                                comment={this.state.comment}
                                idSubComment={this.idSubComment}
                            />
                            {/* get Comment */}
                            <Comment 
                                getId = {this.props.match.params.id}
                                getComment = {this.getComment}
                                idSubComment= {this.idSubComment}
                            />
                        </div>
                    </div>
                </div>
            </div>
           
       )
        
    }
}
export default withRouter(DetailBlog)