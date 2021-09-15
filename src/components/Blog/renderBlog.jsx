import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

RenderBlog.propTypes = {
    blogs: PropTypes.array,
};

RenderBlog.defaultProps = {
    blogs: [],
};

function RenderBlog(props) {
    const { blogs } = props;

    return (
        <>
            {blogs.map(blog => (
                <div className="single-blog-post">
                    <h3>{blog['title']}</h3>
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
                        <img src={"http://localhost:8080/laravel/public/upload/Blog/image/" + blog['image']} alt="" />

                    </a>
                    <p>
                        {blog['description']}
                    </p>
                    <Link to={'/blog/detail/' + blog['id']} className="btn btn-primary" >
                        Read Me
                    </Link>
                </div>
            ))}
        </>

    );
}
export default RenderBlog;