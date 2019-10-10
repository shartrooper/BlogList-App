import React, { useState, useEffect } from 'react';
import BlogList from './components/blogList'
import blogService from './services/blogs'
import LoginForm from './components/loginForm'
import BlogForm from './components/newBlogForm'
import Notification from './components/Notification'

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [modalMessage, setModalMessage] = useState(null);

  useEffect(() => {
    const getAllblogs = async () => {
      const gotAllblogs = await blogService.getAll();
      setBlogs(gotAllblogs);
    }
    getAllblogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON);
      setUser(currentUser);
      blogService.setToken(currentUser.token);
    }
  }, []);

  const logoutFun = () => {
    window.localStorage.clear();
    setUser(null);
  };
  
  const updateBlogList= (newBlogList)=>
  {
    setBlogs(newBlogList);
  }

  return (
    <div id='wrapper'>
      {user === null ? (
        <div id="login-wrapper">
          <h3>Login to application</h3>
          <Notification message={modalMessage} />
          <LoginForm
            setUser={setUser}
            setModalMessage={setModalMessage}
          />
        </div>
      ) : <div id="blogs-wrapper">
      <h3>blogs</h3> 
       <Notification message={modalMessage} />
      <p>{user.name} is currently logged in! <button type="button" onClick={logoutFun}>Logout user</button></p>
      <h3>Create new blog</h3>
      <BlogForm  updateBlogList={updateBlogList} setModalMessage={setModalMessage}/>
      <BlogList blogs={blogs} user={user} />
      </div>}
    </div>
  );
}

export default App;
