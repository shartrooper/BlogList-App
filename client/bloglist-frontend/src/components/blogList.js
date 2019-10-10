import React from 'react';
import Blog from './Blog'

const BlogList = ({ blogs,user }) => {

    const blogFilter=() =>
  {
    const filteredList= blogs.filter((blog) => blog.user.name === user.name);
    return filteredList.map((blog,index)=><Blog key={`${blog.user.name}${index}`} blog={blog} />)
  } 
    return (
        <ul id="blog-list">
            {blogFilter()}
        </ul>
    );
}

export default BlogList;