import React from 'react';
import blogService from '../services/blogs';
import {useField} from '../hooks/index'

const BlogForm = ({updateBlogList, setModalMessage }) => {
    //const [title, setTitle] = useState('');
    const title= useField();
    //const [author, setAuthor] = useState('');
    const author=useField();
    //const [blogUrl, setBlogUrl] = useState('');
    const url=useField();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const newBlog = { title:title.input.value, author:author.input.value, url: url.input.value };
            const addedBlog=await blogService.create(newBlog);
            const updatedUserBlogList= await blogService.getAll();
            
            updateBlogList(updatedUserBlogList);
            title.reset();
            author.reset();
            url.reset();
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
                    /*type="text"
                    value={title}
                    name="title"
                    onChange={({ target }) => setTitle(target.value)}*/
                    {...title.input}
                />
            </div>
            <div>
                Author:
        {' '}
                <input
                    /*type="text"
                    value={author}
                    name="author"
                    onChange={({ target }) => setAuthor(target.value)}*/
                    {...author.input}
                />
            </div>
            <div>
                Url:
        {' '}
                <input
                    /*type="text"
                    value={blogUrl}
                    name="url"
                    onChange={({ target }) => setBlogUrl(target.value)}*/
                    {...url.input}
                />
            </div>
            <button type="submit">Create</button>
        </form>);
}

export default BlogForm;