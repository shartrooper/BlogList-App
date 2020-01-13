import React, { useState, useEffect } from 'react';
import BlogList from './components/blogList'
import useResource from './services/hooks/useResource'
import LoginForm from './components/loginForm'
import BlogForm from './components/newBlogForm'
import Notification from './components/Notification'
import Togglable from './components/togglable'
import loginService from './services/login';

function App() {
  const [blogs, blogService] = useResource('/api/blogs');
  const [user, setUser] = useState(null);
  const [modalMessage, setModalMessage] = useState(null);

  useEffect(() => {
   const getBlogsfromResource=  async ()=> {   
      try{
        const data=await blogService.getAll();
        blogService.setResources(data);
      }
      catch(error){
        console.log(error);
      }
  }
    getBlogsfromResource();
  }, []);

  useEffect(() => {  
      const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
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

  const setTokenUser=(token)=> blogService.setToken(token);

  const createBlog= async (blog) =>{
    try{
      let createdBlog=await blogService.create(blog);
      createdBlog={...createdBlog, user: user};
      blogService.setResources([...blogs,createdBlog]);
    }
    catch(error){
      console.log(error)
    }    
  }

  const updateBlog= async (id,content) =>{
    try{
      let updatedBlog= await blogService.update(id,content);
      updatedBlog={...updatedBlog, user: user};
      blogService.setResources(blogs.map((blog) => blog.id !== id ? blog : updatedBlog));
    }
    catch(error){ 
      console.log(error.name + ': ' + error.message)
    }
  }

  const removeBlog= async (id) =>{ 
    try{
      await blogService.remove(id);
      blogService.setResources(blogs.filter((blog)=> blog.id !== id))
    }
    catch(error){
      console.log(error);
    }
  };

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
          <BlogForm   createBlog={createBlog} setModalMessage={setModalMessage}/>
      </Togglable>
      <BlogList  updateBlog={updateBlog} removeBlog={removeBlog} blogs={blogs} user={user} />
      </div>}
    </div>
  );
}

export default App;
