import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { prettyDOM, fireEvent} from '@testing-library/dom'
import Blog from '../components/Blog';

const blog = {
    title: 'Tester Blogs',
    author: 'Marko Antonio',
    likes: 5,
    user: { name: 'Miles Tails Prower' }
};

describe('<Blog />', () => {
    let component

    beforeEach(() => {
        component = render(
            <Blog blog={blog} user={blog.user.name} />
        )
    })

    test('at start only the visible children are displayed', () => {
        const p = component.getByText('Tester Blogs - Marko Antonio');
        const div = component.container.querySelector('.hidden-wrapper');

        //component.debug() shows all the element
        console.log(prettyDOM(p))

        expect(p).toBeDefined();
        expect(div).toHaveStyle('display: none');
    })

    test("when the blog post is clicked, additional info becomes visible", () => {
       const p = component.getByText('Tester Blogs - Marko Antonio');
       const div = component.container.querySelector('.hidden-wrapper');
       fireEvent.click(p);
       expect(div).not.toHaveStyle('display: none')
    })

})