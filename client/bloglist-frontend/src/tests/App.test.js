import React from 'react'
import { render, waitForElement } from '@testing-library/react'

import App from '../App'

jest.mock('../services/blogs')

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Login to application')
    )

    //set CI=true&&npm test -- --coverage
    // expectations here
    const loginForm = component.container.querySelector('login-form')
    expect(loginForm).toBeDefined()

    const notBlogs = component.container.querySelector('blogs-wrapper')
    expect(notBlogs).toBeNull()
  })

  test(' If user is logged in, the blog posts are rendered to the page', async () => {

    const user = {
      username: 'mluukkai',
      token: '1231231214',
      name: 'Matti Luukkainen'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.blog-list')
    )

    const notes = component.container.querySelectorAll('.blog');
    expect(notes.length).toBe(3);

    expect(component.container).toHaveTextContent(
      'Pools of Radiance',
    );
    expect(component.container).toHaveTextContent(
      'Marianas blog',
    );
    expect(component.container).toHaveTextContent(
      'Cancerous blog',
    );
  })
})