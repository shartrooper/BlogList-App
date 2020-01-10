import React, { useState, useEffect } from 'react';
import BlogList from './components/blogList'
import useResource from './services/hooks/useResource'
import LoginForm from './components/loginForm'
import BlogForm from './components/newBlogForm'
import Notification from './components/Notification'
import Togglable from './components/togglable'

function App() {
  const [blogs, blogService] = useResource('/api/blogs');
  const [user, setUser] = useState(null);
  const [modalMessage, setModalMessage] = useState(null);

  useEffect(() => {
    const getAllblogs = async () => {
      await blogService.getAll();
    }
    getAllblogs();
  }, []);

  useEffect(() => {
    const subscribeUser= async ()=>{
      const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
      if (loggedUserJSON) {
        const currentUser = JSON.parse(loggedUserJSON);
      setUser(currentUser);
      blogService.setToken(currentUser.token);
    }
  }
  subscribeUser();
  }, []);

  const logoutFun = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const setTokenUser=(token)=> blogService.setToken(token);
  const updateBlogList= ()=> blogService.getAll();
  const createBlog= (blog) => blogService.create(blog);
  const updateBlog= async (id,content) =>{
    let error = await blogService.update(id,content);
    
    if(error){ console.log(error.name + ': ' + error.message)}
  }

  const removeBlog= async (id) => blogService.remove(id);

  return (
  <div id='wrapper'>
      {user === null ? (
        <div id="
        login-wrapper">
          <h3>Login to application</h3>
          <Notification message={modalMessage} />
          <LoginForm
            setUser={setUser}
            setModalMessage={setModalMessage}
            setToken={setTokenUser}
          />
        </div>
      ) : <div id="blogs-wrapper" className='blogs-wrapper'>
      <h3>blogs</h3> 
       <Notification message={modalMessage} />
      <p>{user.name} is currently logged in! <button type="button" onClick={logoutFun}>Logout user</button></p>
      <h3>Create new blog</h3>
      <Togglable buttonLabel="New blog">
          <BlogForm  updateBlogList={updateBlogList} createBlog={createBlog} setModalMessage={setModalMessage}/>
      </Togglable>
      <BlogList updateBlogList={updateBlogList} updateBlog={updateBlog} removeBlog={removeBlog} blogs={blogs} user={user} />
      </div>}
    </div>
  );
}

export default App;
