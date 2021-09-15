import React, { useEffect, useState } from 'react';
import Pagination from '../Layout/Pagination';
import RenderBlog from './renderBlog';

function BlogHook(props) {
    const [blogList, setBlogList] = useState([])

    useEffect(() => {
        async function fetchBlogList() {
            try {
                const requestUrl = 'http://localhost:8080/laravel/public/api/blog';
                const response = await fetch(requestUrl);
                const responseJSON = await response.json();
                console.log({ responseJSON })

                const dataBlog = responseJSON.blog.data;
                //console.log(dataBlog)
                setBlogList(dataBlog)
            } catch (error) {
                console.log("failed to fetch post List" , error.message)
            }
        }

        fetchBlogList();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9">
                    <div className="blog-post-area">
                        <h2 className="title text-center">Latest From our Blog</h2>
                        <RenderBlog blogs={blogList} />
                        <Pagination />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BlogHook