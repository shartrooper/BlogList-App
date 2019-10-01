/* eslint-disable eol-last */
const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');

const api = supertest(app);
const Blog = require('../model/blogs');
const helper = require('./test_helper');


/*
A better option is to use Jest directly without npm.
This way we can specify which are the tests that we want to run with Jest.
The following command only runs the tests found in the tests/note_api.test.js file:

npx jest tests/note_api.test.js --runInBand

The -t option can be used for running tests with a specific name:

npx jest -t 'a specific note is within the returned notes'

The provided parameter can refer to the name of the test or the describe block.
The parameter can also contain just a part of the name.
The following command will run all of the tests that contain notes in their name:

npx jest -t 'notes' --runInBand

If you install Jest globally with the command:

npm install -g jest

Then you can run tests directly with the jest command.

*/

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBloglist
    .map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('note api', () => {
  test('Every blog is returned', async () => {
    try {
      const response = await api.get('/api/blogs');
      console.log('Response body length : ', response.body.length, ' Mock blog data length : ', helper.initialBloglist.length);
      expect(response.body.length).toBe(helper.initialBloglist.length);
    } catch (error) { console.log(error); }
  });

  test('Every blog post has id property', async () => {
    try {
      const res = await api.get('/api/blogs');
      const blogArr = res.body;
      blogArr.map((blog) => expect(blog.id).toBeDefined());
    } catch (error) { console.log(error); }
  });

  test('a valid blog post can be added ', async () => {
    const newBlog = {
      title: 'Mock Supertest',
      author: 'Nodds',
      url: 'https://somethingsomethingMock.com/',
      likes: 7,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe(helper.initialBloglist.length + 1);

    const titles = blogsAtEnd.map((n) => n.title);
    expect(titles).toContain(
      'Mock Supertest',
    );
  });

  test('missing likes property defaults to zero', async () => {
    const noLikesBlog = {
      title: 'forever alone',
      author: 'anonymous',
      url: 'https://foobarbaznobodyLikes.org',
    };

    await api
      .post('/api/blogs')
      .send(noLikesBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const zeroLikesBlog = await helper.blogDefaultLikes(noLikesBlog.title);
    expect(zeroLikesBlog.likes).toBe(0);
  });

  test('note without content is not added', async () => {
    const newBlog = {
      author: 'Seam bean',
      likes: 22,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd.length).toBe(helper.initialBloglist.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});