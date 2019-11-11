import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs,user,updateBlogList }) => {

    const blogFilter=() =>
  {
    const filteredList= blogs.filter((blog) => blog.user.name === user.name);
    filteredList.sort((a,b)=> b.likes-a.likes);
    return filteredList.map((blog,index)=><Blog key={`${blog.user.name}${index}`} blog={blog} user={user} updateBlogList={updateBlogList} />)
  } 
    return (
        <ul className="blog-list">
            {blogFilter()}
        </ul>
    );
}

export default BlogList;