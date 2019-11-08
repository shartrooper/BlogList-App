import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM} from '@testing-library/dom'
import SimpleBlog from '../components/Simpleblog';

test('renders content', () => {
    const blog = {
        title: 'Tester Blogs',
        author: 'Marko Antonio',
        likes: 5
    };

    const component = render(
        <SimpleBlog blog={blog} />,
    );

    //component.debug() shows all the element
    const div = component.container.querySelector('.display-blog')
    console.log(prettyDOM(div))

    const element = component.getByText(
        'Tester Blogs Marko Antonio'
    );
    expect(element).toBeDefined();

    expect(component.container).toHaveTextContent(
    'blog has 5 likes'
  );

});

test('clicking twice the button calls event handler twice', () => {
  const blog = {
        title: 'Tester Blogs',
        author: 'Marko Antonio',
        likes: 5
    };

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler}/>
  )

  const button = getByText('like')

  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})