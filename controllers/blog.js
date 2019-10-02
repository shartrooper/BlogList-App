const blogsRouter = require('express').Router();
const Blog = require('../model/blogs');


blogsRouter.get('/', async (_request, response, next) => {
  try {
    const getAllblogs = await Blog.find({});
    const toJSONblogs = getAllblogs.map((blog) => blog.toJSON());
    response.json(toJSONblogs);
  } catch (error) { next(error); }
});

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);

  try {
    const savedNnote = await blog.save();
    response.json(savedNnote.toJSON());
  } catch (error) { next(error); }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) { next(error); }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const { body } = request;

  const post = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, post, { new: true });
    response.json(updatedBlog.toJSON());
  } catch (error) { next(error); }
});

module.exports = blogsRouter;
