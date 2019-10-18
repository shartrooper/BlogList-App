import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, updateBlogList }) => {
  const [visible, setVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const showWhenVisible = { display: visible ? '' : 'none' };

  const handleLike = async (e) => {
    try {
      const currentBlog = { title: blog.title, author: blog.author, likes: blog.likes + 1, url: blog.url };
      await blogService.update(blog.id, currentBlog);
      const updatedUserBlogList = await blogService.getAll();
      updateBlogList(updatedUserBlogList);
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleRemove = async (id) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(id);
      const updatedUserBlogList = await blogService.getAll();
      updateBlogList(updatedUserBlogList);
    }
  }

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (<li style={blogStyle} >
    <p onClick={toggleVisibility} style={{ cursor: "pointer" }}>{blog.title}{' - '}{blog.author}</p>
    <div style={showWhenVisible} className="hidden-wrapper">
      <p>Url:<a href={blog.url}>{blog.url}</a></p>
      <p>Likes:{blog.likes} <button type="button" onClick={handleLike}> +like</button></p>
      <p>Added by:{blog.user.name}</p>
      {blog.user.name === user.name ? <button type="button" onClick={() => handleRemove(blog.id)}>remove</button> : null}
    </div>
  </li>);
}

export default Blog