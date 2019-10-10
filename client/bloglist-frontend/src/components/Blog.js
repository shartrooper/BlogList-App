import React from 'react'
const Blog = ({ blog, idx }) => (
  <li>
    {blog.title}{' - '}{blog.author}
  </li>
)

export default Blog