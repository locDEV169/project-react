import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { Link } from 'react-router-dom';

class BlogPost extends Component{
    constructor(props){
        super(props)
        this.state = {
            blog: []
        }
    }
    componentDidMount(){
        axios.get(`http://localhost:8080/laravel/public/api/blog` )
        .then(res => {
            const blog = res.data.blog.data; //goji ddungs dduowfng daax voo Api
            this.setState(
                {blog}//set blog cho state
            );
            console.log({blog})
        })
        .catch(error => console.log(error))
    }
    
    render(){
        let {blog} = this.state;
        console.log("blog " + blog)
        if(blog.length > 0){
            return blog.map((value, key) => {
                return (
                    <div className="single-blog-post">
                        <h3>{value['title']}</h3>
                        <div className="post-meta">
                            <ul>
                                <li><i class="fa fa-user"></i> Mac </li>
                                <li><i className="fa fa-clock-o" /> 2:30pm </li>
                                <li><i className="fa fa-calendar" /> DEC 5,2013 </li>
                            </ul>
                            <span>
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star-half-o" />
                            </span>
                        </div>
                        <a>
                            <img src={"http://localhost:8080/laravel/public/upload/Blog/image/" + value['image']} alt=""/>
                            
                        </a>
                        <p>
                            {value['description']}
                        </p>
                        <Link to = {'/blog/detail/' + value['id']} className="btn btn-primary" >
                            Read Me
                        </Link>
                    </div>
                    
                )
            } 
        )}
        else{
            return  ''
        }
    }
}
export default BlogPost