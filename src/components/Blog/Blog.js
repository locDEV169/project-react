import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Pagination from '../Layout/Pagination';
import BlogPost from './BlogPost';
import MenuLeft from '../Layout/MenuLeft_Blog';

class Blog extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <MenuLeft />
                    </div>
                    <div className="col-sm-9">
                        <div className="blog-post-area">
                            <h2 className="title text-center">Latest From our Blog</h2>
                            <BlogPost />
                            <Pagination />
                        </div> 
                    </div>
                </div>
            </div>
            
        )
    }
}
export default Blog