import React, { useState } from 'react';
import blogService from '../services/blogs'

const BlogForm = ({updateBlogList, setModalMessage }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [blogUrl, setBlogUrl] = useState('');

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const newBlog = { title, author, url: blogUrl };
            const addedBlog=await blogService.create(newBlog);
            const updatedUserBlogList= await blogService.getAll();
            
            updateBlogList(updatedUserBlogList);
            setTitle('');
            setAuthor('');
            setBlogUrl('');
            setModalMessage({ message:`A new blog "${addedBlog.title}" by ${addedBlog.author} added`, style: { color: 'green', border: 'green 3px solid', fontSize: 20 } });
            setTimeout(() => {
                setModalMessage(null);
            }, 3500);
        }
        catch (exception) {
            console.log(exception);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                Title:
        {' '}
                <input
                    type="text"
                    value={title}
                    name="title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                Author:
        {' '}
                <input
                    type="text"
                    value={author}
                    name="author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                Url:
        {' '}
                <input
                    type="text"
                    value={blogUrl}
                    name="url"
                    onChange={({ target }) => setBlogUrl(target.value)}
                />
            </div>
            <button type="submit">Create</button>
        </form>);
}

export default BlogForm;